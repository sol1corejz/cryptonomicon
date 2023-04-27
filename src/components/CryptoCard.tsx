import React from 'react';
import { useAppDispatch } from '../redux/store';
import { deleteCrypto, chooseElement } from '../redux/cryptoSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type CryptoCardProps = {
  index: number;
  name: string;
  price: number;
};

const CryptoCard: React.FC<CryptoCardProps> = ({ name, price, index }) => {
  const dispatch = useAppDispatch();

  const [isChosen, setIsChosen] = React.useState(false);
  const chosenElemenet = useSelector((state: RootState) => state.crypto.chosenElemenet);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(deleteCrypto(index));
  };

  const handleChoose = () => {
    setIsChosen(true);
    dispatch(chooseElement(index));
  };

  React.useEffect(() => {
    console.log(chooseElement);
    if (chosenElemenet !== index) {
      setIsChosen(false);
    }
  }, [chosenElemenet, index]);

  return (
    <div
      onClick={() => handleChoose()}
      className={
        isChosen
          ? 'bg-white overflow-hidden border shadow rounded-lg border-purple-800 border-solid cursor-pointer'
          : 'bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer'
      }>
      <div className="px-4 py-5 sm:p-6 text-center">
        <dt className="text-sm font-medium text-gray-500 truncate">{name} - USD</dt>
        <dd className="mt-1 text-3xl font-semibold text-gray-900">{price}</dd>
      </div>
      <div className="w-full border-t border-gray-200"></div>
      <button
        onClick={(e) => handleDelete(e)}
        className="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none">
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#718096"
          aria-hidden="true">
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"></path>
        </svg>
        Удалить
      </button>
    </div>
  );
};

export default CryptoCard;
