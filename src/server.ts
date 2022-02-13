import express from 'express';
import { v4 as uuid } from 'uuid';

import { Todo } from './interfaces/Todo';
import { User } from './interfaces/User';
import { conn } from './mongo';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);

app.post('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  const isDone = conn.db.collection('todos');
  try {
    isDone.findOne({ id }).then((user) => {
      const newTodo: Todo = {
        createdDate: new Date(),
        text,
        isDone: false,
        id: uuid(),
      };

      const newTodosLst = [...user.todos, newTodo];
      isDone.updateOne(
        { id },
        {
          $set: {
            todos: newTodosLst,
          },
        }
      );
      return res.status(201).json(newTodo);
    });
  } catch (err) {
    return res.status(400).send({ error: err });
  }

  return res.status(200).send();
});

app.put('/todo/:id', (req, res) => {
  const { id } = req.params;
  const { todoId } = req.body;

  const isDone = conn.db.collection('todos');
  try {
    isDone.findOne({ id }).then((user) => {
      const { todos } = user;

      let newTodosLst: Todo[] = [];
      todos.forEach((todo: Todo) => {
        if (todo.id === todoId) {
          const payload: Todo = {
            ...todo,
            isDone: !todo.isDone,
          };
          newTodosLst = [...newTodosLst, payload];
        } else {
          newTodosLst = [...newTodosLst, todo];
        }
      });

      isDone.updateOne(
        { id },
        {
          $set: {
            todos: newTodosLst,
          },
        }
      );

      return res.status(201).send();
    });
  } catch (err) {
    return res.status(400).send({ error: err });
  }

  return res.status(200).send();
});

app.listen(8080);
