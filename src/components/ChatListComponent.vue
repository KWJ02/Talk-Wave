<template>
    <div class="root-chat-list">
        <div class="search-container">
            <img src="@/assets/images/icon_chat_room_search.svg" alt="search" class="icon-search"/>
            <input type="text" class="search" placeholder="검색"/>
        </div>

        <div class="chat-room-list-container">

            <div class="chat-room-list" v-for="(item, index) in chatList" :key="index" @click="activeItem(item.id)"
                :class="{'active-room' : pointer === item.id, 'last-item' : index === chatList.length - 1}">
                <div class="user-profile">
                    <img :src="changeProfile(pointer === index)" alt="user"/>
                </div>

                <div class="chat-section">
                    <div class="chat-title-section">
                        <div class="chat-title">{{ item.title }}</div>
                        <div class="chat-time">{{ item.time }}</div>
                    </div>

                    <div class="chat-description-section">
                        <div class="chat-description">
                            {{ item.description }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import profile from '@/assets/images/icon_chat_user.svg'
import activeProfile from '@/assets/images/icon_chat_user_active.svg'

const pointer = ref(0);
const emit = defineEmits(['roomActive']);

const changeProfile = (result) => {
    if(result) {
        return activeProfile
    } else {
        return profile
    }
}

const chatList = ref([
    {
        id : 0,
        title : "이름",
        time : "오후 5:02",
        description : "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
    {
        id : 1,
        title : "이름",
        time : "오후 5:02",
        description : "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
    {
        id : 2,
        title : "이름",
        time : "오후 5:02",
        description : "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
    {
        id : 3,
        title : "이름",
        time : "오후 5:02",
        description : "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
    {
        id : 4,
        title : "이름",
        time : "오후 5:02",
        description : "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
    {
        id : 5,
        title : "이름",
        time : "오후 5:02",
        description : "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
    },
])

const activeItem = (id) => {
    pointer.value = id;
    emit('roomActive', {id:pointer.value})
}
    
</script>

<style scoped>
::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
}

.root-chat-list {
    margin : 44px 0 0 16px;
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