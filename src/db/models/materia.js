'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    static associate(models) {
     this.belongsTo(models.Professor, { foreignKey: "professor_id" });   
     this.hasMany(models.Nota, { foreignKey: "materia_id" });
     this.belongsToMany(models.Aluno, { through: "alunos_materias", foreignKey: "materia_id", as: "alunos" });
    }
  };
  Materia.init({
    nome: {
      type:DataTypes.STRING,
      allowNull: false
    }, 
  }, {
    sequelize,
    modelName: 'Materia',
    tableName: "materias"
  });
  return Materia;
};