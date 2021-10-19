const { Aluno, Nota, FrequenciaAluno, Frequencia } = require("../db/models");
const { Op } = require("sequelize");
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

async function getBoletim(req, res, next) {
    try {
        const userId = res.locals.userId;

        const aluno = await Aluno.findOne({ where: { id: userId } });

        if (!aluno) {
            throw new createHttpError(404, "Aluno não encontrado");
        }

        const materiasOfStudent = await aluno.getMaterias(); 

        const boletim = [];

        for (let materia of materiasOfStudent) {
            const notasB1 = (await Nota.findAll({ 
                where: {
                    [Op.and]: [{ bimestre: 1 }, { materia_id: materia.id }]
                }
            }))?.map(nota => +nota.nota);
            const mediaB1 = notasB1.length > 0 ? notasB1.reduce((prevEl, currentEl) => prevEl + currentEl) / notasB1.length : null;                        
        
            const notasB2 = (await Nota.findAll({ 
                where: {
                    [Op.and]: [{ bimestre: 2 }, { materia_id: materia.id }]
                }
            }))?.map(nota => +nota.nota);            
            const mediaB2 =  notasB2.length > 0 ? notasB2.reduce((prevEl, currentEl) => prevEl + currentEl) / notasB2.length : null;
        
            const notasB3 = (await Nota.findAll({ 
                where: {
                    [Op.and]: [{ bimestre: 3 }, { materia_id: materia.id }]
                }
            }))?.map(nota => +nota.nota);
            const mediaB3 =  notasB3.length > 0 ? notasB3.reduce((prevEl, currentEl) => prevEl + currentEl) / notasB3.length : null;

            const notasB4 = (await Nota.findAll({ 
                where: {
                    [Op.and]: [{ bimestre: 4 }, { materia_id: materia.id }]
                }
            }))?.map(nota => +nota.nota);
            const mediaB4 =  notasB4.length > 0 ? notasB4.reduce((prevEl, currentEl) => prevEl + currentEl) / notasB4.length : null;
            
            const frequenciaTotalMateria = await Frequencia.count({ where: { materia_id: materia.id }});
            const frequenciaAluno = await FrequenciaAluno.count({
                where: {
                    [Op.and]: [{ aluno_id: userId}, { presente: true  }]
                }
            });

            const porcentagemFrequencia = frequenciaTotalMateria * 100  / frequenciaAluno;

            boletim.push({
                nome: materia.nome,
                bimestres: [
                    { n1: notasB1[0], n2: notasB1[1], n3: notasB1[2], n4: notasB1[3], media: mediaB1 },
                    { n1: notasB2[0], n2: notasB2[1], n3: notasB2[2], n4: notasB2[3], media: mediaB2 },
                    { n1: notasB3[0], n2: notasB3[1], n3: notasB3[2], n4: notasB3[3], media: mediaB3 },
                    { n1: notasB4[0], n2: notasB4[1], n3: notasB4[2], n4: notasB4[3], media: mediaB4 }
                ],
                frequencia: porcentagemFrequencia
            });
        }

        

        res.status(200).json(boletim)
    } catch (error) {
        console.log(error)
        next(error)
    }    
}

async function getAllAlunos(req, res, next) {
    try {
        const alunos = await Aluno.findAll();
    
        res.json(alunos);
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = {
    createAluno,
    deleteAluno,
    getAluno,
    getBoletim,
    getAllAlunos
}

