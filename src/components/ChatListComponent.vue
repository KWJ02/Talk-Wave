<template>
    <div class="root-chat-list">
        <div class="search-container">
            <img src="@/assets/images/icon_chat_room_search.svg" alt="search" class="icon-search"/>
            <input type="text" class="search" placeholder="검색"/>
        </div>

        <div class="chat-room-list-container">

            <div class="chat-room-list" v-for="(item, index) in chatRooms" :key="index" @click="activeItem(item.roomId)"
            :class="{
                        'active-room': item.roomId === id,
                        'last-item': index === chatRooms.length - 1
                    }">
                <div class="user-profile">
                    <img :src="changeProfile(item.roomId === id)" alt="user"/>
                </div>

                <div class="chat-section">
                    <div class="chat-title-section">
                        <div class="chat-title">{{ item.roomName }}</div>
                        <div class="chat-time">{{ remainTime(item.sendDate) }}</div>
                    </div>

                    <div class="chat-description-section">
                        <div class="chat-description">
                            {{ item.latestMessage }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import profile from '@/assets/images/icon_chat_user.svg'
import activeProfile from '@/assets/images/icon_chat_user_active.svg'
import { remainTime } from '@/plugins/formatDate';

const props = defineProps({
    id : {
        type : Number,
        required : true,
    },
    chatRooms: {
        type: Array,
        required: true
    },
    activeRoomId: {  // 추가
        type: Number,
        required: true
    },
    updateMessage: { // 부모 컴포넌트로부터 전달된 updateChatList를 props로 받기
        type: Function,
        required: true,
    }
})

const emit = defineEmits(['roomActive']);
const activeRoomId = ref(props.chatRooms[0]?.roomId);

const changeProfile = (isActive) => {
    return isActive ? activeProfile : profile;
}

const activeItem = (id) => {
    activeRoomId.value = id;
    emit('roomActive', { id: id })
}
</script>

<style scoped>
::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
}

.root-chat-list {
    margin : 44px 0 0 0;
    width : 320px;
    display : flex;
    flex-direction: column;
}

.search-container {
    height : 56px;
    border : solid 1px #BEC1CD;
    border-radius : 16px;
    display : flex;
    align-items: center;
    margin-bottom : 16px;
}

.icon-search {
    margin-left : 20px;
}

.search {
    width : 100%;
    outline : none;
    border : none;
    border-radius : 16px;
    line-height : 20px;
    margin : 0 12px;
    padding : 4px 4px;
}

.chat-room-list-container {
    margin : 8px 0 16px 0;
    display : flex;
    flex-direction: column;
    gap : 20px;
    overflow-y: scroll;
}

.chat-room-list {
    width : 320px;
    height : 108px;
    background-color: #F4F4FC;
    border-radius : 16px;
    display : flex;
    padding-right : 12px;
    box-sizing: border-box;
    cursor: pointer;
}

.active-room {
    color : #fff;
    background-color: #6785FF;
}

.active-room .chat-title,
.active-room .chat-time,
.active-room .chat-description {
  color: #fff;
}

.last-item {
    margin-bottom : 12px;
}

.user-profile {
    margin : 24px;
    align-items: center;
}

.chat-section {
    width : 100%;
    display : flex;
    flex-direction: column;
    margin-top : 24px;
}

.chat-title-section {
    display : flex;
    justify-content: space-between;
}

.chat-title {
    font-size : 1rem;
    font-weight : bold;
}

.chat-time {
    font-size : 0.75rem;
    color : #B6BEC8;
}

.chat-description-section {
    margin-top : 4px;
    padding-right : 72px;
}

.chat-description {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    white-space: normal;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size : 0.875rem;
    color : #B6BEC8;
}
</style>