const express = require("express");
const router = express.Router();

const TaskController = require("../controllers/TaskController");

/*
===================================
   ROTAS DE RENDERIZAÇÃO (VIEWS)
   Retornam páginas HTML/formulários
=================================== 
*/

// Rota para exibir o formulário de criação de tarefa
router.get("/add", TaskController.createTask);

// Rota para exibir o formulário de edição de tarefa
router.get("/edit/:id", TaskController.updateTask);

// Rota para exibir a página inicial com a lista de tarefas
router.get("/", TaskController.ShowTasks);

/*
===================================
   ROTAS DE OPERAÇÃO (REQUISIÇÕES)
   Realizam ações e modificam dados
=================================== 
*/

// Rota para criar uma nova tarefa
router.post("/add", TaskController.createTaskSave);

// Rota para atualizar uma tarefa existente
router.post("/update/:id", TaskController.updateTaskPost);

// Rota para remover uma tarefa
router.post("/remove", TaskController.removeTask);

// Rota para alternar o status da tarefa (concluída/não concluída)
router.get("/toggle/:id", TaskController.toggleTask);

// Rota para atualizar status via POST (legacy)
router.post("/updatestatus", TaskController.toggleTaskStatus);

module.exports = router;
