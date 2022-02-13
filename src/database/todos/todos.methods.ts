import { Todo } from '../../interfaces/Todo';

export function generateNewTodosLst(todos: Todo[], todoId: string): Todo[] {
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

  return newTodosLst;
}
