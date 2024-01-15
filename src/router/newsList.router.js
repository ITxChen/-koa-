const KoaRouter = require("@koa/router");
const connection = require("../app/database");
const { verifyAuth } = require("../middleware/login.middleware");
const newsListRouter = new KoaRouter({ prefix: "/newsList" });

newsListRouter.get("/", verifyAuth, async (ctx, next) => {
  console.log("获取新闻");
  const statement = "SELECT * FROM news ORDER BY id DESC LIMIT 5";
  const [result] = await connection.execute(statement);
  ctx.body = {
    code: 200,
    data: result,
  };
});
module.exports = newsListRouter;
