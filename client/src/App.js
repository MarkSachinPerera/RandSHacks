import React, { useState } from 'react';
import Routes from './routes/routes';

import './App.css';
import NavBar from './components/navigation/NavBar';

function App({ history }) {
  const [score, setScore] = useState(0);
  const [buttonType, setButtonType] = useState(0);

  const updateScore = (s) => {
    let temp = score + s;
    setScore(temp);
  };

  const handleButtonClick = (buttonType) => {
    if (buttonType === 'Start Challenge') {
      setButtonType('Stop');
    } else {
      setButtonType('Start Challenge');
    }
  };

  const renderButtonColor = () => {
    let bt = 'blue';
    if (buttonType === 'Start Challenge') {
      bt = 'blue';
    } else {
      bt = 'red';
    }
    return bt;
  };
  return (
    <div id="App">
      <NavBar history={history} name="Current Challenges" score={score} />
      <Routes updateScore={updateScore} handleButtonClick={handleButtonClick} />
    </div>
  );
}

export default App;
