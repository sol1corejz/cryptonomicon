import React from 'react';

import { useSelector } from 'react-redux';
import CryptoCard from './CryptoCard';
import { RootState } from '../redux/store';

const CryptoCardsBlock: React.FC = () => {
  const { items, status } = useSelector((state: RootState) => state.crypto.values);

  return (
    <>
      <hr className="w-full border-t border-gray-600 my-4" />
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {items.map((el, index) => (
          <CryptoCard key={index} name={el.name} price={el.price} index={index} />
        ))}
      </dl>
      <hr className="w-full border-t border-gray-600 my-4" />
    </>
  );
};

export default CryptoCardsBlock;
