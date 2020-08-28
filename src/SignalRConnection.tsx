import * as signalR from "@aspnet/signalr";


export default class FlightClient {
    private baseAPI: string;
    onNotification: (notification: Notification) => void;

    constructor(onNotification: (notification: Notification) => void) {
        this.onNotification = onNotification;
        this.baseAPI = "https://agentassist.nonprod.aa.com/adminBFF/api";
    }


    handlePing = (x: any) => {
        console.log(x);
    }

    sendPing = () => {
        var options: RequestInit = {
            mode: 'cors',
            method: "GET"
        };

        fetch(this.baseAPI + '/PingSignalR/message%20text', options);
    }


    handleConnect = (connectedCallback: () => void) => {

        //.withUrl('https://agentassist.nonprod.aa.com/adminBFF/api?user=' + "test",
        try {
            var connection = new signalR.HubConnectionBuilder()
                .withUrl(this.baseAPI + '?hub=flight')
                .build();

            connection.on('pingSignalR', this.handlePing);

            // connection.on('otherTarget', this.handleOtherTarget);
            connection.onclose(() => console.log('disconnected'));
            connection.start().then(connectedCallback).catch((reason) => { console.log(reason) });
        }
        catch (error) {
            console.log(error);
        }
    }
}