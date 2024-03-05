// export const authMiddleware = (roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Not authorized" })
//         }
//         next()
//     }
// }

export const authMiddlewareAdmin = (req, res, next) => {
    // Verifica si el usuario es administrador
    if (!req.session || !req.session.isAdmin) {
        return res.status(403).json({ error: "Not authorized" });
    }
    // Si el usuario es administrador, pasa al siguiente middleware
    next();
};

export const  authMiddlewareUser = (req, res, next) => {
    // Verifica si es usuario
    if (!req.session || req.session.isAdmin) {
        return res.status(403).json({ error: "Not authorized" });
    }
    // Si es usuario, pasa al siguiente middleware
    next();
};