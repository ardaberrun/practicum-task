import { useState } from 'react';
import { useGlobalContext } from '../context';
import Input from './Input';

function Login() {
  const { dispatch } = useGlobalContext();
  const [username, setUsername] = useState('');

  const handleClick = () => {
    localStorage.setItem('user', username);
    dispatch({ type: 'SET_USER', payload: username });
  };

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg shadow-md p-12 flex items-center gap-2">
      <Input
        buttonClick={handleClick}
        buttonText="Enter"
        inputChange={(e) => setUsername(e.target.value)}
        inputValue={username}
        placeholder="Enter Username"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && username.length > 0) {
            handleClick();
          }
        }}
      />
    </div>
  );
}

export default Login;
