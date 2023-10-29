const connection = require("../app/database");
class MomentService {
  async create(content, userId) {
    const statement = "INSERT INTO moment(content,user_id) VALUES (?,?)";
    const result = await connection.execute(statement, [content, userId]);
    return result;
  }
  async getList(offset, size) {
    const statement = `SELECT 
    m.id id, m.content content ,m.createAt createAt ,
    JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt) user 
    FROM moment m 
    LEFT JOIN users u ON u.id = m.user_id
    LIMIT ? OFFSET ?`;
    const [result] = await connection.execute(statement, [
      String(size),
      String(offset),
    ]);
    // console.log(result);
    return result;
  }
  async detail(momentId) {
    const statement = `SELECT 
    m.id id, m.content content ,m.createAt createAt ,
    JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt) user 
    FROM moment m 
    LEFT JOIN users u ON u.id = m.user_id
    WHERE m.id=?`;
    const [result] = await connection.execute(statement, [momentId]);
    // console.log(result);
    return result;
  }

  async update(momentId, content) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?`;
    const result = connection.execute(statement, [content, momentId]);
    return result;
  }
  async remove(momentId) {
    const statement = "DELETE FROM moment WHERE id = ?";
    const result = await connection.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
