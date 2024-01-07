const mysql = require("mysql2");
// 连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "thesis",
  user: "root",
  password: "root",
  connectionLimit: 5,
});
// 获取链接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("连接失败", err);
    return;
  }

  // 尝试和数据库建立一个链接
  connection.connect((err) => {
    if (err) {
      console.log("数据库交互失败", err);
    } else {
      console.log("数据库连接成功");
      5;
    }
  });
});
const connection = connectionPool.promise();
module.exports = connection;
