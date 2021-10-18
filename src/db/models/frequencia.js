'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Frequencia extends Model {
    static associate(models) {
      this.belongsToMany(models.Aluno, { through: 'frequencias_alunos' });      
    }
  };
  Frequencia.init({
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    } 
    
  }, {
    sequelize,
    modelName: 'Frequencia',
    tableName: "frequencias"
  });
  return Frequencia;
};