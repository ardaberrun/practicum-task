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

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-2.5">
          <Loading />
        </div>
      ) : toggleAddButton ? (
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
      ) : (
        <div className="inline-flex justify-self-start">
          <button
            onClick={() => setToggleAddButton(true)}
            className="w-max px-4 py-2 mx-auto sm:mx-0 rounded-md bg-green-500 text-white text-xl font-medium border-0 outline-0 hover:bg-green-600"
          >
            Add Todo
          </button>
        </div>
      )}
      <hr />
    </>
  );
}

export default AddTodo;
