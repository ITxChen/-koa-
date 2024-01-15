const fs = require("fs");
const fileService = require("../service/file.service");
const UPLAOD_PATH = require("../config/path");
const userService = require("../service/user.service");
const { SERVER, SERVER_POST } = require("../config/server");
class fileController {
  async creat(ctx, next) {
    // console.log(ctx.request.file);
    // 1.获取上传文件的信息
    const { filename, mimetype, size } = ctx.request.file;
    const uid = ctx.query.uid;
    // 2.将图片的信息存储到数据库
    const result = await fileService.create(filename, mimetype, size, uid);
    // 3.将头像url保存起来
    const avatarUrl = `${SERVER}:${SERVER_POST}/file/avatar/${uid}`;
    //4.更新头像
    const data = await userService.updateUserAvatar(avatarUrl, uid);
    ctx.body = {
      code: 200,
      message: "上传成功",
      data: data,
    };
  }
  async showAvatarImage(ctx, next) {
    const { uid } = ctx.params;
    // 获取头像的信息
    const avatarInfo = await fileService.queryAvatarWithUserId(uid);
    if (!avatarInfo) {
      ctx.body = {
        code: -1008,
        message: "该用户没有头像",
      };
      return;
    }
    //读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    // console.log(filename, mimetype); //6aa980bf0d5d08170c78b9f8a820df41 image/png

    // 设置类型，必须设置才能查看到图片
    ctx.type = mimetype;
    // 将图片放到ctx中
    ctx.body = fs.createReadStream(`${UPLAOD_PATH}/${filename}`);
  }
}

module.exports = new fileController();
