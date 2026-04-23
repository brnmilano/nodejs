const Task = require("../models/Task");

/**
 * Controlador para gerenciar tarefas (CRUD)
 *
 * Organizado por tipo de requisição: CREATE, READ, UPDATE, DELETE, TOGGLE
 */
module.exports = class TaskController {
  /**
   * CREATE - Renderiza formulário de criação
   *
   * Renderiza a página com o formulário para criar uma nova tarefa
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Renderiza a view tasks/create
   */
  static async createTask(req, res) {
    try {
      res.render("tasks/create");
    } catch (error) {
      console.error("Erro ao renderizar formulário de criação:", error);

      res.status(500).send("Erro ao renderizar formulário de criação");
    }
  }

  /**
   * CREATE - Salva nova tarefa no banco
   *
   * Recebe dados do formulário e cria uma nova tarefa no banco de dados
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.body.title - Título da tarefa
   * @param {string} req.body.description - Descrição da tarefa
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Redireciona para /tasks ou retorna erro 500
   */
  static async createTaskSave(req, res) {
    const { title, description } = req.body;

    try {
      const task = {
        title,
        description,
        done: false,
      };

      await Task.create(task);

      res.redirect("/tasks");
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);

      res.status(500).send("Erro ao criar tarefa");
    }
  }

  /**
   * UPDATE - Renderiza formulário de edição
   *
   * Busca a tarefa pelo ID e renderiza o formulário de edição preenchido
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.params.id - ID da tarefa a editar
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Renderiza a view tasks/edit com os dados da tarefa
   */
  static async updateTask(req, res) {
    const { id } = req.params;

    try {
      const task = await Task.findOne({ where: { id: id }, raw: true });

      res.render("tasks/edit", { task });
    } catch (error) {
      console.error("Erro ao buscar tarefa para edição:", error);

      res.status(500).send("Erro ao buscar tarefa para edição");
    }
  }

  /**
   * DELETE - Remove tarefa do banco
   *
   * Deleta uma tarefa do banco de dados pelo ID
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.body.id - ID da tarefa a deletar
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Redireciona para /tasks após deletar
   */
  static async removeTask(req, res) {
    const { id } = req.body;

    try {
      await Task.destroy({ where: { id: id } });

      res.redirect("/tasks");
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);

      res.status(500).send("Erro ao remover tarefa");
    }
  }

  /**
   * UPDATE - Atualiza tarefa no banco
   *
   * Recebe dados do formulário e atualiza a tarefa no banco de dados
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.body.id - ID da tarefa a atualizar
   * @param {string} req.body.title - Novo título da tarefa
   * @param {string} req.body.description - Nova descrição da tarefa
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Redireciona para /tasks após atualizar
   */
  static async updateTaskPost(req, res) {
    const { id, title, description } = req.body;

    try {
      const taskData = {
        title,
        description,
      };

      await Task.update(taskData, { where: { id: id } });

      res.redirect("/tasks");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);

      res.status(500).send("Erro ao atualizar tarefa");
    }
  }

  /**
   * TOGGLE - Alterna status da tarefa (POST - Legacy)
   *
   * Alterna o status done de uma tarefa (concluída/não concluída)
   * Método legado: utiliza POST via formulário
   * @deprecated Utilize toggleTask() no lugar
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.body.id - ID da tarefa a alternar
   * @param {string} req.body.done - Status atual (0 ou 1)
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Redireciona para /tasks após alternar
   */
  static async toggleTaskStatus(req, res) {
    const { id, done } = req.body;

    try {
      const taskData = {
        done: done === "0" ? true : false,
      };

      await Task.update(taskData, { where: { id: id } });

      res.redirect("/tasks");
    } catch (error) {
      console.error("Erro ao alternar status da tarefa:", error);

      res.status(500).send("Erro ao alternar status da tarefa");
    }
  }

  /**
   * TOGGLE - Alterna status da tarefa (GET)
   *
   * Alterna o status done de uma tarefa (concluída/não concluída)
   * Método moderno: utiliza rota GET via link
   * @param {Object} req - Objeto de requisição Express
   * @param {string} req.params.id - ID da tarefa a alternar
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Redireciona para /tasks após alternar ou retorna erro
   * @throws {404} Se a tarefa não for encontrada
   */
  static async toggleTask(req, res) {
    const { id } = req.params;

    try {
      const task = await Task.findOne({ where: { id: id } });

      if (!task) {
        return res.status(404).send("Tarefa não encontrada");
      }

      await task.update({ done: !task.done });

      res.redirect("/tasks");
    } catch (error) {
      console.error("Erro ao alternar status da tarefa:", error);
      res.status(500).send("Erro ao alternar status da tarefa");
    }
  }

  /**
   * READ - Lista todas as tarefas
   *
   * Busca todas as tarefas do banco e renderiza a página com a lista
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {void} Renderiza a view tasks/all com as tarefas
   */
  static async ShowTasks(req, res) {
    try {
      const task = await Task.findAll({ raw: true });

      res.render("tasks/all", { tasks: task });
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);

      res.status(500).send("Erro ao buscar tarefas");
    }
  }
};
