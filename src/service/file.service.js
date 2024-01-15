const connection = require("../app/database");
class fileService {
  // 上传头像
  async create(filename, mimetype, size, uid) {
    const statement =
      "INSERT INTO avatar (filename,mimetype,size,uid) VALUES (?,?,?,?)";
    const result = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      uid,
    ]);
    return result;
  }
  // 获取头像
  async queryAvatarWithUserId(uid) {
    const statement = "SELECT * FROM avatar WHERE uid = ?;";
    const [result] = await connection.execute(statement, [uid]);
    return result.pop();
  }
}

module.exports = new fileService();
