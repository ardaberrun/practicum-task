import TodoItem from './TodoItem';
import { Todo } from '../../context';

type TodoListProps = {
  todos: Todo[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="space-y-2">
      {
        todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))
      }
    </ul>
  );
}

export default TodoList;
