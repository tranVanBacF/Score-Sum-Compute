import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateGame from './pages/CreateGame';
import GameScore from './pages/GameScore';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Route path='/' exact={true} render={() => {
          return (<Redirect to='/create-game'></Redirect>)
        }}></Route>
        <Route path='/create-game' component={CreateGame}>
        </Route>
        <Route path='/games/:gameId' component={GameScore}></Route>

      </BrowserRouter>
    </div>
  );
}

export default App;
