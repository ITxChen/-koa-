const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const scheduleRouter = new KoaRouter({ prefix: "/schedule" });
scheduleRouter.post('/list',verifyAuth,)
module.exports = scheduleRouter;
