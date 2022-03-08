import { Router, Request, Response } from 'express';

import {
  createTodo,
  listTodos,
  markTodoAsDone,
} from '../database/todos/todos.statics';
import { getUserId } from '../database/users/users.methods';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';
import {
  VerifyIfTodoExists,
  VerifyIfUsersExists,
} from '../middlewares/TodosMiddlewares';

const todosRoutes = Router();

todosRoutes.use(AuthMiddleware);

todosRoutes.get('/list', VerifyIfUsersExists, (req: Request, res: Response) => {
  const id = getUserId(req);
  listTodos(id).then((data) => {
    return res.status(200).json(data);
  });
});

todosRoutes.post('/', VerifyIfUsersExists, (req: Request, res: Response) => {
  const id = getUserId(req);
  const { text } = req.body;
  createTodo(id, text).then((data) => {
    return res.status(201).json(data);
  });
});

todosRoutes.put(
  '/:todoId',
  VerifyIfTodoExists,
  (req: Request, res: Response) => {
    const id = getUserId(req);
    const { todoId } = req.params;
    markTodoAsDone(id, todoId).then(() => {
      return res.sendStatus(204);
    });
  }
);

export { todosRoutes };
