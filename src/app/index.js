// 创建koa，引入中间件
const koa = require("koa");
const koaBody = require("koa-bodyparser");
const userRouter = require("../router/user.router");

const app = new koa();

app.use(koaBody());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app;
