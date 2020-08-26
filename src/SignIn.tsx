import React, { SyntheticEvent } from 'react';


interface DashBoardState {
    playerName: string;
    isWaiting: boolean;
}


interface DashBoardProps {
    azureCommuncation: any;
    onName: (name: string) => void;
}

export default class Welcome extends React.Component<DashBoardProps, DashBoardState> {

    constructor(props: DashBoardProps) {
        super(props);

        this.state = { playerName: "", isWaiting: true };
    }

    handleName = (event: SyntheticEvent) => {
        var pn: string = (event.target as any).value;
        this.setState({ playerName: pn });
    }

    handleNameClick = () => {
        this.props.onName(this.state.playerName);
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
                    <td><input type="text" value={this.state.playerName} onChange={this.handleName} /></td>
                    <td><button onClick={this.handleNameClick}>Go</button></td>
                </tr>
            </tbody>
        </table>;
    }
}