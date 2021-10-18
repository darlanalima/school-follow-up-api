const { Op } = require("sequelize");
const { Frequencia, FrequenciaAluno, Materia } = require("../db/models");
const createHttpError = require("http-errors");

async function createFrequencia(req, res, next) {
    const professorId = res.locals.userId;
    const { data } = req.body;
    try {        
        const materia = await Materia.findOne({ where: { professor_id: professorId } });

        if (!materia) {
            throw new createHttpError(404, "Professor não possui matéria cadastrada");
        }            
        
        const [ frequencia ] = await Frequencia.findOrCreate({ 
            where: { data, materiaId: materia.id }
        });        

        res.status(201).json(frequencia);
    } catch (error) {
        console.log(error);
        next(error);
    }    
}

async function registrarFrequencia(req, res, next) {    
    try {        
        const alunoId = res.locals.userId;
        const frequenciaId  = req.params.id;
        
        const frequencia = await Frequencia.findOne({ where: { id: frequenciaId } });

        if (!frequencia) {
            throw new createHttpError(404, "Frequência não encontrada!");
        }
    
        await FrequenciaAluno.findOrCreate({
            where: {
                [Op.and]: [{ alunoId }, { frequenciaId }]
            },
            defaults: {
                alunoId,
                frequenciaId
            }
        });

        res.status(204).end();
    } catch (error) {
        console.log(error);
        next(error);
    }    
}

module.exports = {
    createFrequencia,
    registrarFrequencia
}
