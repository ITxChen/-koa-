const connection = require("../app/database");
const md5Password = require("../service/md5-password");

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
  //  创建/更新头像
  async updateUserAvatar(avatarUrl, uid) {
    const statement = `UPDATE students SET avatarUrl = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, uid]);
    console.log("result", result);
    return result;
  }
  // 修改密码
  async modifyPasswd(userinfo) {
    const { username, id, name, class_id, eg, passwd } = userinfo;
    const statement =
      "SELECT COUNT(*) FROM students WHERE name = ? AND id = ? AND class_id = ? AND eg =?";
    const [result] = await connection.execute(statement, [
      username,
      id,
      class_id,
      eg,
    ]);
    // console.log(result[0]["COUNT(*)"]);
    if (result[0]["COUNT(*)"] == 1) {
      const password = md5Password(passwd);
      // console.log(password);
      const statement = "UPDATE registration SET passwd = ?  WHERE name = ?";
      const [result] = await connection.execute(statement, [
        password,
        name, //账号
      ]);
      // console.log(result);
      return result;
    }
  }
}
module.exports = new UserService();
