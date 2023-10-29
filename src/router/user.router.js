const KoaRouter = require("@koa/router");
const UserController = require("../controller/user.controller");
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

//创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" }); // 前缀
// 用户注册接口
userRouter.post("/list", verifyUser, handlePassword, UserController.create);

module.exports = userRouter;
