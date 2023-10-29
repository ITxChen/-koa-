const KoaRouter = require("@koa/router");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");
const CommentController = require("../controller/comment.controller");

const commentRouter = new KoaRouter({ prefix: "/comment" });
// 一级评论
commentRouter.post("/", verifyAuth, CommentController.creat);
// 二级
commentRouter.post('/reply',verifyAuth,CommentController.reply)
module.exports = commentRouter;
