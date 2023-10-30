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
    JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt) user ,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id ) CountNum
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
    JSON_OBJECT('id',u.id,'name',u.name,'createAt',u.createAt) user ,
		(JSON_ARRAYAGG(
      JSON_OBJECT(
        'id',c.id,'content',c.content,'commentId',c.comment_id
        ))) comments
    FROM moment m 
    LEFT JOIN users u ON u.id = m.user_id
		LEFT JOIN comment c ON c.moment_id = m.id
    WHERE m.id=?
		GROUP BY m.id`;

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
  async hasLabel(momentId, label_id) {
    const statement =
      "SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?";
    const [result] = await connection.execute(statement, [momentId, label_id]);
    console.log(result);
    return result;
  }
  async addLabel(momentId, label_id) {
    const statement =
      "INSERT INTO moment_label (moment_id,label_id) VALUES(?,?)";
    const [result] = await connection.execute(statement, [momentId, label_id]);
    return result;
  }
}

module.exports = new MomentService();
