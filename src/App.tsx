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
  questionNumber: number;
  level:any;
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
      choice: "",
      questionNumber: 0,
      level:(new Level1).levelDesign
    };
    this.flightClient = new FlightClient(this.onTeamComplete, this.getMessage, this.getChoice, this.getNextQuestion);
  }

  getNextQuestion = (questionID: number) => {

    var questionNum =Number(questionID);
    if (questionNum>=this.state.level.questions.length){
      this.setState({choice:"",questionNumber:0});
      this.handleLevel("");
    }
    this.setState({ choice: "", questionNumber: questionNum });
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
    if (team != this.state.team)
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

  onlyUnique = (value: any, index: any, self: any) => {
    return self.indexOf(value) === index;
  }

  onTeamComplete = (team: string[]) => {

    if (team.length == 2 && this.state.completeTeams.length == 2)
      return;

    var completeTeams: string[] = [];
    for (var i = 0; i < team.length; i++)
      completeTeams.push(team[i]);

    var teams = this.state.completeTeams;
    for (var i = 0; i < team.length; i++)
      teams.push(team[i]);

    teams = teams.filter(this.onlyUnique);

    if (teams.length == 2) {
      this.flightClient.sendTeamComplete(teams);
      this.setState({ mode: "Level1", completeTeams: teams });
    }
    else {
      this.setState({ completeTeams: teams });
    }
  }

  onTeamCompleteLocal = (team: string[]) => {

    if (team.length == 2 && this.state.completeTeams.length == 2)
      return;

    var completeTeams: string[] = [];
    for (var i = 0; i < team.length; i++)
      completeTeams.push(team[i]);

    var teams = this.state.completeTeams;
    for (var i = 0; i < team.length; i++)
      teams.push(team[i]);

    teams = teams.filter(this.onlyUnique);

    if (teams.length == 2) {
      this.flightClient.sendTeamComplete(teams);
      this.setState({ mode: "Level1", completeTeams: teams });
    }
    else {
      if (teams.length == 1) {
        this.flightClient.sendTeamComplete(teams);
      }
      else {
        this.setState({ completeTeams: teams });
      }
    }
  }

  onSendQuestion = (index: number) => {
    this.flightClient.setQuestionIndex(index);
  }

  handleLevel = (level: string) => {
    switch (this.state.mode) {
      case "Level1":

        this.setState({ mode: "Level2" });
        break;
      case "Level2":
        this.setState({ mode: "Level3" });
        break;
    }
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
          onTeamComplete={this.onTeamCompleteLocal}
        />
        break;
      default:
        content = <GamePage

          levelData={this.state.level}
          playerName={this.state.playerName}
          onLevel={this.handleLevel}
          otherTeamChoice={this.state.choice}
          messages={this.state.messages}
          team={this.state.team}
          onSendChoice={this.sendChoice}
          onSendMessage={this.sendMessage}
          onSendQuestion={this.onSendQuestion}
          questionIndex={this.state.questionNumber}
        />
        break

    }

    return <div className="App">
      <header className="App-header">
        {content}
      </header>
    </div>
  }
}


