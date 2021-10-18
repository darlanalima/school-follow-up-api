const { Aluno } = require("../db/models");
const createHttpError = require("http-errors");

async function createAluno(req, res, next) {
    const { nome, email, senha } = req.body;
    try {
        const [aluno, created] = await Aluno.findOrCreate({ 
            where: {
                email
            },
            defaults: { nome, senha } 
        });

        if (!created) {
            throw new createHttpError(409, "Aluno já cadastrado!");
        }

        res.status(201).json(aluno);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getAluno(req, res, next) {
    const alunoId = res.locals.userId;
    try {
       const aluno = await Aluno.findOne({ where: { id: alunoId }});

       res.json(aluno);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function deleteAluno(req, res, next) {
    try {
        const userId = req.params.id

        const alunoFound = await Aluno.findOne({ where: { id: alunoId } })
        if (!alunoFound) {
            throw new createHttpError(404, "Aluno não encontrado");
        }

        alunoFound.destroy()

        res.status(200).end()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

async function getAluno(req, res, next){
    try {
        const alunoIdInDB = await Aluno.findAll();

        res.status(201).json(alunoIdInDB)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    createAluno,
    deleteAluno,
    getAluno
}

