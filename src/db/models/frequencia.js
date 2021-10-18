'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Frequencia extends Model {
    static associate(models) {
      this.belongsToMany(models.Aluno, { through: 'frequencias_alunos' });    
      this.belongsTo(models.Materia, { foreignKey: "materia_id" });
    }
  };
  Frequencia.init({
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    materiaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Materia",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }
  }, {
    sequelize,
    modelName: 'Frequencia',
    tableName: "frequencias"
  });
  return Frequencia;
};