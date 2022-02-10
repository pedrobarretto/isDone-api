import express, { json } from 'express';
import { v4 as uuid } from 'uuid';

import { Todo } from './interfaces/Todo';
import { User } from './interfaces/User';
import { conn } from './mongo';

const app = express();
app.use(json());

const findById = async (id: string) => {
  const isDone = conn.db.collection('todos');
  try {
    const user = await isDone.findOne({ id });
    return user;
  } catch (err) {
    return console.log(err);
  }
};

const createUser = (user: User) => {
  const isDone = conn.db.collection('todos');

  isDone.insertOne(user);
};

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const isDone = conn.db.collection('todos');
  isDone
    .findOne({ id })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).send({ error: err });
    });
});

app.post('/user', (req, res) => {
  const { firstName, lastName } = req.body;

  const user: User = {
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    createdDate: new Date(),
    todos: [],
    id: uuid(),
  };

  createUser(user);
  return res.send(201).json(user);
});

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
