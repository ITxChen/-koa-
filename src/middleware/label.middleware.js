const labelService = require("../service/label.service");
//  传入labels时，不确定表中是否存在数据，所以需要将所有的labels存在label中，获取id
const verfiyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递的所有labels
  const { labels } = ctx.request.body;
  //   console.log(Array.isArray(labels)); // 这应该打印出 true
  // 2.判断labels中的name是否存在与label表中
  const newLabels = [];
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name);
    const labelObj = { name };
    if (result) {
      // 如果存在，则添加到新对象中
      labelObj.id = result.id;
    } else {
      const insertResult = await labelService.create(name);
      labelObj.id = insertResult.insertId;
    }
    newLabels.push(labelObj);
  }
  ctx.labels = newLabels;
  await next();
};

module.exports = verfiyLabelExists;
