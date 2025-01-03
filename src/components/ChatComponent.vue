<template>
    <div class="root-chat">
        <chat-list-component :id="chattingId" @roomActive="sendId" :chat-rooms="chatRooms"
            @updateMessage="updateMessage" @updateChatList="updateChatList"/>
        <chatting-component v-if="chattingId" :id="chattingId"
            @newMessage="updateMessage" @quitChattingRoom="updateChatList"/>
    </div>
</template>

<script setup>
import ChatListComponent from './ChatListComponent.vue';
import ChattingComponent from './ChattingComponent.vue';
import { ref, onMounted } from 'vue';
import axios from '@/plugins/axiosInstance'
import { remainTime } from '@/plugins/formatDate';

const chattingId = ref(null);
const chatRooms = ref([]);
const myId = ref("");

const sendId = (data) => {
    chattingId.value = data.id;
}

const updateMessage = (newMessage) => {
    const roomIndex = chatRooms.value.findIndex(room => room.roomId === chattingId.value);
    if (roomIndex !== -1) {
        const updatedRooms = [...chatRooms.value];
        updatedRooms[roomIndex].latestMessage = newMessage.message;
        updatedRooms[roomIndex].sendDate = remainTime(newMessage.sendDate);
        const [movedRoom] = updatedRooms.splice(roomIndex, 1);
        chatRooms.value = [movedRoom, ...updatedRooms];
    }
}

const updateChatList = (payload) => {
    const roomId = payload.roomId;
    chatRooms.value = chatRooms.value.filter((room) => room.roomId !== roomId);
}

onMounted(() => {
    myId.value = localStorage.getItem('talk-wave-id');
    axios.get(`/chat/rooms?userId=${myId.value}`).then((response) => {
        chatRooms.value = response.data; // 방 목록을 chatRooms에 저장
        console.log(chatRooms.value)
        if (chatRooms.value.length > 0) {
            chattingId.value = chatRooms.value[0].roomId; // 첫 번째 방의 roomId를 기본값으로 설정
        }
    })
    .catch((error) => {
        console.error(error);
    })
})
</script>

<style scoped>
.root-chat {
    display : flex;
    height : 100vh;
}
</style>