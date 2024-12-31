<template>
    <div class="root-chat">
        <chat-list-component :id="chattingId" @roomActive="sendId"/>
        <chatting-component v-if="chattingId" :id="chattingId"/>
    </div>
</template>

<script setup>
import ChatListComponent from './ChatListComponent.vue';
import ChattingComponent from './ChattingComponent.vue';
import { ref, onMounted } from 'vue';
import axios from '@/plugins/axiosInstance'

const chattingId = ref(null);
const chatRooms = ref([]);

const sendId = (data) => {
    chattingId.value = data.id;
}

onMounted(() => {
    axios.get('/chat/rooms').then((response) => {
        chatRooms.value = response.data; // 방 목록을 chatRooms에 저장
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