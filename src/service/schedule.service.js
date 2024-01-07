const connection = require("../app/database");
class scheduleService {
  async getList(term) {
    const { term } = term;
    const statement = "SELECT * FROM schedule WHERE term = ?";
    const [result] = await connection.execute(statement, [term]);
    if (result) {
      return result;
    }
  }
}
