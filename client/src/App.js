import React from 'react';
import Routes from './routes/routes';

import './App.css';
import NavBar from './components/navigation/NavBar';

function App({ history }) {
  return (
    <div id="App">
      <NavBar history={history} name="Current Challenges" />
      <Routes />
    </div>
  );
}

export default App;
