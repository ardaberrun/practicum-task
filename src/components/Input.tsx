import React from 'react';

type InputProps = {
  placeholder?: string;
  buttonText: string;
  buttonDisabled?: boolean;
  buttonClick: () => void;
  inputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

function Input({
  placeholder,
  buttonText,
  buttonClick,
  buttonDisabled,
  inputChange,
  inputValue,
  onKeyDown
}: InputProps) {
  return (
    <div className="w-full flex items-center gap-2">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full flex-grow border-2 transition-colors duration-300 border-gray-300 rounded-md focus:border-purple-600 outline-0 px-4 py-2"
        value={inputValue}
        onChange={inputChange}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={buttonClick}
        disabled={buttonDisabled}
        className="w-auto rounded-md bg-purple-600 px-4 py-2 text-white font-medium text-lg disabled:bg-purple-400 focus:ring-purple-600 focus:ring-offset-gray-100 transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Input;
