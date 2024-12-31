<template>
    <div class="root-chatting">
        <div class="chatting-container">
            <transition name="slide" mode="out-in">
                <div class="chatting-title-section" v-if="!showSearch">
                    <div class="chatting-title">
                        <img src="@/assets/images/icon_chat_user.svg" alt="user" width="40px">
                        <div class="title">이름 : {{ id }}</div>
                        <span class="count">2</span>
                    </div>
                    <div class="chatting-fn">
                        <img src="@/assets/images/icon_chatting_search.svg" alt="search" class="icon-img" @click="showSearch = !showSearch">
                        <img src="@/assets/images/icon_chatting_menu.svg" alt="search" class="icon-img" @click="chatMenu = true">
                    </div>
                </div>
                <div v-else>
                    <v-container>
                        <v-text-field
                        class="search-bar"
                        v-model="searchQuery"
                        ref="searchInput"
                        solo
                        autofocus="true"
                        variant="none"
                        @blur="showSearch = false"
                        >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="search-icon">
                        <path d="M16.9268 17.04L20.4 20.4M19.28 11.44C19.28 15.7699 15.7699 19.28 11.44 19.28C7.11006 19.28 3.59998 15.7699 3.59998 11.44C3.59998 7.11006 7.11006 3.59998 11.44 3.59998C15.7699 3.59998 19.28 7.11006 19.28 11.44Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </v-text-field>
                        
                </v-container>
                </div>
            </transition>
        </div>

        <v-layout>
            <v-navigation-drawer
                v-model="chatMenu"
                location="right"
                temporary
                width="300"
            >

            <div class="list-content-container">
                <div class="list-title-section">
                    <div class="list-title">
                        참여인원
                    </div>
                    <div class="list-count">20</div>
                </div>

                <ul class="user-list">
                    <li class="user" v-for="(user, index) in userList" :key="index" :class="{'last-item' : index === userList.length - 1}" v-ripple>
                        <img src="@/assets/images/icon_chat_user.svg" alt="user" width="40px"/> {{ user.name }}
                    </li>
                </ul>
            </div>

            <div class="list-footer-section">
                <div class="quit-btn" v-ripple @click="quitDialog = true">
                    <img src="@/assets/images/icon_quit.svg" alt="quit" width="20px">
                    나가기
                </div>
            </div>
                
            </v-navigation-drawer>
        </v-layout>

        <v-dialog max-width="500" height="240" v-model="quitDialog" persistent="true">
            <v-card title="진짜 나갈거임?">
                <v-card-text>
                    난 몰러유
                </v-card-text>

                <div class="btn-section">
                    <div class="btn-cancel" @click="quitDialog = false" v-ripple>닫기</div>
                    <div class="btn-quit" @click="quitDialog = false" v-ripple>나가기</div>
                </div>
            </v-card>
        </v-dialog>

        <div class="chatting-box">
            <div ref="chatField" class="chat-field">
                <div class="chat" v-for="message in messageList" :key="message.id">
                    <div class="chat-info">
                        <div class="chat-user" v-if="message.type === 'receive'">
                            <img src="@/assets/images/icon_chat_user.svg" width="40px" alt="user" />
                        </div>

                        <div class="chat-container" :class="message.type">
                            <div class="user-name">{{ message.name }}</div>
                            <div class="chat-content">
                                <div v-html="message.msg.replace(/\n/g, '<br/>')"></div>
                            </div>
                            <div class="chat-time">{{ message.time }}</div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="input-field">
                <v-textarea
                v-model="userInput"
                class="chat-input" 
                rows="1"
                auto-grow
                variant="none"
                hide-details
                maxlength="512"
                @keydown="handleKeyDown"
                @keyup="handleKeyUp"/>
                
                <div class="img-container">
                    <img src="@/assets/images/icon_upload.svg" alt="upload" class="icon-img" @click="send" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, defineProps, watch } from 'vue';

const userInput = ref("");
const chatField = ref(null)
const chatMenu = ref(false);
const chatRoomId = ref(0)
const showSearch = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const quitDialog = ref(false);

