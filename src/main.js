const app = require("./app");
//  配置跨域
const cors = require("@koa/cors");
const { SERVER_POST } = require("./config/server");
// 错误处理
require("./utils/handle-error");
// 跨域
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.listen(SERVER_POST, () => {
  console.log("服务器访问成功");
});
