const connection = require("../app/database");

class labelService {
  // 创建
  async create(name) {
    const statement = "INSERT INTO label (name) VALUES (?)";
    const result = await connection.execute(statement, [name]);
    return result;
  }
  //   获取
  async getlist(off, siz) {
    const statement = "SELECT * FROM label LIMIT ? OFFSET ? ";
    const result = await connection.execute(statement, [
      String(siz),
      String(off),
    ]);
    return result;
  }
  //   判断
  async queryLabelByName(name) {
    const statement = "SELECT * FROM label WHERE name = ?";
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new labelService();
