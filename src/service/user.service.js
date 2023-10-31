const connection = require("../app/database");
class UserService {
  // 创建用户
  async create(user) {
    // 1.获取用户
    const { name, password } = user;

    // 2.拼接statement
    const statement = "INSERT INTO `users` (name,password) VALUES (?,?);";
    // 3.执行sql
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  // 查找用户
  async findUserByName(name) {
    const statement = "SELECT * FROM `users` WHERE name = ?;";
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
