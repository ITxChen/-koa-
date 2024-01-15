const KoaRouter = require("@koa/router");

const LoginController = require("../controller/login.router");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });
loginRouter.post("/", verifyLogin, LoginController.sign);

module.exports = loginRouter;
// 登录接口