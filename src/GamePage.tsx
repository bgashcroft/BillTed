import React, { SyntheticEvent } from 'react';


interface GamePageState {
    isWaiting: boolean;
}


interface GamePageProps {
    azureCommuncation: any;
    playerName: string;
    onLevel: (name: string) => void;
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {

    constructor(props: GamePageProps) {
        super(props);

        this.state = {  isWaiting: true };
    }

    handleName = (event: SyntheticEvent) => {
        var pn: string = (event.target as any).value;
       
    }

    handleNameClick = () => {
      
    }

    render() {
        return <table style={{ width: "100%", height: "100%", background: "" }}>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><label>Name</label></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="text"  onChange={this.handleName} /></td>
                    <td><button onClick={this.handleNameClick}>Go</button></td>
                </tr>
            </tbody>
        </table>;
    }
}