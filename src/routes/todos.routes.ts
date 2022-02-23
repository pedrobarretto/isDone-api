import { Router, Request, Response } from 'express';

import {
  createTodo,
  listTodos,
  markTodoAsDone,
} from '../database/todos/todos.statics';
import {
  VerifyIfTodoExists,
  VerifyIfUsersExists,
} from '../middlewares/TodosMiddlewares';

const todosRoutes = Router();

todosRoutes.get('/:id', VerifyIfUsersExists, (req: Request, res: Response) => {
  const { id } = req.params;
  listTodos(id).then((data) => {
    return res.status(200).json(data);
  });
});

todosRoutes.post('/:id', VerifyIfUsersExists, (req: Request, res: Response) => {
  const { id } = req.params;
  const { text } = req.body;
  createTodo(id, text).then((data) => {
    return res.status(201).json(data);
  });
});

todosRoutes.put('/:id', VerifyIfTodoExists, (req: Request, res: Response) => {
  const { id } = req.params;
  const { todoId } = req.body;
  markTodoAsDone(id, todoId).then(() => {
    return res.sendStatus(204);
  });
});

export { todosRoutes };
