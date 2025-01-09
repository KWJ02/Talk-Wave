<template>
    <div class="root-chat">
        <chat-list-component @roomActive="sendId" @initRooms="initRooms" @receiveMessage="receiveMessage" :key="listForceKey"/>

        <chatting-component v-if="chattingId" :id="chattingId"
            @quitChattingRoom="updateChatList" :newMessage="newMessage" />
    </div>
</template>

<script setup>
import ChatListComponent from './ChatListComponent.vue';
import ChattingComponent from './ChattingComponent.vue';
import { ref } from 'vue';

const chatRooms = ref([]);
const chattingId = ref(null);
const newMessage = ref([]);
const listForceKey = ref(0);

const initRooms = (payload) => {
    chatRooms.value = payload.rooms;
}

const sendId = (payload) => {
    chattingId.value = payload.id;
}

const updateChatList = (payload) => {
    const roomId = payload.roomId;
    chatRooms.value = chatRooms.value.filter((room) => room.roomId !== roomId);
    listForceKey.value++;
}

const receiveMessage = (payload) => {
    if (chattingId.value === payload.id) {
        newMessage.value = payload.data;
    }
}
</script>

<style scoped>
.root-chat {
    display : flex;
    height : 100vh;
}
</style>