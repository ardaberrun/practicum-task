import { useState } from 'react';
import { Todo, useGlobalContext } from '../../context';
import { updateTodo, deleteTodo } from '../../service/todo.service';
import Input from '../Input';
import Loading from '../Loading';

type TodoItemProps = {
  todo: Todo;
};
function TodoItem({ todo }: TodoItemProps) {
  const { dispatch } = useGlobalContext();
  const [content, setContent] = useState<string>(todo.content || '');
  const [toggleEdit, setToggleEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      dispatch({ type: 'UPDATE_TODO', payload: { todo: updatedTodo } });

      await updateTodo(updatedTodo);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async () => {
    try {
      setLoading(true);
      const updatedTodo = { ...todo, content };
      dispatch({ type: 'UPDATE_TODO', payload: { todo: updatedTodo } });

      await updateTodo(updatedTodo);
      setToggleEdit(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch({ type: 'DELETE_TODO', payload: todo.id });
      await deleteTodo(todo.id);
    } catch (e) {
      console.log(e);
    }
  };

  return loading ? (
    <div className="bg-gray-200 p-2 rounded-lg flex justify-center items-center border">
      <Loading />
    </div>
  ) : toggleEdit ? (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => {
          setToggleEdit(false);
        }}
        className="w-6 h-6 text-red-500 text-lg font-bold"
      >
        X
      </button>
      <Input
        buttonClick={handleEdit}
        buttonDisabled={content.length < 3}
        buttonText="Edit"
        inputChange={(e) => setContent(e.target.value)}
        inputValue={content}
        placeholder="Edit Todo"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && content.length >= 3) {
            handleEdit();
          }
        }}
      />
    </div>
  ) : (
    <li
      onClick={handleToggle}
      className={`p-2 rounded-lg flex flex-col gap-2 sm:flex-row sm:gap-4 justify-between items-center border cursor-pointer transition duration-500 ${
        todo.isCompleted ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`w-full flex-grow text-base font-normal overflow-clip ${
          todo.isCompleted && 'text-white line-through'
        }`}
      >
        {todo.content}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();

            setContent(todo.content);
            setToggleEdit(true);
          }}
          className="bg-yellow-400 text-white font-semibold py-1 px-4 rounded focus:ring-yellow-400 focus:ring-offset-gray-100 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            
            handleDelete();
          }}
          className="bg-red-500 text-white font-semibold py-1 px-4 rounded focus:ring-red-500 focus:ring-offset-gray-100 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
