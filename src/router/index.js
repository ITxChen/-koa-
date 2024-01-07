const fs = require("fs");
// 读取所有的路由，并将其添加到router中

function registerRouters(app) {
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}
module.exports = registerRouters;
