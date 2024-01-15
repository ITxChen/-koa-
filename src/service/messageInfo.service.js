const connection = require("../app/database");
class messageInfoService {
  async create(messageInfo) {
    // 导入学生信息
    if (messageInfo.type == "1") {
      try {
        // 如果保存的时候用户信息不存在就插入
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
        return result;
      } catch (error) {
        // 如果保存的时候用户的id已经存在，就更新信息
        const { id, name, age, gender, class_id, type, eg } = messageInfo;
        const statement =
          "UPDATE `students` SET name = ?, age = ?, gender = ?, class_id = ?, type = ?, eg = ? WHERE id = ?";
        const [result] = await connection.execute(statement, [
          name,
          age,
          gender,
          class_id,
          type,
          eg,
          id,
        ]);
        return result;
      }
    }
    // 导入管理员信息
    if (messageInfo.type == "0") {
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
    if (messageInfo.type == "2") {
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
  // 修改
  async modify(messageInfo) {
    if (messageInfo.type == "1") {
      // 如果修改的时候用户的id没有改变就更新
      const { id, name, age, gender, class_id, type, eg } = messageInfo;
      const statement =
        "UPDATE `students` SET name = ?, age = ?, gender = ?, class_id = ?, type = ?, eg = ? WHERE id = ?";
      const [result] = await connection.execute(statement, [
        name,
        age,
        gender,
        class_id,
        type,
        eg,
        id,
      ]);
      if (!result) {
        // 如果修改后用户的id也改了就插入
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
        console.log("result");
        return result;
      }
      return result;
    }
  }
  async getList(messageInfo) {
    const statement = "SELECT * FROM `students` WHERE id = ? ";
    const [result] = await connection.execute(statement, [messageInfo]);
    // console.log(result);
    return result;
  }
}
module.exports = new messageInfoService();
