const { Escola } = require("../db/models");
const createHttpError = require("http-errors");

async function createEscola(req, res, next) {
    const { email, senha } = req.body;
    try {
        const [escola, created] = await Escola.findOrCreate({ 
            where: {
                email
            },
            defaults: { senha } 
        });

        if (!created) {
            throw new createHttpError(409, "E-mail já cadastrado!");
        }
        res.status(201).json(escola);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = {
    createEscola
}
