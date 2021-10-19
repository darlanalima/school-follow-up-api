'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nota extends Model {
    static associate(models) {
      this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });      
      this.belongsTo(models.Materia, { foreignKey: "materia_id" });
    }
  };
  Nota.init({
    nota: {
      type:DataTypes.DECIMAL,
      allowNull: false
    }, 
    bimestre: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Nota',
    tableName: "notas"
  });
  return Nota;
};