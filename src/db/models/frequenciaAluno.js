'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FrequenciaAluno extends Model {
    static associate(models) {}
  };
  FrequenciaAluno.init({
    presente: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    alunoId: {
        allowNull: false,        
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Aluno",
          key: "id"
        }
    },
    frequenciaId: {
        allowNull: false,        
        primaryKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: "Frequencia",
          key: "id"
        }
    }    
  }, {
    sequelize,
    modelName: 'FrequenciaAluno',
    tableName: "frequencias_alunos"
  });
  return FrequenciaAluno;
};