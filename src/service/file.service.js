const connection = require("../app/database");
class fileService {
  // 上传头像
  async create(filename, mimetype, size, userId) {
    const statement =
      "INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)";
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
  // 获取头像
  async queryAvatarWithUserId(userId) {
    const statement = "SELECT * FROM avatar WHERE user_id = ?;";
    const [result] = await connection.execute(statement, [userId]);
    return result.pop();
  }

  
}

module.exports = new fileService();
