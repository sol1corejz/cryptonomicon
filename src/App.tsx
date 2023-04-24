import React from 'react';
import './App.css';
import Loader from './components/Loader';
import CryptoGraph from './components/CryptoGraph';
import ControlPanel from './components/ControlPanel';
import CryptoCardsBlock from './components/CryptoCardsBlock';
import { fetchNames } from './redux/cryptoSlice';
import { useAppDispatch } from './redux/store';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchNames());
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div className="container">
        <ControlPanel />
        <CryptoCardsBlock />
        <CryptoGraph />
      </div>
    </div>
  );
}

export default App;
