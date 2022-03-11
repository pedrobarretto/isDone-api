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
  console.log('Pegando to-dos...');
  getUserId(req).then((userId) => {
    console.log('getuserId func: ', userId);
    listTodos(userId).then((data) => {
      console.log('Retornando dados: ', data);
      return res.status(200).json(data);
    });
  });
});

todosRoutes.post('/', VerifyIfUsersExists, (req: Request, res: Response) => {
  const { text } = req.body;
  getUserId(req).then((userId) => {
    console.log('Criando todo para userId: ', userId);
    createTodo(userId, text).then((data) => {
      console.log('Todo Data: ', data);
      return res.status(201).json(data);
    });
  });
});

todosRoutes.put(
  '/:todoId',
  VerifyIfTodoExists,
  (req: Request, res: Response) => {
    getUserId(req).then((userId) => {
      const { todoId } = req.params;
      markTodoAsDone(userId, todoId).then(() => {
        return res.sendStatus(204);
      });
    });
  }
);

export { todosRoutes };
