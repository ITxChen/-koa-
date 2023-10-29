const KoaRouter = require("@koa/router");
const loginRouter = new KoaRouter({ prefix: "/login" });
const LoginController = require("../controller/login.router");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");
// const verifyAuth = require("../middleware/login.middleware");

loginRouter.post("/", verifyLogin, LoginController.sign);
loginRouter.get("/test", verifyAuth, LoginController.test);

module.exports = loginRouter;
