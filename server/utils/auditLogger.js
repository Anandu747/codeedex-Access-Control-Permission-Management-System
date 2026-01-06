import AuditLog from "../models/AuditLog.js";

export const logAudit = async ({ actor, action, target }) => {
  await AuditLog.create({
    actor,
    action,
    target
  });
};
