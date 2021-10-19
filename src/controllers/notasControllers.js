const { Nota, Materia, Aluno } = require("../db/models");
const createHttpError = require("http-errors");

async function createNota(req, res, next) {    
    const { nota, alunoId, materiaId, bimestre } = req.body;
    try {
        const materia = await Materia.findOne({ where: { id: materiaId } });
        if (!materia) {
            throw new createHttpError(404, "Matéria não existe");
        }

        const aluno = await Aluno.findOne({ where: { id: alunoId } });
        if (!aluno) {
            throw new createHttpError(404, "Aluno não existe");
        }

        const newNota = await Nota.create({ 
            nota,
            aluno_id: alunoId,
            materia_id: materiaId,
            bimestre
        });

        res.status(201).json(newNota);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getNotasOfStudent(req, res, next) {
    const alunoId = res.locals.userId;

    try {
        const notas = await Nota.findAll({ where: { aluno_id: alunoId } });

        res.json(notas);
    } catch (error) {
        console.log(error);
        next(error);
    }
}


async function deleteNotasOfStundent(req, res, next) {
    try {
        const notaId = req.params.id

        const notaFound = await nota.findOne({ where: { id: notaId } })
        if (!notaFound) {
            throw new createHttpError(404, "nota não encontrado");
        }

        notaFound.destroy()

        res.status(200).end()
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports = {
    createNota,
    getNotasOfStudent,
    deleteNotasOfStundent
}
