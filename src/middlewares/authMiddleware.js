const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (permissions) => {
    return (req, res, next) => {
        const authToken = req.headers.authorization?.split(" ")[1];

        if (!authToken) {
            next(createHttpError(401, "Token de acesso inválido"));
        }        

        try {
            const payload = jwt.verify(authToken, process.env.TOKEN_SECRET);
            
            if (!permissions.includes(payload.role)) {
                next(createHttpError(403, "Você não tem permissão para acessar esse recurso"));    
            }              

            res.locals.userId = payload.sub;

            next();
        } catch (error) {
            console.log(error);
            next(createHttpError(401, "Token de acesso inválido"));
        }    
    }    
}