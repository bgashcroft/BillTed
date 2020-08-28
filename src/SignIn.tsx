import React, { SyntheticEvent } from 'react';
import { Button, Table, Row, Col } from "reactstrap";

interface DashBoardState {
    playerName: string;
    team: string;

}


interface DashBoardProps {
    isWaiting: boolean;
    onName: (name: string, team: string) => void;
    onTeamComplete: ( team: string) => void;
    waitMessages: string;
    teams: string[];
}

export default class Welcome extends React.Component<DashBoardProps, DashBoardState> {

    constructor(props: DashBoardProps) {
        super(props);

        this.state = { playerName: "", team: "Choose" };
    }

    handleName = (event: SyntheticEvent) => {
        var pn: string = (event.target as any).value;
        this.setState({ playerName: pn });
    }

    handleNameClick = () => {
        this.props.onName(this.state.playerName, this.state.team);
    }

    handleTeamClick = () => {
        this.props.onTeamComplete(this.state.team);
    }

    handleTeam = (event: SyntheticEvent) => {
        var pn: string = (event.target as any).value;
        this.setState({ team: pn });
    }

    render() {
        var table = null;

        if (this.props.isWaiting === false) {
            table = <table >
                <tbody>

                    <tr>
                        <td></td>
                        <td><label>Your Name</label></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="text" value={this.state.playerName} onChange={this.handleName} /></td>

                    </tr>
                    <tr>
                        <td></td>
                        <td><label>Your Team</label></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <select style={{ width: "100%" }} value={this.state.team} onChange={this.handleTeam}>
                                <option >Select</option>
                                <option >Team 1</option>
                                <option >Team 2</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><Button onClick={this.handleNameClick} color="Primary">Start</Button></td>
                    </tr>
                </tbody>
            </table>
        }
        else {
            table = <table >
                <tbody>
                    <tr>
                        <td></td>
                        <td><label>Waiting for other team</label></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><label>{this.props.waitMessages}</label></td>
                        <td></td>
                    </tr>
                    {
                        this.props.teams.map( x=> <tr><td></td><td>{x}</td></tr> )
                    }
                    <tr>
                        <td></td>
                        <td><button onClick={this.handleTeamClick} style={{ fontSize: "22px" }}>Team complete</button></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        }
        return <React.Fragment>
            <img src='./Images/Welcomepage.PNG' />
            {table}
        </React.Fragment>;
    }
}