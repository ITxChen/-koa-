const connection = require("../app/database");
class messageInfoService {
  async create(messageInfo) {
    // 导入学生信息
    if (messageInfo.type == 1) {
      const { id, name, age, gender, class_id, type, eg } = messageInfo;
      const statement =
        "INSERT INTO `students` (id, name, age, gender, class_id, type, eg ) VALUES (?,?,?,?,?,?,?)";
      const [result] = await connection.execute(statement, [
        id,
        name,
        age,
        gender,
        class_id,
        type,
        eg,
      ]);
      if (!result) {
        console.log("kong");
      }
      console.log("信息导入成功", result);
      return result;
    }
    // 导入管理员信息
    if (messageInfo.type == 0) {
      const { id, name, age, gender, class_id, type, eg } = messageInfo;
      const statement =
        "INSERT INTO `students` (id, name, age, gender, class_id, type, eg ) VALUES (?,?,?,?,?,?,?)";
      const [result] = await connection.execute(statement, [
        id,
        name,
        age,
        gender,
        class_id,
        type,
        eg,
      ]);
      if (!result) {
        console.log("kong");
      }
      console.log("信息导入成功", result);
      return result;
    }
    //   导入老师信息
    if (messageInfo.type == 2) {
      const { id, name, age, gender } = messageInfo;
      const statement =
        "INSERT INTO `teachers` (id, name, age, gender ) VALUES (?,?,?,?)";
      const [result] = await connection.execute(statement, [
        id,
        name,
        age,
        gender,
      ]);
      console.log("信息导入成功", result);
      return result;
    }
  }
}
module.exports = new messageInfoService();
