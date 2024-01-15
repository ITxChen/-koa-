const multer = require("@koa/multer");
// const { UPLAOD_PATH } = require("../config/path");
const uploadAvater = multer({
  dest: "./uploads",
  fileFilter: function (req, file, cb) {
    // 只接受图片文件
    if (!file.mimetype.startsWith("image/")) {
      // 设置一个自定义错误消息
      console.log("-------");
      cb(new Error("只能上传图片文件!"), false);
    } else {
      cb(null, true);
    }
  },
});

const handleAvatar = async (ctx, next) => {
  try {
    await uploadAvater.single("file")(ctx, next);
  } catch (err) {
    // 捕获错误并将其发送给客户端
    console.log(err);
    ctx.status = 400;
    ctx.body = {
      code: -1006,
      error: err.message,
    };
  }
};
module.exports = handleAvatar;
