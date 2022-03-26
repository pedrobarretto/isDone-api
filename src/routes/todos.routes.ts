import { Router, Request, Response } from 'express';

import {
  createTodo,
  deleteTodo,
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
  getUserId(req).then((userId) => {
    listTodos(userId).then((data) => {
      return res.status(200).json(data);
    });
  });
});

todosRoutes.post(
  '/newTodo',
  VerifyIfUsersExists,
  (req: Request, res: Response) => {
    const { text } = req.body;
    getUserId(req).then((userId) => {
      createTodo(userId, text).then((data) => {
        return res.status(201).json(data);
      });
    });
  }
);

todosRoutes.put(
  '/:todoId',
  VerifyIfTodoExists,
  (req: Request, res: Response) => {
    const { todoId } = req.params;
    getUserId(req).then((userId) => {
      markTodoAsDone(userId, todoId).then(() => {
        return res.sendStatus(204);
      });
    });
  }
);

todosRoutes.delete(
  '/delete/:todoId',
  VerifyIfTodoExists,
  (req: Request, res: Response) => {
    const { todoId } = req.params;
    const { userId } = req.session;
    deleteTodo(userId, todoId).then(() => {
      return res.sendStatus(204);
    });
  }
);

export { todosRoutes };
