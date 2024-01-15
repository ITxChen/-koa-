const connection = require("../app/database");
class scheduleService {
  async getList(termList) {
    const { class_id, term } = termList;
    console.log(class_id, term);
    const statement = "SELECT * FROM schedule WHERE term = ? AND class_id = ? ";
    const [result] = await connection.execute(statement, [term, class_id]);
    if (result) {
      return result;
    }
  }
}
module.exports = new scheduleService();
