const { Professor } = require("../db/models");
const createHttpError = require("http-errors");

async function createProfessor(req, res, next) {
    const { nome, email, senha } = req.body;
    try {
        const [professor, created] = await Professor.findOrCreate({ 
            where: {
                email
            },
            defaults: { nome, senha } 
        });

        if (!created) {
            throw new createHttpError(409, "E-mail já cadastrado!");
        }

        res.status(201).json(professor);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

async function getProfessor(req, res, next){
    try {
        const professorIdInDB = await Professor.findAll();

        res.status(201).json(professorIdInDB)
        
    } catch (error) {
        console.log(error)
        next(error)
    }
}
function deleteProfessor(req, res, next) {
    // Obter o id dos parametros
    const professorId = req.params.id;
   
    // Verificar se o professor com aquele id existe
    const professorIdInDB = professorId.findIndex(professor => professor.id == professorId);

    if (!professorIdInDB) {
        return res.status(404).json({ message: "Professor not found" });
    }

    // Remover o professor do bd ()
    professores.splice(professorIdInDB, 1);

    res.status(204).end();
}

module.exports = {
    createProfessor,
    getProfessor,
    deleteProfessor
    
}
