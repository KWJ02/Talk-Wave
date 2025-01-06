<template>
    <div class="root-chat">
        <chat-list-component @roomActive="sendId" @initRooms="initRooms" @receiveMessage="receiveMessage" />

        <chatting-component v-if="chattingId" :id="chattingId"
            @quitChattingRoom="updateChatList" :newMessage="newMessage" />
    </div>
</template>

<script setup>
import ChatListComponent from './ChatListComponent.vue';
import ChattingComponent from './ChattingComponent.vue';
import { ref, onUnmounted, provide } from 'vue';
import { Client } from '@stomp/stompjs';

const baseURL = process.env.VUE_APP_API_URL;
const wsUrl = `${baseURL.replace("http", "ws")}/ws-stomp`;

const stompClient = new Client({
    brokerURL: wsUrl,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    maxReconnectAttempts: 5, 
});

const chatRooms = ref([]);
const chattingId = ref(null);
const newMessage = ref([])
// const recentMessage = ref([]) // 특정 방에서 메세지 입력됐을때

const initRooms = (payload) => {
    chatRooms.value = payload.rooms;
}

const sendId = (payload) => {
    chattingId.value = payload.id;
}

const updateChatList = (payload) => {
    const roomId = payload.roomId;
    chatRooms.value = chatRooms.value.filter((room) => room.roomId !== roomId);
}

const receiveMessage = (payload) => {
    if (chattingId.value === payload.id) {
        newMessage.value = payload.data;
    }
}

onUnmounted(() => {
    stompClient.deactivate();
});

provide('stompClient', stompClient);
stompClient.activate();
</script>

<style scoped>
.root-chat {
    display : flex;
    height : 100vh;
}
</style>