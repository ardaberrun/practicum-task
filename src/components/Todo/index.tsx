import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context';
import { getTodos } from '../../service/todo.service';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import Loading from '../Loading';

function Todos() {
  const { state, dispatch } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        
        const todos = await getTodos();
        dispatch({ type: 'SET_TODOS', payload: todos });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="w-full h-full space-y-12 text-center">
      <h1 className="font-bold text-3xl capitalize">
        {state.user}'s Todo List
      </h1>
      <div className="p-8 bg-gray-100 rounded-lg shadow-md flex flex-col gap-2 max-h-96 overflow-auto scrollbar">
        <AddTodo />

        {loading ? (
          <div className="flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <TodoList todos={state.todos} />
        )}
      </div>
    </section>
  );
}

export default Todos;
