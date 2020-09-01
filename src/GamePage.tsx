import React, { SyntheticEvent } from 'react';
import { FrameData, QuestionPage, Options, OptionActions } from "./LevelObjects";
import { Button, Table, Row, Col } from "reactstrap";

interface GamePageState {
    isWaiting: boolean;
    mypoints: number;
    theirPoints:number;
    messageOut: string;
    itemChoice?: Options;
    isChoice: boolean;
  
}

interface GamePageProps {
    playerName: string;
    team: string;
    onLevel: (name: string) => void;
    onSendMessage: (name: string) => void;
    onSendChoice: (name: string) => void;
    onSendQuestion:(index:number)=>void;
    levelData: FrameData;
    messages: string[];
    otherTeamChoice: string;
    questionIndex:number;

}

interface OptionItemProps {
    option: Options;
    onClick: (option: Options) => void;
}

class OptionItem extends React.Component<OptionItemProps> {

    constructor(props: OptionItemProps) {
        super(props);
    }

    handleClick = () => {
        this.props.onClick(this.props.option);
    }

    render() {
        return <td> <Button onClick={this.handleClick}>{this.props.option.option}</Button></td>
    }
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {
    currentQuestionID:number;
    constructor(props: GamePageProps) {
        super(props);
      this.  currentQuestionID=0;
        this.state = {
            isWaiting: true,
            mypoints: 0,
            messageOut: "",
            isChoice: false,
            theirPoints:0
        };
    }

    handleSendMessage = () => {
        this.props.onSendMessage(this.state.messageOut);
        this.setState({ messageOut: "" });
    }

    handleOptionClick = (option: Options) => {
        this.setState({ itemChoice: option });
        this.props.onSendMessage(this.props.playerName + " chose " + option.option);
       // this.props.onSendChoice(option.option);
    }

    sendOptionClick = () => {
        if (typeof this.state.itemChoice !== 'undefined')
        {
            this.props.onSendChoice(this.state.itemChoice.option);
             this.setState({ isChoice: true })
        }
    }

    handleMessage = (event: SyntheticEvent) => {
        var pn: string = (event.target as any).value;
        this.setState({ messageOut: pn });
    }

    renderQuestion() {
        if (typeof this.props.levelData === 'undefined') {
            return <div></div>
        }
        else {

            var question = this.props.levelData.questions[this.props.questionIndex];

            var options = <Row>{question.options.map((x) => {
                return <OptionItem option={x} onClick={this.handleOptionClick} />
            })}</Row>;

            var dude = null;
            if (typeof this.state.itemChoice !== 'undefined') {
                dude = <div>
                    <label> {this.props.levelData.dudeName + ": " + this.state.itemChoice.dudeStatement}</label> <br />
                    <label> {"Narrator: " + this.state.itemChoice.narrStatement}</label>
                </div>
            }
            return <React.Fragment>
                {dude}

                <img src={this.props.levelData.backgroundImage} />
                <table style={{ width: "100%", height: "100%" }}>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>{question.theQuestion}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td colSpan={3} align="center">
                                <table>
                                    <tbody>
                                        <tr>
                                            {options}
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3} align="center">
                                <table>
                                    <tbody>
                                        <tr>
                                            <Button onClick={this.sendOptionClick}>Send Answer</Button>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ width: "100%", height: "100%" }}>
                    <tbody>
                        {
                            this.props.messages.map(x => {
                                var parts = x.split(":");
                                if (parts[0].toLowerCase() == this.props.team.toLowerCase())
                                    return <tr>
                                        <td colSpan={3} align="center">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        {parts[1]}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                            }
                            )
                        }
                    </tbody>
                </table>
                <table style={{ width: "100%", height: "100%" }}>
                    <tbody>
                        <td colSpan={3} align="center">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="text" value={this.state.messageOut} onChange={this.handleMessage} />
                                        </td>
                                        <td>
                                            <Button onClick={this.handleSendMessage}>Send Team Message</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tbody>
                </table>
            </React.Fragment>;
        }
    }

    handleNextQuestion = () => {
        this.props.onSendQuestion( this.currentQuestionID + 1 );
    }
    renderChoice() {

        var question = this.props.levelData.questions[this.props.questionIndex];
        var otherTeam = this.props.otherTeamChoice;

        var parts = otherTeam.split(':')[1];
        var options: Options[] = question.options.filter(x => x.option === parts);
        var showTeam = null;
        if (typeof options !== 'undefined' && options !== null && options.length > 0) {
            var action = options[0].action == 1 ? "Correct" : "False";
            showTeam = <h3> {"Other Team : " + options[0].option + " which is " + action}</h3>
        }

        var ourTeam = null;
        if (typeof this.state.itemChoice !== 'undefined') {
            var action = this.state.itemChoice.action == 1 ? "Correct" : "False";
            ourTeam = <h3> {"Our Team : " + this.state.itemChoice.option + " which is " + action}</h3>
        }

        return <Table>
            <Row>
                <Col>
                    {showTeam}
                </Col>
            </Row>
            <Row>
                <Col>
                    {ourTeam}
                </Col>
            </Row>
            <Row>
                <Col>
                    {(showTeam !== null && ourTeam != null) ? <Button onClick={this.handleNextQuestion}>Next Question</Button> : <label>Waiting for other team</label>}
                </Col>
            </Row>
        </Table>
    }

    render() {
        if (this.currentQuestionID!==this.props.questionIndex)
        {
            this.currentQuestionID=this.props.questionIndex;
            this.setState({isChoice:false});
        }

        if (this.state.isChoice)
            return this.renderChoice();
        else
            return this.renderQuestion();
    }
}