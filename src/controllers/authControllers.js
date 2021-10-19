const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { Aluno, Professor, Escola } = require("../db/models");

function createAccessToken(userId, role) {
    return jwt.sign(
        { 
            sub: userId,
            role 
        }, 
        process.env.TOKEN_SECRET, 
        { expiresIn: process.env.TOKEN_EXPIRATION }
    )
}

async function loginAluno(req, res, next) {
    const { email, senha } = req.body;

    const err = new createHttpError(401, "E-mail ou senha inválidos");

    try {
        const aluno = await Aluno.findOne({ where: { email: email } });        

        if (!aluno) {
            throw err;
        }

        if (!aluno.senhaValida(senha)) {
            throw err;
        }

        const accessToken = createAccessToken(aluno.id, "aluno");

        res.json(accessToken);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function loginProfessor(req, res, next) {
    const { email, senha } = req.body;

    const err = new createHttpError(401, "E-mail ou senha inválidos");

    try {
        const professor = await Professor.findOne({ where: { email: email } });        

        if (!professor) {
            throw err;
        }

        if (!professor.senhaValida(senha)) {
            throw err;
        }

        const accessToken = createAccessToken(professor.id, "professor");

        res.json(accessToken);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function loginEscola(req, res, next) {
    const { email, senha } = req.body;

    const err = new createHttpError(401, "E-mail ou senha inválidos");

    try {
        const escola = await Escola.findOne({ where: { email: email } });        

        if (!escola) {
            throw err;
        }

        if (!escola.senhaValida(senha)) {
            throw err;
        }

        const accessToken = createAccessToken(escola.id, "escola");

        res.json(accessToken);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function login(req, res, next) {
    const { email, senha } = req.body;
    const err = new createHttpError(401, "E-mail ou senha inválidos");

    try {
        const escola = await Escola.findOne({ where: { email: email } });        
        
        if (!escola) {
            const professor = await Professor.findOne({ where: { email: email } });                                    
            
            if (!professor) {
                throw err;
            } 

            if (!professor.senhaValida(senha)) {
                throw err;
            } 

            const accessToken = createAccessToken(professor.id, "professor");
            
            return res.json(accessToken);
        }

        if (!escola.senhaValida(senha)) {
            throw err;
        }                            

        const accessToken = createAccessToken(escola.id, "escola");

        res.json(accessToken);
    } catch (error) {
        console.log(error);
        next(error);
    }
}



module.exports = {
    loginAluno,
    loginProfessor,
    loginEscola,
    login
}
