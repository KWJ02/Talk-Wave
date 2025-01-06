<template>
    <div class="root-chatting">
        <div class="chatting-container">
            <transition name="slide" mode="out-in">
                <div class="chatting-title-section" v-if="!showSearch">
                    <div class="chatting-title">
                        <img src="@/assets/images/icon_chat_user.svg" alt="user" width="40px">
                        <div class="title">{{ roomName }}</div>
                        <span class="count">{{ userList.length }}</span>
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
                    <div class="list-count">{{ userList.length }}</div>
                </div>

                <ul class="user-list">
                    <li class="user" v-for="(user, index) in userList" :key="index" :class="{'last-item' : index === userList.length - 1}" v-ripple>
                        <img src="@/assets/images/icon_chat_user.svg" alt="user" width="40">
                        {{ user.userName }}
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
                    채팅창을 나가는 것에 대해 검정(檢定)해주실 수 있는지에 대하여 적절한지에 대해 질문 했을 경우 본 해병이 
                    해병수육이 되지는 않는지에 대해 발언하는 것에 대한 답변을 감히 요구하는 것 여쭤보는 것에 대한 허락을 구하는 것에 대하여 
                    명쾌한 해답을 해 주실 수 있는지를 드러내도 되는지에 대하여 의문이 존재함의 여부를 지각(知覺)해도 되는지에 관한 
                    문제를 제기하는것이 기열찐빠황룡같지는 않은지를 정확히 이야기해주십사 감찰해주실 수 있는지를 시인해주실 수 있는지에 대해 
                    아뢰어도 되는지에 대한 질문이 있음에 관한 문제를 제기하는것이 기열찐빠황룡같지는 않은지를 드러내도 되는지묻는것이 
                    기열찐빠같은 요청에 해당하지 않는지에 대한 질문의 적절성을 검사받을 수 있는지에 대한 답을 요청하는 것에 대해 
                    본 해병이 감지해도 되는지를 묻는 것이 옳은 일인지를 알고 싶은 점이 있음을 알려주시는 것이 괜찮은지에 대해 거북하게 
                    느끼시지는 않는지를 본 해병이 인지하게 해 주실 수 있는지를 말씀해주실 수 있는지에 대한 정답이 무엇인지에 대한 답변을 감히 
                    요구하는 것을 시인해주실 수 있는지를 알기 위해 중첩의문문을 계속해도 되는지를 가르쳐주실 수 있는지에 대한 답이 본 해병에게 
                    중요한 것임의 여부에 대해 의문을 가져도 되는지를 본 해병이 인지하게 해 주실 수 있는지가 옳은 일인지에 대해 아뢰어도 되는지를 
                    감히 제가 알게 되었다고 가정했을 때 해병대 내부에 이변이 생기지는 않는지가 공정한지를 심의해주실 수 있는지를 표현해도 되는지를 
                    결정해주실 수 있는지를 판단을 받을 수 있는지에 대한 설문을 하여도 괜찮은지를 바라도 되는지에 대하여 의문이 존재함을 표현해도 되는지를 
                    감히 제가 알게 되었다고 가정했을 때 해병대 내부에 이변이 생기지는 않는지를 말씀해주실 수 있는지를 받아들이실 수 있는지를 말씀드려도 되는지에 
                    대해 판정을 해 주실 수 있는지를 감사(監査)해주실 수 있는지를 감사(監査)해주실 수 있는지의 여부를 지각(知覺)해도 되는지가 공정한지를 묻는 것을 
                    알려주시는 것이 괜찮은지를 받아들이실 수 있는지를 알려도 되는 것인지를 알기 위해 중첩의문문을 계속해도 되는지를 보고하는 것에 대해 
                    심판해주실 수 있는지를 판단해주실 수 있는지를 정확히 이야기해주십사 감찰해주실 수 있는지에 대해 본 해병이 감지해도 되는지를 판단해주실 
                    수 있는지를 검토해주실 수 있는지에 대한 요청을 하는 것을 발설해도 될지에 대한 의문이 있는 것을 결정해주실 수 있는지를 체크해주시는 것에 
                    대해 발언하는 것이 무례하지는 않은지가 가능한지에 대한 승인을 요구하는 것을 확인받을 수 있는지에 대해 거북하게 느끼시지는 않는지를 알렸을때 
                    이상이 없는지가 무례하지는 않은지묻는것이 기열찐빠같은 요청에 해당하지 않는지에 대한 설문을 하여도 괜찮은지에 대해 심판해주실 수 있는지의 
                    여부에 대해 의문을 가져도 되는지를 검정(檢定)해주실 수 있는지를 알고 싶은 점이 있음의문을 던지는 것이 해병의 명예를 실추시키는 것은 아닌지를 
                    궁금해해도 되는 것인지에 대한 정답이 무엇인지를 확인받을 수 있는지를 인정해주실 수 있는지를 말씀드려도 되는지를 궁금해해도 되는 것인지를 
                    판단을 받을 수 있는지를 묻는 것에 대해 인지할 자격이 본 해병에게 있는지를 가르쳐주실 수 있는지를 알렸을때 이상이 없는지에 대하여 이상이 
                    없는지에 대해 질문 했을 경우 본 해병이 해병수육이 되지는 않는지를 심의해주실 수 있는지를 여쭈어보아도 되는지것이 오도기합짜세해병으로써 
                    타의 모범이 될만한 행동인지에 대하여 명쾌한 해답을 해 주실 수 있는지를 바라도 되는지에 대해 인지할 자격이 본 해병에게 있는지에 대한 답이 
                    본 해병에게 중요한 것임을 체크해주시는 것에 대한 답변을 받고자 함을 감히 제가 알아도 되는지에 대한 질문의 적절성을 검사받을 수 있는지에 
                    대한 답을 요청하는 것 의문을 던지는 것이 해병의 명예를 실추시키는 것은 아닌지에 대해 판정을 해 주실 수 있는지에 대한 요청을 하는 것을 알려도 
                    되는 것인지를 알고자 하는 것이 오도기합짜세해병으로써 타의 모범이 될만한 행동인지에 대해 궁금증을 가져도 되겠습니까?
                </v-card-text>

                <div class="btn-section">
                    <div class="btn-cancel" @click="quitDialog = false" v-ripple>닫기</div>
                    <div class="btn-quit" @click="quitChattingRoom" v-ripple>나가기</div>
                </div>
            </v-card>
        </v-dialog>

        <div class="chatting-box">
            <div ref="chatField" class="chat-field">
                <div class="chat" v-for="message in formattedMessages" :key="message.id">
                    <div class="chat-info">
                        <div class="chat-user" v-if="myId !== message.userId">
                            <img src="@/assets/images/icon_chat_user.svg" width="40px" alt="user" />
                        </div>

                        <div class="chat-container" :class="myId === message.userId ? 'send' : 'receive'">
                            <div class="user-name" :class="myId === message.userId ? 'my-message' : ''"> {{ message.userName }}</div>
                            <div class="chat-content">
                                <div v-html="message.message.replace(/\n/g, '<br/>')"></div>
                            </div>
                            <div class="chat-time">{{ message.formattedSendDate }}</div>
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
import { ref, nextTick, defineProps, watch, onMounted, defineEmits, inject, computed } from 'vue';
import axios from '@/plugins/axiosInstance';
import { formatDateToTime } from '@/plugins/formatDate';

