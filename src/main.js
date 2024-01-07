const app = require("./app");
//  配置跨域
const cors = require("@koa/cors");
const { SERVER_POST } = require("./config/server");
require("./utils/handle-error");
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.listen(SERVER_POST, () => {
  console.log("服务器访问成功");
});
