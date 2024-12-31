<template>
    <div class="root-chat">
        <chat-list-component @roomActive="sendId"/>
        <chatting-component :id="chattingId"/>
    </div>
</template>

<script setup>
import ChatListComponent from './ChatListComponent.vue';
import ChattingComponent from './ChattingComponent.vue';
import { ref } from 'vue';

const chattingId = ref(0);

const sendId = (data) => {
    chattingId.value = data.id;
}

</script>

<style scoped>
.root-chat {
    display : flex;
    height : 100vh;
}
</style>