const props = defineProps({
    id : {
        type : Number,
        required : true,
    },
})

watch(
    () => props.id,
    (newId) => {
        chatRoomId.value = newId;
})

watch(showSearch, (isShow) => {
    if(isShow) {
        nextTick(() => {
            searchInput.value?.focus();
        })
    }
})

const messageList = ref([
    {
        id : 0,
        type : "receive",
        msg : "님아",
        name : "이름",
        time : "오전 09:43",
    },
    {
        id : 1,
        type : "send",
        msg : "?",
        time : "오전 09:43",
    }
])

const userList = ref([
{
        id : 0,
        name : "엄준식",
    },
    {
        id : 1,
        name : "엄준식",
    },
    {
        id : 2,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
    {
        id : 3,
        name : "엄준식",
    },
])

const handleKeyDown = (event) => {
  if (!event.shiftKey && event.key === "Enter") {
    // Enter키만 눌렀을 때 줄바꿈을 방지하고 기본 동작을 막습니다.
    event.preventDefault();
  }
};

const handleKeyUp = (event) => {
    if (event.shiftKey && event.key === "Enter") {
        // Shift+Enter -> 줄바꿈 (기본 동작 유지)
        return;
    }

    if (!event.shiftKey && event.key === "Enter") {
        // Enter만 -> send 함수 호출
        event.preventDefault(); // 줄바꿈 방지
        send();
    }
};

const send = () => {
    if(!userInput.value.trim()){
        return
    }

    const newIdx = messageList.value.at(-1) !== undefined ? messageList.value.at(-1).id + 1 : 0;

    const newMsgObj = {
        id : newIdx,
        type : "send",
        msg : userInput.value.trim(),
    }

    userInput.value = "";
    messageList.value.push(newMsgObj);

    nextTick(() => {
        const chat = chatField.value;
          if (chat) {
            chat.scrollTop = chat.scrollHeight;
          }
    })
}
</script>

<style scoped>
.root-chatting {
    width : 100%;
    height : 100vh;
    padding : 0 20px;
    display : flex;
    flex-direction: column;
}

.chatting-container {
    margin-top : 56px;
    width : 100%;
    display : flex;
    flex-direction: column;
}

.chatting-title-section {
    width :100%;
    height : 56px;
    display : flex;
    justify-content: space-between;
}

.chatting-title {
    margin-left : 20px;
    display : flex;
    align-items: center;
    justify-content: center;
}

.title {
    margin-left : 16px;
}

.count {
    margin-left : 8px;
    color : #697077;
}

.chatting-fn {
    display : flex;
    align-items: center;
    justify-content: center;
    gap : 32px;
    margin-right : 40px;
}

.icon-img {
    width : 24px;
    height : 24px;
    cursor: pointer;
}

.search-bar {
    background-color : var(--primary);
    border-radius : 16px;
    color : #fff;
}

.search-icon {
    position : fixed;
    right : 16px;
    cursor: pointer;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.1s ease;
}

.slide-enter-from {
  transform: translateX(0%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(0%);
  opacity: 0;
}

.chatting-container {
  overflow: hidden;
}

:deep(.v-container) {
    padding : 0;
}

:deep(.v-messages),
:deep(.v-input__details),
:deep(.v-text-field .v-input__details) {
    display : none;
}

:deep(.v-field__input) {
    min-height : 0;
}

:deep(.v-text-field .v-field--no-label input) {
    padding-right : 40px;
}

:deep(.v-card-actions) {
    justify-content: space-around !important;
}

:deep(.v-dialog > .v-overlay__content > .v-card) {
    border-radius: 16px !important;
}

.list-content-container {
    padding : 16px;
    overflow-y: hidden;
}

.list-title-section {
    display : flex;
    align-items: center;
    justify-content: start;
}

.list-title {
    font-size : 1.25rem;
    color : #000000;
}

.list-count {
    border-radius: 12px;
    padding : 4px 8px;
    margin-left : 12px;
    background-color: var(--primary);
    color : #fff;
}

.user-list {
    width : 100%;
    margin-top : 12px;
    list-style-type: none;
    overflow-y: auto;
}

.user {
    width : 100%;
    display : flex;
    align-items: center;
    gap : 12px;
    padding : 12px;
    margin-bottom : 12px;
    background-color: #EDF0F9;
    border-radius : 16px;
    cursor: pointer;
}

.last-item {
    margin-bottom : 44px;
}

.list-footer-section {
    width : 100%;
    position : fixed;
    padding-right : 16px;
    bottom : 0;
}

.list-footer-section .quit-btn {
    display : flex;
    align-items: center;
    gap : 12px;
    padding : 12px 12px 12px 16px;
    color : #fff;
    background-color: var(--primary);
    border-radius : 0 0 0 16px;
    cursor: pointer;
}

.btn-section {
    padding : 0 16px;
    margin-bottom : 16px;
    display : flex;
    align-items: center;
    justify-content: space-around;
    gap : 16px;
}

.btn-section div {
    padding : 12px 16px;
    font-size : 1rem;
    border-radius: 16px;
    display : flex;
    justify-content: center;
}

.btn-section .btn-cancel {
    flex-grow: 1;
    color : #fff;
    background-color: #B6BEC8;
}

.btn-section .btn-quit {
    flex-grow: 1;
    color : #fff;
    background-color: var(--primary);
}

.chatting-box {
    width : 100%;
    margin : 24px 0 16px 0;
    box-sizing : border-box;
    padding : 16px 0 16px 16px;
    flex-grow: 1;
    background-color: #EDF0F9;
    border-radius: 24px;
    display : flex;
    flex-direction: column; /* 메시지를 위에서 아래로 배치 */
    overflow: hidden;
}

.v-layout {
    flex : 0
}

:deep(.v-navigation-drawer--temporary.v-navigation-drawer--active) {
    box-shadow: none !important;
}

:deep(.v-navigation-drawer) {
    border-radius: 16px 0 0 16px !important;
}

.chat-field {
    width : 100%;
    display : flex;
    flex-direction: column;
    overflow-y: auto;
    margin : 8px 0;
    padding-right : 16px;
}

.chat-info {
    display : flex;
}

.chat-user {
    display : flex;
    align-items: start;
    justify-content: center;
}

.input-field {
    width : 100%;
    display : flex;
    box-sizing: border-box;
    margin-top: auto; /* 입력창을 하단에 고정 */
    padding-top: 8px;
    align-items: end;
}

.chat-input {
    border: none;
    width: 100%;
    outline: none;
    color: #000;
    resize: none;
    border-radius: 16px;
    background-color: #fff;
    margin-right : 16px;
    max-height : calc(1.5em * 5);
    overflow-y: auto;
}

:deep(.v-input--density-default),
:deep(.v-field--variant-outlined),
:deep(.v-input--density-default),
:deep(.v-field--single-line),
:deep(.v-input--density-default),
:deep(.v-field--no-label) {
    --v-input-padding-top: 16px;
    --v-input-padding-bottom: 0px;
    --v-field-padding-bottom: 16px;
}

:deep(.v-textarea) {
    --v-input-control-height: 50px;
}

.img-container {
    width : 56px;
    height : 56px;
    margin-right : 16px;
    background-color: #6785FF;
    border-radius: 16px;
    display : flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.chat-container {
    display : flex;
    flex-direction: column;
    min-width : 50px;
}

.chat-container.receive {
    margin-left : 16px;
}

.send {
    margin-left : auto;
}

.user-name {
    font-size : 1rem;
    color : #000000;
}

.receive .chat-content {
    display : flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 16px 0;
    padding : 12px 16px;
    margin : 4px 0;
    width : fit-content;
    background-color: #fff;
    color : #464748;
}

.send .chat-content {
    margin : 4px 0 4px 20px;
    display : flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 0 16px;
    padding : 12px 16px;
    width : fit-content;
    color : #fff;
    background-color: #6785FF;
}

.chat-time {
    color : #B6BEC8;
    font-size : 0.75rem;
}

.send .chat-time {
    margin-left : auto;
}
</style>