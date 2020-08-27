import React, { SyntheticEvent } from 'react';
import { FrameData, QuestionPage, Options, OptionActions } from "./LevelObjects";
import Level1 from './Level1';

interface GamePageState {
    isWaiting: boolean;
    level?: FrameData;
    questionIndex: number;
    points: number;
}


interface GamePageProps {
    azureCommuncation: any;
    playerName: string;
    onLevel: (name: string) => void;
}





interface OptionItemProps {
    option: Options;
    onClick: (option: Options) => void;
}

class OptionItem extends React.Component<OptionItemProps> {

    constructor(props: OptionItemProps) {
        super(props);
    }

    handleClick=()=>{
        this.props.onClick(this.props.option);
    }

    render()
    {
      return  <li onClick={this.handleClick}>{this.props.option.option}</li>
    }
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {

    constructor(props: GamePageProps) {
        super(props);

        this.state = {
            level: (new Level1).levelDesign,
            isWaiting: true,
            questionIndex: 0,
            points: 0
        };
    }

    handleOptionClick=(option:Options)=>{
        this.setState({questionIndex:this.state.questionIndex+1});
    }

    render() {
        if (typeof this.state.level === 'undefined') {
            return <div></div>
        }
        else {

            var question = this.state.level.questions[this.state.questionIndex];

            var options = <ul>{question.options.map((x) => {
                return <OptionItem option={x} onClick={this.handleOptionClick} />
            })}</ul>;

            return <table style={{ width: "100%", height: "100%", background: "" }}>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>{options}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>{question.theQuestion}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>;
        }
    }
}