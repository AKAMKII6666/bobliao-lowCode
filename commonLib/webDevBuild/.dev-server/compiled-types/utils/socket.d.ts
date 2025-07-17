export declare class SSSocket {
    private client;
    isClose: boolean | undefined;
    heartInterval: number;
    heartTimeout: number;
    heartTimer: any;
    serverTimer: any;
    waitingMessages: string[];
    onMessage: ((data: any) => void) | undefined;
    constructor();
    createSocket: () => void;
    openDevice: () => void;
    terminalHeartBeat: () => void;
    idReadCard: () => void;
    magRead: (Tracks: number) => void;
    magWrite: (Tracks: number, TrackData1: string, TrackData2: string, TrackData3: string, TimeOutSec: number) => void;
    CloseDevice: () => void;
    closeSocket: () => void;
    clientState: () => number;
    reStartSocket: () => void;
}
export declare const ssSocket: SSSocket;
//# sourceMappingURL=socket.d.ts.map