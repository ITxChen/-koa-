// 创建koa，引入中间件
const koa = require("koa");
const koaBody = require("koa-bodyparser");
const registerRouters = require("../router/index");

const app = new koa();

app.use(koaBody());
registerRouters(app);
module.exports = app;
