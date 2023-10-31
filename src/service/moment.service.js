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
    JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url,'createAt',u.createAt) user ,
    (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id ) CountNum,
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id ) LabelNum
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
    JSON_OBJECT('id',u.id,'name',u.name,'avatar_url',u.avatar_url,'createAt',u.createAt) user ,
   	(
				SELECT
					JSON_ARRAYAGG(
						JSON_OBJECT(
						'id',c.id,'content',c.content,'commentId',c.comment_id,
						'user',JSON_OBJECT('id',cu.id,'name',cu.name)
				)) 
				FROM comment c
				LEFT JOIN users cu ON cu.id = c.user_id
				WHERE c.moment_id = m.id
		)comments,
		
		(
			JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name))
		) labels,
		
		(SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id ) CountNum
		
    FROM moment m 
    LEFT JOIN users u ON u.id = m.user_id

		
		LEFT JOIN  moment_label ml on ml.moment_id = m.id
		LEFT JOIN  label l ON ml.label_id = l.id
		
    WHERE m.id= ?
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
