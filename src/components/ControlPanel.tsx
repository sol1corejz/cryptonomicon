import React from 'react';
import { fetchCrypto } from '../redux/cryptoSlice';
import { useAppDispatch } from '../redux/store';
import Hint from './Hint';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useSelector((state: RootState) => state.crypto.names);
  const addedCrypto = useSelector((state: RootState) => state.crypto.values.items);

  const [value, setValue] = React.useState('');
  const [isAdded, setIsAdded] = React.useState(false);
  const [searchItems, setSearchItems] = React.useState<string[]>();

  React.useEffect(() => {
    addedCrypto.forEach((el) =>
      value.toLocaleUpperCase() === el.name ? setIsAdded(true) : setIsAdded(false),
    );

    setSearchItems(
      items.filter((item) => item.toLocaleLowerCase().includes(value.toLocaleLowerCase())),
    );
  }, [addedCrypto, items, value]);

  const getCrypto = () => {
    dispatch(fetchCrypto(value));
    setValue('');
  };

  const onChangeHadle = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    setIsAdded(false);
  };

  return (
    <section>
      <div className="flex">
        <div className="max-w-xs">
          <label htmlFor="wallet" className="block text-sm font-medium text-gray-700">
            Тикер
          </label>
          <div className="mt-1 relative rounded-md shadow-md">
            <input
              onKeyDown={(e) => (e.key === 'Enter' ? getCrypto() : '')}
              value={value}
              onChange={(e) => onChangeHadle(e)}
              type="text"
              name="wallet"
              id="wallet"
              className="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
              placeholder="Например DOGE"
            />
          </div>
          {value.length ? (
            <div className="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
              {searchItems &&
                searchItems
                  .slice(0, 4)
                  .map((el, index) => <Hint setValue={setValue} name={el} key={index} />)}
            </div>
          ) : (
            ''
          )}
          {isAdded && <div className="text-sm text-red-600">Такой тикер уже добавлен</div>}
        </div>
      </div>
      <button
        disabled={isAdded}
        onClick={() => getCrypto()}
        type="button"
        className={
          isAdded
            ? 'btn_disabled my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
            : 'my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        }>
        <svg
          className="-ml-0.5 mr-2 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#ffffff">
          <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
        </svg>
        Добавить
      </button>
    </section>
  );
};

export default ControlPanel;
