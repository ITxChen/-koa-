const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const messageInfoController = require("../controller/messageInfo.controller");
const infoRouter = new KoaRouter({ prefix: "/info" });
// infoRouter.post("/message", async (ctx, next) => {
//   console.log("1");
//   // 执行其他逻辑
// });
infoRouter.post("/message", verifyAuth, messageInfoController.create);
module.exports = infoRouter;
