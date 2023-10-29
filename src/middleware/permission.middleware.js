const permissionService = require("../service/permission.service");
const verifyMomentPermission = async (ctx, next) => {
  console.log("开始permission");
  const { momentId } = ctx.params;
  console.log(ctx.params);
  const { id } = ctx.user;
  const isPermission = await permissionService.checkMoment(momentId, id);
  if (!isPermission) {
    return ctx.app.emit("error", "operation_is_no_allowed", ctx);
  }
  await next();
};
const verifytPermission = async (ctx, next) => {
  console.log("开始permission");
  const { id } = ctx.user;
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  const isPermission = await permissionService.checkResouce(
    resourceName,
    resourceId,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", "operation_is_no_allowed", ctx);
  }
  await next();
};
module.exports = verifytPermission;
