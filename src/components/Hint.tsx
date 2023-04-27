import React from 'react';
import { useAppDispatch } from '../redux/store';

const Hint: React.FC<{ name: string; setValue: (arg: string) => void }> = ({ name, setValue }) => {
  return (
    <span
      onClick={() => {
        setValue(name);
      }}
      className="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
      {name}
    </span>
  );
};

export default Hint;
