import * as signalR from "@aspnet/signalr";


export default class FlightClient {
    private baseAPI: string;
    teamNotification: (team: string[]) => void;
    getMessage: (team: string, message: string) => void;
    getChoice: (team: string, choice: string) => void;
    getNextQuestion: (questionID:number)=>void;
    constructor(
        teamNotification: (team: string[]) => void,
        getMessage: (team: string, message: string) => void,
        getChoice: (team: string, choice: string) => void,
        getNextQuestion: (questionID:number)=>void
    ) {
        this.teamNotification = teamNotification;
        this.getMessage = getMessage;
        this.getChoice = getChoice;
        this.getNextQuestion = getNextQuestion;

        // this.baseAPI = "http://localhost:7071/api";
        this.baseAPI = "https://billtedbff.azurewebsites.net/api";
        this.teams = []
    }

    teams: string[]
    handleSignIn = (name: string, team: string) => {
        var key = team + ":" + name;
        var item = this.teams.filter(x => x == key);
        if (item == null)
            this.teams.push(key);
        if (typeof this.onReply !== "undefined") {
            this.onReply(name + " joined " + team, this.teams);
        }
    }



    handlePing = (x: any, y: any, z: any) => {
        console.log(x);
        console.log(y);
        console.log(z);
    }

    sendPing = () => {
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };

        fetch(this.baseAPI + '/PingSignalR/message%20text', options);
    }


    onReply?: (notification: string, teams: string[]) => void;

    sendSignIn = (user: string, team: string, onReply: (notification: string, teams: string[]) => void) => {
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };
        this.onReply = onReply;

        fetch(this.baseAPI + '/SignIn?user=' + user + '&team=' + team, options);
    }

    setQuestionIndex=(index:number)=>{
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };

        fetch(this.baseAPI + '/NextQuestion?Question=' +index, options);
      }
    

    sendTeamComplete = (team: string[]) => {
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };

        fetch(this.baseAPI + '/TeamComplete?team=' + team.join('-'), options);
    }

    sendMessage = (team: string, message: string) => {
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };

        fetch(this.baseAPI + '/SendMessage?team=' + team + '&message=' + message, options);
    }

    sendChoice = (team: string, choice: string) => {
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };

        fetch(this.baseAPI + '/ChoseAnswer?team=' + team + '&choice=' + choice, options);
    }

    handleConnect = (userID: string, connectedCallback: () => void) => {

        //.withUrl('https://agentassist.nonprod.aa.com/adminBFF/api?user=' + "test",
        try {
            var connection = new signalR.HubConnectionBuilder()
                .withUrl(this.baseAPI + '?user=' + userID)
                .build();

            connection.on('signedIn', this.handleSignIn);
            connection.on('getTeamComplete', this.teamNotification);
            connection.on('message', this.getMessage);
            connection.on('choice', this.getChoice);
            connection.on('getNextQuestion', this.getNextQuestion);
            

            // connection.on('otherTarget', this.handleOtherTarget);
            connection.onclose(() => console.log('disconnected'));
            connection.start().then(connectedCallback).catch((reason: any) => { console.log(reason) });
        }
        catch (error) {
            console.log(error);
        }
    }
}