import React from 'react';
import logo from './logo.svg';
import Signin from './SignIn';
import GamePage from './GamePage';
import FlightClient from "./SignalRConnection";
import Level1 from './Level1';

import './App.css';

interface AppState {
  mode: string;
  playerName: string;
  notification?: Notification;
  waitForTeam: boolean;
  waitMessage: string;
  team: string;
  teams: string[];
  completeTeams: string[];
  messages: string[];
  choice: string;
}
interface AppProps {

}

export default class App extends React.Component<AppProps, AppState> {
  flightClient: FlightClient;
  constructor(props: AppProps) {
    super(props);
    this.state =
    {
      mode: "Welcome",
      playerName: "",
      waitForTeam: false,
      team: "",
      waitMessage: "",
      teams: [],
      completeTeams: [],
      messages: [],
      choice: ""
    };
    this.flightClient = new FlightClient(this.onTeamComplete, this.getMessage, this.getChoice);
  }

  sendMessage = (message: string) => {
    this.flightClient.sendMessage(this.state.team, message);
  }

  getMessage = (team: string, message: string) => {
    var messages = this.state.messages;
    messages.push(team + ":" + message);
    this.setState({ messages: messages });
  }

  getChoice = (team: string, choice: string) => {
    this.setState({ choice: team + ":" + choice });
  };

  sendChoice = (choice: string) => {
    this.flightClient.sendChoice(this.state.team, choice);
  }

  handleName = (name: string, team: string) => {
    this.setState({ playerName: name, waitForTeam: true, team: team });
    this.flightClient.handleConnect(name, this.onConnected);
  }

  onConnected = () => {
    this.flightClient.sendSignIn(this.state.playerName, this.state.team, this.onTeamSign);
  }

  onTeamSign = (notification: string, teams: string[]) => {
    if (teams.length >= 6) {
      this.setState({ mode: "Level1" });
    }
    else {
      if (notification.includes(this.state.playerName) === false)
        this.setState({ waitMessage: notification, teams: teams });
    }
  }

  onTeamComplete = (team: string) => {
    this.setState({ mode: "Level1" });
    var teams = this.state.completeTeams;
    if (teams.length == 0) {
      teams.push(team);
      this.setState({ completeTeams: teams });
    }
    else
      this.setState({ mode: "Level1" });
  }


  handleLevel = (level: string) => {
    this.setState({ mode: "Level2" });
  }

  render() {

    var content = null;
    switch (this.state.mode) {
      case "Welcome":
        content = <Signin
          isWaiting={this.state.waitForTeam}
          onName={this.handleName}
          waitMessages={this.state.waitMessage}
          teams={this.state.teams}
          onTeamComplete={this.onTeamComplete}
        />
        break;
      case "Level1":
        content = <GamePage
          levelData={(new Level1).levelDesign}
          playerName={this.state.playerName}
          onLevel={this.handleLevel}
          choice={this.state.choice}
          messages={this.state.messages}
          team={this.state.team}
          onSendChoice={this.sendChoice}
          onSendMessage={this.sendMessage}
        />
        break


      // case "Game":
      //   content = <GamePage  playerName={this.state.playerName} onLevel={this.handleLevel} />
      //   break

    }

    return <div className="App">
      <header className="App-header">
        {content}
      </header>
    </div>
  }
}


