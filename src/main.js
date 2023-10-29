const app = require("./app");
const { SERVER_POST } = require("./config/server");
require("./utils/handle-error");
app.listen(SERVER_POST, () => {
  console.log("服务器访问成功");
});
