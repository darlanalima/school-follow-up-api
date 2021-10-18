'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    static associate(models) {
      this.hasMany(models.Materia, { foreignKey: "professor_id" });
    }
    senhaValida(senha) {
      return bcrypt.compareSync(senha, this.senha);
    }
  };
  Professor.init({
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
    modelName: 'Professor',
    tableName: "professores"
  });
  return Professor;
};