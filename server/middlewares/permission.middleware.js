
export const checkPermission = (permissionKey) => {
  return (req, res, next) => {
    const now = new Date();
    let permissions = [];

    req.user.roles.forEach(role => {
      permissions.push(...role.permissions);
    });

    permissions.push(...req.user.directPermissions);

    const valid = permissions.find(p =>
      p.key === permissionKey &&
      !p.revoked &&
      (!p.startsAt || p.startsAt <= now) &&
      (!p.expiresAt || p.expiresAt >= now)
    );

    if (!valid) {
      return res.status(403).json({ message: "Access Denied" });
    }

    req.permissionScope = valid.scope;
    next();
  };
};
