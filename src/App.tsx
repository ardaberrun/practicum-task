import { useGlobalContext } from './context';
import Login from './components/Login';
import Todos from './components/Todo';

function App() {
  const { state: { user } } = useGlobalContext();

  return (
    <>
    <div className="py-12 min-h-screen bg-indigo-100 flex items-center justify-center">
      <div className="w-11/12 sm:max-w-xl h-full flex items-center justify-center">
        {!user ? <Login /> : <Todos />}
      </div>
    </div>
    </>
  );
}

export default App;
