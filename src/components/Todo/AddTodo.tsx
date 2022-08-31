import { useState } from 'react';
import { useGlobalContext } from '../../context';
import { createTodo } from '../../service/todo.service';
import Input from '../Input';
import Loading from '../Loading';

function AddTodo() {
  const { dispatch } = useGlobalContext();
  const [content, setContent] = useState('');
  const [toggleAddButton, setToggleAddButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const addTodo = async () => {
    setLoading(true);
    try {
      const addedTodo = await createTodo(content);
      dispatch({ type: 'ADD_TODO', payload: addedTodo });

      setToggleAddButton(false);
      setContent('');
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center">
          <Loading />
        </div>
        <hr />
      </>
    );
  }

  return toggleAddButton ? (
    <>
      <div className="flex justify-center sm:justify-start items-center gap-2">
        <button
          onClick={() => {
            setToggleAddButton(false);
            setContent('');
          }}
          className="w-6 h-6 text-red-500 text-lg font-bold"
        >
          X
        </button>
        <Input
          buttonClick={addTodo}
          buttonText="Add"
          inputChange={(e) => setContent(e.target.value)}
          inputValue={content}
          placeholder="New Todo"
          buttonDisabled={content.length < 3}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && content.length >= 3) {
              addTodo();
            }
          }}
        />
      </div>
      <hr />
    </>
  ) : (
    <>
      <button
        onClick={() => setToggleAddButton(true)}
        className="w-max px-4 py-2 mx-auto sm:mx-0 rounded-md bg-green-500 text-white text-xl font-medium border-0 outline-0 focus:ring-green-500 focus:ring-offset-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Add Todo
      </button>
      <hr />
    </>
  );
}

export default AddTodo;
