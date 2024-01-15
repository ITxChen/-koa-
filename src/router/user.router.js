const KoaRouter = require("@koa/router");
const UserController = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");
const { verifyAuth } = require("../middleware/login.middleware");

//创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" }); // 前缀
// 用户注册接口
userRouter.post("/list", verifyUser, handlePassword, UserController.create);
// 用户修改密码接口
userRouter.post("/passwd", verifyAuth, UserController.modifyPasswd);
// 忘记密码
userRouter.post("/forgetPasswd", UserController.modifyPasswd);
module.exports = userRouter;
