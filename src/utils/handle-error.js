const app = require("../app");
app.on("error", (error, ctx) => {
  let code = 0;
  let message = "";
  switch (error) {
    case "name_or_password_is_required":
      code = -1001;
      message = "用户名或密码不能为空";
    case "name_is_already_exists":
      code = -1002;
      message = "用户名已经存在";
    case "name_is_not_exists":
      code = -1003;
      message = "用户名不存在";
    case "passwrod_is_incorrect":
      code = -1004;
      message = "用户密码不正确";
    case "unauthorization":
      code = -1005;
      message = "无效的token或token已经失效";
    case "operation_is_no_allowed":
      code = -1006;
      message = "没有权限修改";
  }

  ctx.body = { code, message };
});
