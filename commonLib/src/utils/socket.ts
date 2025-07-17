export class SSSocket {
	private client: WebSocket | undefined;
	public isClose: boolean | undefined;
	public heartInterval = 10000; //心跳间隔时间
	public heartTimeout = 5000; //心跳超时时间
	public heartTimer: any = null; //心跳定时器
	public serverTimer: any = null; //服务器超时定时器
	public waitingMessages: string[] = [];
	public onMessage: ((data: any) => void) | undefined;
	constructor() {
		// this.createSocket();
		this.isClose = true; // tunnel 和 客户端的连接
	}

	public createSocket = () => {
		this.client = new WebSocket("ws://127.0.0.1:18088/");
		this.client.onopen = () => {
			console.warn("建立WebSocket连接成功");
			this.isClose = false;
			this.openDevice();
		};

		this.client.onmessage = (ev) => {
			const data = JSON.parse(ev.data);
			if (data.Method === "OpenDevice") {
			}

			if (this.onMessage) {
				this.onMessage(data);
			}
		};

		this.client.onclose = () => {
			this.isClose = true;
		};

		this.client.onerror = (_ev: Event) => {
			this.isClose = true;
		};
	};

	// 启动设备
	public openDevice = () => {
		let sendInfo = JSON.stringify({
			Method: "OpenDevice",
			PortType: "AUTO",
			PortPara: "",
			ExtendPara: "",
		});

		if (this.clientState() !== WebSocket.OPEN) {
			this.reStartSocket();
			this.waitingMessages.push(sendInfo);
			return;
		}
		if (this.client) {
			this.client.send(sendInfo);
		}
	};

	public terminalHeartBeat = () => {
		if (this.clientState() !== WebSocket.OPEN) {
			this.reStartSocket();

			return;
		}
		if (this.client) {
			this.client.send(
				JSON.stringify({
					Method: "TerminalHeartBeat",
				})
			);
		}
	};
	// 读取二代身份证
	public idReadCard = () => {
		let sendInfo = JSON.stringify({
			Method: "IdReadCard",
			CardType: "0",
			InfoEncoding: "1",
			TimeOutMs: "0",
		});
		if (this.clientState() !== WebSocket.OPEN) {
			this.reStartSocket();
			this.waitingMessages.push(sendInfo);
			return;
		}

		if (this.client) {
			this.client.send(sendInfo);
		}
	};

	// 读取磁条卡
	public magRead = (Tracks: number) => {
		let sendInfo = JSON.stringify({
			Method: "MagRead",
			Tracks,
			TimeOutSec: 20,
		});

		if (this.clientState() !== WebSocket.OPEN) {
			this.reStartSocket();
			this.waitingMessages.push(sendInfo);
			return;
		}

		if (this.client) {
			this.client.send(sendInfo);
		}
	};

	// 写入磁条卡
	public magWrite = (Tracks: number, TrackData1: string, TrackData2: string, TrackData3: string, TimeOutSec: number) => {
		let sendInfo = JSON.stringify({
			Method: "MagWrite",
			Tracks,
			TrackData1,
			TrackData2,
			TrackData3,
			TimeOutSec,
		});

		if (this.clientState() !== WebSocket.OPEN) {
			this.reStartSocket();
			this.waitingMessages.push(sendInfo);
			return;
		}

		if (this.client) {
			this.client.send(sendInfo);
		}
	};

	// 启动设备
	public CloseDevice = () => {
		let sendInfo = JSON.stringify({
			Method: "CloseDevice",
		});

		if (this.clientState() !== WebSocket.OPEN) {
			this.reStartSocket();
			this.waitingMessages.push(sendInfo);
			return;
		}

		if (this.client) {
			this.client.send(sendInfo);
		}
	};

	public closeSocket = () => {
		if (this.client) {
			this.client.close();
		}
	};

	public clientState = () => {
		if (this.client) {
			return this.client.readyState;
		}
		return WebSocket.CLOSED;
	};

	public reStartSocket = () => {
		this.client = new WebSocket("ws://127.0.0.1:18088/");
	};
}

export const ssSocket = new SSSocket();
