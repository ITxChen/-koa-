const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const LabelController = require("../controller/label.controller");
const labelRouter = new KoaRouter({ prefix: "/label" });

labelRouter.post("/", verifyAuth, LabelController.create);
labelRouter.get("/list", verifyAuth, LabelController.list);
module.exports = labelRouter;
