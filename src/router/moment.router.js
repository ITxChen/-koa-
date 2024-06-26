const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const MomentController = require("../controller/moment.controller");
const verifytPermission = require("../middleware/permission.middleware");
const verfiyLabelExists = require("../middleware/label.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });
// 增
momentRouter.post("/", verifyAuth, MomentController.creat);
// 查
momentRouter.get("/list", MomentController.list);
momentRouter.get("/:momentId", MomentController.detail);
// 改
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifytPermission,
  MomentController.update
);
// 删
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifytPermission,
  MomentController.remove
);
// 为moment添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifytPermission,
  verfiyLabelExists,
  MomentController.addLabels
);
module.exports = momentRouter;
