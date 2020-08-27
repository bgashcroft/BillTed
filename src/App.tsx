import React from 'react';
import logo from './logo.svg';
import Signin from './SignIn';
import GamePage from './GamePage';


import './App.css';

interface AppState {
  mode: string;
  playerName: string;
}
interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {

  constructor(props: AppProps) {
    super(props);
    this.state = { mode: "Welcome", playerName: "" };
  }


  handleName = (name: string) => {
    this.setState({ playerName: name, mode: "Game" });
  }


  handleLevel = (level: string) => {
    this.setState({ mode: "Level2" });
  }

  render() {

    var content = null;
    switch (this.state.mode) {
      case "Welcome":
        content = <Signin azureCommuncation={""} onName={this.handleName} />
        break;
      case "Game":
        content = <GamePage azureCommuncation={""} playerName={this.state.playerName} onLevel={this.handleLevel} />
        break

    }

    return <div className="App">
      <header className="App-header">
        {content}
      </header>
    </div>
  }
}


