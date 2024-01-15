const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { creat, showAvatarImage } = require("../controller/file.controller");
const multer = require("@koa/multer");
const handleAvatar = require("../middleware/file.middleware");
const fileRouter = new KoaRouter({ prefix: "/file" });

fileRouter.post("/", verifyAuth, handleAvatar, creat);
fileRouter.get("/avatar/:uid", showAvatarImage);
module.exports = fileRouter;
