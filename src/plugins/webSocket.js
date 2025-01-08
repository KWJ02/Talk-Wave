// plugins/webSocket.js 파일 생성
import { Client } from '@stomp/stompjs';

const baseURL = process.env.VUE_APP_API_URL;
const wsUrl = `${baseURL.replace("http", "ws")}/ws-stomp`;

export const stompClient = new Client({
    brokerURL: wsUrl,
    reconnectDelay: 5000,
    heartbeatIncoming: 0,
    heartbeatOutgoing: 0,
});

// 초기 연결
if (!stompClient.connected) {
    stompClient.activate();
}