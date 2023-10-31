const fs = require("fs");
const fileService = require("../service/file.service");
const UPLAOD_PATH = require("../config/path");
class fileController {
  async creat(ctx, next) {
    // 获取上传文件的信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    // 存储到数据库
    const result = await fileService.create(filename, mimetype, size, id);
    ctx.body = {
      code: 0,
      message: "上传成功",
      data: result,
    };
  }
  async showAvatarImage(ctx, next) {
    const { userId } = ctx.params;
    // 获取头像的信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId);
    //读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    console.log(filename, mimetype); //6aa980bf0d5d08170c78b9f8a820df41 image/png
    // 设置类型，必须设置才能查看到图片
    ctx.type = mimetype;
    // 将图片放到ctx中
    ctx.body = fs.createReadStream(`${UPLAOD_PATH}/${filename}`);
  }
}

module.exports = new fileController();
