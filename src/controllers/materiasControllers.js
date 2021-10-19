const { Materia, Professor,Aluno } = require("../db/models");
const createHttpError = require("http-errors");

async function createMateria(req, res, next) {
    const { nome, professorId, alunos} = req.body;
    try {
        const professor = await Professor.findOne({ where: { id: professorId }});

        if (!professor) {
            throw new createHttpError(404, "Professor não encontrado");
        }        

        const [materia, created] = await Materia.findOrCreate({ 
            where: {
                nome,
                professor_id: professorId
            }
        });    

        if (!created) {
            throw new createHttpError(409, "Matéria já cadastrada");
        }

        const alunosInBD = await Aluno.findAll({ where: { id: alunos }});

        await materia.setAlunos(alunosInBD);

        res.status(201).json(materia);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getMateriasOfStudent(req, res, next) {
    const alunoId = res.locals.userId;
    try {
        const aluno = await Aluno.findOne({ where: { id: alunoId }});
        
        const materias = await aluno.getMaterias();

        res.json(materias);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getAllMaterias(req, res, next) {    
    try {        
        const materias = await Materia.findAll();

        res.json(materias);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getMateriasOfTeacher(req, res, next) {
    try {
        const professorId = res.locals.userId;

        const materias = await Materia.findOne({ where:  { professor_id: professorId } })
        
        res.json(materias);        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function deleteMateria(req, res, next) {
    try {
        const materiaId = req.params.id

        const materiaFound = await Materia.findOne({ where: { id: materiaId } })
        if (!materiaFound) {
            throw new createHttpError(404, "materia não encontrada");
        }

        materiaFound.destroy()

        res.status(200).end()
    } catch (error) {
        console.log(error)
        next(error)
    }
}
module.exports = {
    createMateria,
    getMateriasOfStudent,
    getAllMaterias,
    getMateriasOfTeacher,
    deleteMateria
}
