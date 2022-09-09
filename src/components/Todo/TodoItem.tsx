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
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEdit = async (action: string = 'content') => {
    let editTodo: Todo;
    try {
      setLoading(true);

      if (action === 'toggle') {
        editTodo = { ...todo, isCompleted: !todo.isCompleted };
      } else {
        editTodo = { ...todo, content };
      }

      const updatedTodo = await updateTodo(editTodo);
      dispatch({ type: 'UPDATE_TODO', payload: { todo: updatedTodo } });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const deletedTodo = await deleteTodo(todo.id);
      dispatch({ type: 'DELETE_TODO', payload: deletedTodo.id });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return editMode ? (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => {
          setEditMode(false);
        }}
        className="w-6 h-6 text-red-500 text-lg font-bold"
      >
        X
      </button>
      <Input
        buttonClick={() => {
          handleEdit();
          setEditMode(false);
        }}
        buttonDisabled={content.length < 3}
        buttonText="Edit"
        inputChange={(e) => setContent(e.target.value)}
        inputValue={content}
        placeholder="Edit Todo"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && content.length >= 3) {
            handleEdit();
            setEditMode(false);
          }
        }}
      />
    </div>
  ) : (
    <li
      onClick={() => handleEdit('toggle')}
      className={`relative p-2 rounded-lg flex flex-col gap-2 sm:flex-row sm:gap-4 justify-between items-center border cursor-pointer transition duration-500 ${
        todo.isCompleted ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      {loading && (
        <div
          className={`${
            todo.isCompleted ? 'bg-gray-600' : 'bg-purple-400'
          } absolute p-2 rounded-lg w-full h-full opacity-40 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
        />
      )}
      <span
        className={`relative w-full flex-grow text-base font-normal overflow-hidden whitespace-nowrap overflow-ellipsis break-words ${
          todo.isCompleted && 'text-white line-through'
        }`}
      >
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <Loading />
          </div>
        )}
        {todo.content}
      </span>
      <div className="flex items-center gap-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();

            setContent(todo.content);
            setEditMode(true);
          }}
          className="bg-yellow-400 text-white font-semibold py-1 px-4 rounded"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();

            handleDelete();
          }}
          className="bg-red-500 text-white font-semibold py-1 px-4 rounded focus:ring-red-500 focus:ring-offset-inherit transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
