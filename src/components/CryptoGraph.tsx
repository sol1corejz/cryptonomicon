import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { ItemType, chooseElement, fetchCrypto } from '../redux/cryptoSlice';
import { isVisible } from '@testing-library/user-event/dist/utils';

const CryptoGraph: React.FC = () => {
  const chosenElemenet = useSelector((state: RootState) => state.crypto.chosenElemenet);
  const { items } = useSelector((state: RootState) => state.crypto.values);
  const graph = useSelector((state: RootState) => state.crypto.graph);
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = React.useState(false);

  let bars = [];

  let element = chosenElemenet !== null ? items[chosenElemenet] : { name: '', price: 0 };

  React.useEffect(() => {
    if (chosenElemenet !== null) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [chosenElemenet]);

  setInterval(() => {
    if (element.name.length) dispatch(fetchCrypto(element.name));
  }, 1000);

  React.useEffect(() => {
    bars.push(element.price);
  }, [graph]);

  const onHadleClose = () => {
    setIsVisible(false);
    dispatch(chooseElement(null));
  };

  return (
    <section className="relative">
      {isVisible && (
        <>
          <h3 className="text-lg leading-6 font-medium text-gray-900 my-8">{element.name}</h3>
          <div className="flex items-end border-gray-600 border-b border-l h-64">
            {graph.map((bar, index) => (
              <div key={index} className="bg-purple-800 border w-10 h-24"></div>
            ))}
          </div>
          <button onClick={() => onHadleClose()} type="button" className="absolute top-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="30"
              height="30"
              x="0"
              y="0"
              viewBox="0 0 511.76 511.76"
              xmlSpace="preserve">
              <g>
                <path
                  d="M436.896,74.869c-99.84-99.819-262.208-99.819-362.048,0c-99.797,99.819-99.797,262.229,0,362.048    c49.92,49.899,115.477,74.837,181.035,74.837s131.093-24.939,181.013-74.837C536.715,337.099,536.715,174.688,436.896,74.869z     M361.461,331.317c8.341,8.341,8.341,21.824,0,30.165c-4.16,4.16-9.621,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    l-75.413-75.435l-75.392,75.413c-4.181,4.16-9.643,6.251-15.083,6.251c-5.461,0-10.923-2.091-15.083-6.251    c-8.341-8.341-8.341-21.845,0-30.165l75.392-75.413l-75.413-75.413c-8.341-8.341-8.341-21.845,0-30.165    c8.32-8.341,21.824-8.341,30.165,0l75.413,75.413l75.413-75.413c8.341-8.341,21.824-8.341,30.165,0    c8.341,8.32,8.341,21.824,0,30.165l-75.413,75.413L361.461,331.317z"
                  fill="#718096"
                  data-original="#000000"></path>
              </g>
            </svg>
          </button>
        </>
      )}
    </section>
  );
};

export default CryptoGraph;
