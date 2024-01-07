const connection = require("../app/database");
class UserService {
  // 创建用户
  async create(user) {
    // 1.获取用户
    const { name, passwd, type, uid } = user;

    // 2.拼接statement
    const statement =
      "INSERT INTO `registration` (name,passwd,type,uid) VALUES (?,?,?,?);";
    // 3.执行sql
    const [result] = await connection.execute(statement, [
      name,
      passwd,
      type,
      uid,
    ]);
    console.log("创建成功");
    return result;
  }
  // 查找用户
  async findUserByName(name) {
    const statement = "SELECT * FROM `registration` WHERE name = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
  //  创建头像
  async updateUserAvatar(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    console.log(result);
    return result;
  }
}
module.exports = new UserService();
