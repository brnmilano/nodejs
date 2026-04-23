const { DataTypes } = require("sequelize");

const db = require("../db/connection");

/**
 * MODELO TASK
 *
 * Define a estrutura da tabela Tasks no banco de dados
 * Representa uma tarefa com título, descrição e status de conclusão
 *
 * Campos:
 * - title (STRING): Título da tarefa (obrigatório)
 * - description (TEXT): Descrição detalhada da tarefa (obrigatório)
 * - done (BOOLEAN): Status de conclusão (padrão: false)
 *
 * Criado automaticamente pelo Sequelize com id, createdAt e updatedAt
 */
const Task = db.define("Task", {
  /**
   * Título da tarefa
   * @type {string}
   * @required
   * @maxLength Padrão: 255 caracteres (STRING)
   */
  title: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },

  /**
   * Descrição da tarefa
   * @type {string}
   * @required
   * @note Usa TEXT para permitir textos longos
   */
  description: {
    type: DataTypes.TEXT,
    required: true,
    allowNull: false,
  },

  /**
   * Status de conclusão da tarefa
   * @type {boolean}
   * @required
   * @default false (tarefa não concluída)
   */
  done: {
    type: DataTypes.BOOLEAN,
    required: true,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Task;
