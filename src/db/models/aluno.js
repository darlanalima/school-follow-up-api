'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {    
    static associate(models) {
      this.belongsToMany(models.Frequencia, { through: "frequencias_alunos" });
      this.hasMany(models.Nota, { foreignKey: "aluno_id" });
      this.belongsToMany(models.Materia, { through: "alunos_materias", foreignKey: "aluno_id", as: "materias" });
    }
    senhaValida(senha) {
      return bcrypt.compareSync(senha, this.senha);
    }
  };
  Aluno.init({
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "E-mail inválido" }
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      set(senha) {
        this.setDataValue("senha", bcrypt.hashSync(senha, 10));
      }
    }
  }, {
    sequelize,
    modelName: 'Aluno',
  });
  return Aluno;
};