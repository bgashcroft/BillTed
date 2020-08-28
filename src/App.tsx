import React from 'react';
import logo from './logo.svg';
import Signin from './SignIn';
import GamePage from './GamePage';
import FlightClient from "./SignalRConnection";

import './App.css';

interface AppState {
  mode: string;
  playerName: string;
  notification?: Notification;
}
interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
  flightClient: FlightClient;
  constructor(props: AppProps) {
    super(props);
    this.state = { mode: "Welcome", playerName: "" };
    this.flightClient = new FlightClient(this.showNotification);
  }

  showNotification = (notification: Notification) => {
    this.setState({ notification: notification });
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