const myId = ref(null);
const userInput = ref("");
const chatField = ref(null);
const chatMenu = ref(false);
const chatRoomId = ref(0)
const roomName = ref("")
const showSearch = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const quitDialog = ref(false);

const stompClient = inject('stompClient')

let currentSubscription = null;

const messageList = ref([]);
const userList = ref([])

const props = defineProps({
    id : {
        type : Number,
        required : true,
    },
    newMessage : {
        type : Object,
    }
})

const emit = defineEmits(['sendMessage', 'quitChattingRoom'])

onMounted(() => {
    myId.value = localStorage.getItem("talk-wave-id");
    chatRoomId.value = props.id;

    loadInitialData(chatRoomId.value);
})

const formattedMessages = computed(() => {
    return messageList.value.map((message) => ({
    ...message,
    formattedSendDate: formatDateToTime(message.sendDate),
    }));
});

watch(() => props.id, async (newId) => {
    // 새로운 방 ID 설정
    messageList.value = []
    loadInitialData(newId);
});

watch(() => props.newMessage, (newMessage) => {
    messageList.value.push(newMessage);
    nextTick(() => {
        if (chatField.value) {
            chatField.value.scrollTop = chatField.value.scrollHeight;
        }
    });
})


const loadInitialData = (id) => {
    axios.get(`/chat/rooms/${id}/messages`)
        .then((response) => {
            roomName.value = response.data.roomName;
            messageList.value = response.data.chatList;
            userList.value = response.data.userList;
            chatRoomId.value = id;

            nextTick(() => {
                if (chatField.value) {
                    chatField.value.scrollTop = chatField.value.scrollHeight;
                }
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

watch(showSearch, (isShow) => {
    if(isShow) {
        nextTick(() => {
            searchInput.value?.focus();
        })
    }
})

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
    if (!userInput.value.trim()) {
        return;
    }

    const messageData = {
        roomId: chatRoomId.value,
        message: userInput.value.trim(),
        userId: myId.value,
    };

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/send/message',
            body: JSON.stringify(messageData)
        });

        userInput.value = "";
    }
};

const quitChattingRoom = () => {
    quitDialog.value = false;
    chatMenu.value = false;
    
    if (stompClient?.connected) {
        const chatEventDTO = {
            roomId: chatRoomId.value,
            userId: myId.value
        };


        axios.post('/chat/rooms/leave', JSON.stringify(chatEventDTO), {
            headers : {
                "Content-Type" : "application/json",
            }
        }).then(() => {
            emit('quitChattingRoom', {roomId : chatRoomId.value})
        })
        .catch((error) => console.error(error))

        chatRoomId.value = null;
        // 기존 구독 해제
        if (currentSubscription) {
            currentSubscription.unsubscribe();
        }
    }
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

.user-list .user {
    width : 100%;
    display : flex;
    align-items: center;
    gap : 12px;
    padding : 12px;
    margin-bottom : 12px;
    background-color: #EDF0F9;
    border-radius : 16px;
    cursor: pointer;
    transition : all 0.2s ease;
}

.user-list .user:hover {
    background-color: var(--primary);
    color : #fff;
}

.last-item {
    margin-bottom : 44px !important;
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
    flex : 1;
    margin : 16px 0;
    box-sizing : border-box;
    padding : 0 0 16px 16px;
    flex-grow: 1;
    background-color: #EDF0F9;
    border-radius: 24px 0 24px 24px;
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
    padding : 8px 0 16px 0;
}

.chat {
    margin-bottom : 8px;
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
    max-width : 80%;
}

.chat-container.receive {
    margin-left : 16px;
}

.chat-container.send {
    margin-right : 16px;
}

.my-message {
    display : none;
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