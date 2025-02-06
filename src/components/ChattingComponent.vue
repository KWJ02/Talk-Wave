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
                        <img src="@/assets/images/icon_chatting_search.svg" alt="search" class="icon-img"
                            @click="showSearch = !showSearch">
                        <img src="@/assets/images/icon_chatting_menu.svg" alt="search" class="icon-img"
                            @click="chatMenu = true">
                    </div>
                </div>
                <div v-else>
                    <v-container>
                        <v-text-field class="search-bar" v-model="searchQuery" ref="searchInput" solo autofocus="true"
                            variant="none" @blur="showSearch = false">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" class="search-icon">
                                <path
                                    d="M16.9268 17.04L20.4 20.4M19.28 11.44C19.28 15.7699 15.7699 19.28 11.44 19.28C7.11006 19.28 3.59998 15.7699 3.59998 11.44C3.59998 7.11006 7.11006 3.59998 11.44 3.59998C15.7699 3.59998 19.28 7.11006 19.28 11.44Z"
                                    stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
                            </svg>
                        </v-text-field>

                    </v-container>
                </div>
            </transition>
        </div>

        <v-layout>
            <v-navigation-drawer v-model="chatMenu" location="right" temporary width="300">

                <div class="list-content-container">
                    <div class="list-title-section">
                        <div class="list-title">
                            참여인원
                        </div>
                        <div class="list-count">{{ userList.length }}</div>
                        <div class="room-invite-section">
                            <div class="room-invite">
                                초대
                            </div>
                        </div>
                    </div>

                    <ul class="user-list">
                        <li class="user" v-for="(user, index) in userList" :key="index"
                            :class="{ 'last-item': index === userList.length - 1 }" v-ripple>
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

        <v-dialog max-width="500" height="240" v-model="quitDialog">
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
                <div class="recent-message" v-if="isScroll">
                    <div class="message" @click="goDown">
                        {{ messageList.length > 0 ? 
                            messageList.at(-1).emojiUrl ? `${messageList.at(-1).userName} : (이모티콘) ${messageList.at(-1).message}`
                                                 : `${messageList.at(-1).userName} : ${messageList.at(-1).message}`
                            : `${messageList[0].userName} : ${messageList[0].message}` }}
                    </div>
                </div>

                <div class="float-btn-container" v-if="isFloat" @click="goDown">
                    <div class="float-btn">▽</div>
                </div>
                <div class="chat" v-for="message in formattedMessages" :key="message.id">
                    <div class="chat-info">
                        <div class="chat-user" v-if="myId !== message.userId">
                            <img src="@/assets/images/icon_chat_user.svg" width="40px" alt="user" />
                        </div>

                        <div class="chat-container" :class="myId === message.userId ? 'send' : 'receive'">
                            <div class="user-name" :class="myId === message.userId ? 'my-message' : ''">{{
                                message.userName }}</div>
                            <div class="chat-content" :class="{ 'emoji-content': message.emojiUrl && !message.message, 'mixed-content': message.emojiUrl && message.message }">
                                <img v-if="message.emojiUrl" :src="message.emojiUrl" alt="emoji" width="160px" />
                                <div v-if="message.message" :class="{ 'text-with-emoji': message.emojiUrl }">
                                    <div class="html-message" v-html="message.message.replace(/\n/g, '<br/>')"></div>
                                </div>
                            </div>
                            <div class="chat-time">{{ message.formattedSendDate }}</div>
                        </div>

                    </div>
                </div>
            </div>

            <div v-if="showEmoticon" class="emotion-popup-container">
                <div class="emoticon-overlay-container" v-if="emojiId">
                    <div class="emoticon-overlay">
                        <img :src="selectEmojiUrl" alt="emoji" width="80px" height="80px" />
                    </div>
                </div>
                <div class="emotion-popup-section">
                    <div class="popup-title-section">
                        <div class="popup-title">
                            <div class="content">이모티콘</div>
                            <div class="cancel-btn" @click="cancel">X</div>
                        </div>
                    </div>
                    <div class="emotion-popup">
                        <div class="emoticon-grid">
                            <div v-for="(emoticon) in emoticonList" :key="emoticon.id" class="emoticon-item">
                                <img :src="emoticon.url" alt="emoticon" width="80px" height="80px"
                                    @click="setSelectEmoji(emoticon.id, emoticon.url)" @dblclick="send" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="input-field">
                <v-textarea v-model="userInput" class="chat-input" ref="chatText" :rows="textareaRows" auto-grow
                    variant="none" hide-details maxlength="512" @keydown="handleKeyDown" @keyup="handleKeyUp"
                    @input="adjustTextareaHeight" />

                <div class="img-container" style="background-color: #fff;" @click="toggleShowEmoji">
                    <img src="@/assets/images/icon_emotion.svg" alt="emotion" class="icon-img">
                </div>

                <div class="img-container" @click="send">
                    <img src="@/assets/images/icon_upload.svg" alt="upload" class="icon-img" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick, defineProps, watch, onMounted, onUnmounted, inject, computed } from 'vue';
import axios from '@/plugins/axiosInstance';
import { formatDateToTime } from '@/plugins/formatDate';

const myId = ref(null);
const emojiId = ref(null);
const selectEmojiUrl = ref("");
const userInput = ref("");
const chatField = ref(null);
const chatText = ref(null);
const chatMenu = ref(false);
const chatRoomId = ref(0)
const roomName = ref("")
const showSearch = ref(false);
const showEmoticon = ref(false);
const searchQuery = ref("");
const searchInput = ref(null);
const quitDialog = ref(false);
const emoticonList = ref([]);
const textareaRows = ref(1);
const isScroll = ref(false);
const isFloat = ref(false);

const stompClient = inject('stompClient')

const messageList = ref([]);
const userList = ref([])

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    newMessage: {
        type: Object,
    }
})

onMounted(() => {
    myId.value = localStorage.getItem("talk-wave-id");
    chatRoomId.value = props.id;

    axios.get('/chat/emoji').then((response) => {
        emoticonList.value = response.data;
    })

    loadInitialData(chatRoomId.value);

    if (chatField.value) {
        chatField.value.addEventListener('scroll', handleScroll);
    }
})

// 스크롤 핸들러 함수
const handleScroll = () => {
    if (chatField.value) {
        const { scrollTop, scrollHeight, clientHeight } = chatField.value;

        // 스크롤이 떠있는 정도
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 300;

        // 스크롤이 301px이상 떠있으면
        if (isAtBottom) {
            isScroll.value = false;
            isFloat.value = false;
        } else {
            isFloat.value = true;
        }
    }
};

onUnmounted(() => {
    if (chatField.value) {
        chatField.value.removeEventListener('scroll', handleScroll);
    }
});

const formattedMessages = computed(() => {
    return messageList.value.map((message) => ({
        ...message,
        formattedSendDate: formatDateToTime(message.sendDate),
    }));
});

watch(() => props.id, async (newId) => {
    // 새로운 방 ID 설정
    loadInitialData(newId);
});

watch(() => props.newMessage, (newMessage) => {
    // 스크롤이 맨 아래에서 얼마나 떨어져 있는지 체크
    const isScrolledToBottom = chatField.value &&
        (chatField.value.scrollHeight - chatField.value.clientHeight - chatField.value.scrollTop < 100);
    // 100은 픽셀 단위로, 맨 아래에서 얼마나 떨어져있을 때까지 자동스크롤을 할지 결정하는 값입니다.

    messageList.value.push(newMessage);

    // 스크롤이 거의 맨 아래에 있을 때만 자동 스크롤 실행
    if (isScrolledToBottom || newMessage.userId === localStorage.getItem("talk-wave-id")) {
        isScroll.value = false;
        nextTick(() => {
            if (chatField.value) {
                chatField.value.scrollTop = chatField.value.scrollHeight;
            }
        });
    } else {
        isScroll.value = true;
    }
});

const goDown = () => {
    isScroll.value = false;
    nextTick(() => {
        if (chatField.value) {
            chatField.value.scrollTop = chatField.value.scrollHeight;
        }
    });
}


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
        .catch(() => {
            //
        });
};

watch(showSearch, (isShow) => {
    if (isShow) {
        nextTick(() => {
            searchInput.value?.focus();
        })
    }
});

const adjustTextareaHeight = () => {
    const lines = (userInput.value.match(/\n/g) || []).length + 1;
    textareaRows.value = Math.min(Math.max(lines, 1), 5);
    nextTick(() => {
        if (chatText.value) {
            chatText.value.scrollTop = chatText.value.scrollHeight;
        }
    });
};

const handleKeyDown = (event) => {
    if (!event.shiftKey && event.key === "Enter") {
        event.preventDefault(); // 줄바꿈 방지
        send();
        textareaRows.value = 1; // Reset rows after sending
        return;
    }

    if (event.shiftKey && event.key === "Enter") {
        // Shift+Enter -> 줄바꿈 (기본 동작 유지)
        adjustTextareaHeight();
        return;
    }
};

const handleKeyUp = (event) => {
    // Enter 키 처리를 handleKeyDown으로 이동했으므로 여기서는 필요 없음
    if (event.shiftKey && event.key === "Enter") {
        adjustTextareaHeight();
        return;
    }
};

// Modify send function
const send = () => {
    if (!emojiId.value && !userInput.value.trim()) {
        return
    }

    const messageData = {
        roomId: chatRoomId.value,
        message: userInput.value.trim(),
        userId: myId.value,
        emojiId: emojiId.value,
    };

    if (stompClient && stompClient.connected) {
        stompClient.publish({
            destination: '/send/message',
            body: JSON.stringify(messageData)
        });

        showEmoticon.value = false;
        userInput.value = "";
        emojiId.value = null;
        textareaRows.value = 1; // Reset rows after sending
    }
};

const toggleShowEmoji = () => {
    emojiId.value = null;
    showEmoticon.value = showEmoticon.value ? false : true;
    selectEmojiUrl.value = null;
}

const quitChattingRoom = () => {
    quitDialog.value = false;
    chatMenu.value = false;

    if (stompClient?.connected) {
        const chatEventDTO = {
            roomId: chatRoomId.value,
            userId: myId.value
        };


        axios.post('/chat/rooms/leave', JSON.stringify(chatEventDTO), {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            window.location.reload();
        })
            .catch()

        chatRoomId.value = null;
    }
}

const cancel = () => {
    emojiId.value = null;
    showEmoticon.value = false;
    selectEmojiUrl.value = "";
}

const setSelectEmoji = (id, url) => {
    emojiId.value = id;
    selectEmojiUrl.value = url;
}
</script>

<style scoped>
.root-chatting {
    width: 100%;
    height: 100vh;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    min-width: 500px;
}

.chatting-container {
    margin-top: 56px;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.chatting-title-section {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
}

.chatting-title {
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    margin-left: 16px;
}

.count {
    margin-left: 8px;
    color: #697077;
}

.chatting-fn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    margin-right: 40px;
}

.icon-img {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.search-bar {
    background-color: var(--primary);
    border-radius: 16px;
    color: #fff;
}

.search-icon {
    position: fixed;
    right: 16px;
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
    padding: 0;
}

:deep(.v-messages),
:deep(.v-input__details),
:deep(.v-text-field .v-input__details) {
    display: none;
}

:deep(.v-field__input) {
    min-height: 0;
}

:deep(.v-text-field .v-field--no-label input) {
    padding-right: 40px;
}

:deep(.v-card-actions) {
    justify-content: space-around !important;
}

:deep(.v-dialog > .v-overlay__content > .v-card) {
    border-radius: 16px !important;
}

.list-content-container {
    padding: 16px;
    overflow-y: hidden;
}

.list-title-section {
    display: flex;
    align-items: center;
    justify-content: start;
}

.list-title {
    font-size: 1.25rem;
    color: #000000;
}

.list-count {
    border-radius: 12px;
    padding: 4px 8px;
    margin-left: 12px;
    background-color: var(--primary);
    color: #fff;
}

.room-invite-section {
    flex: 1;
    display: flex;
    justify-content: end;
}

.room-invite-section .room-invite {
    border-radius: 12px;
    padding: 4px 8px;
    background-color: var(--primary);
    color: #fff;
    cursor: pointer;
}

.user-list {
    width: 100%;
    margin-top: 12px;
    list-style-type: none;
    overflow-y: auto;
}

.user-list .user {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin-bottom: 12px;
    background-color: #EDF0F9;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.user-list .user:hover {
    background-color: var(--primary);
    color: #fff;
}

.last-item {
    margin-bottom: 44px !important;
}

.list-footer-section {
    width: 100%;
    position: fixed;
    padding-right: 16px;
    bottom: 0;
}

.list-footer-section .quit-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 12px 12px 16px;
    color: #fff;
    background-color: var(--primary);
    border-radius: 0 0 0 16px;
    cursor: pointer;
}

.btn-section {
    padding: 0 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 16px;
}

.btn-section div {
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 16px;
    display: flex;
    justify-content: center;
}

.btn-section .btn-cancel {
    flex-grow: 1;
    color: #fff;
    background-color: #B6BEC8;
}

.btn-section .btn-quit {
    flex-grow: 1;
    color: #fff;
    background-color: var(--primary);
}

.chatting-box {
    width: 100%;
    flex: 1;
    margin: 16px 0;
    box-sizing: border-box;
    padding: 0 0 16px 16px;
    flex-grow: 1;
    background-color: #EDF0F9;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    /* 메시지를 위에서 아래로 배치 */
    overflow: hidden;
    position: relative;
}

.v-layout {
    flex: 0
}

:deep(.v-navigation-drawer--temporary.v-navigation-drawer--active) {
    box-shadow: none !important;
}

:deep(.v-navigation-drawer) {
    border-radius: 16px 0 0 16px !important;
}

.chat-field {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 8px 0 16px 0;
}

.chat {
    margin-bottom: 8px;
}

.chat-info {
    display: flex;
}

.chat-user {
    display: flex;
    align-items: start;
    justify-content: center;
}

.recent-message {
    position: absolute;
    bottom: 86px;
    padding-right: 32px;
    width: 100%;
    text-align: center;
}

.float-btn-container {
    position: absolute;
    bottom: 86px;
    right: 24px;
}

.float-btn {
    font-size: 1.5rem;
    box-shadow: 0px 5px 16px rgba(8, 15, 52, 0.15);
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.message {
    width: 90%;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 8px;
    color: #fff;
    border-radius: 16px;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}

.input-field {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    margin-top: auto;
    /* 입력창을 하단에 고정 */
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
    margin-right: 16px;
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
    width: 56px;
    height: 56px;
    margin-right: 16px;
    background-color: #6785FF;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
}

.chat-container {
    display: flex;
    flex-direction: column;
    min-width: 50px;
    max-width: 80%;
}

.chat-container.receive {
    margin-left: 16px;
}

.chat-container.send {
    margin-right: 16px;
}

.my-message {
    display: none;
}

.send {
    margin-left: auto;
}

.user-name {
    font-size: 1rem;
    color: #000000;
}

.receive .chat-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 16px 0;
    padding: 12px 16px;
    margin: 4px 0;
    width: fit-content;
    background-color: #fff;
    color: #464748;
}

.send .chat-content {
    margin: 4px 0 4px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16px 16px 0 16px;
    padding: 12px 16px;
    width: fit-content;
    color: #fff;
    background-color: #6785FF;
}

.receive .chat-content.emoji-content {
    background-color: transparent;
    padding: 0;
}

.send .chat-content.emoji-content {
    background-color: transparent;
    padding: 0;
    margin: 4px 0;
}

.send .chat-content.mixed-content,
.receive .chat-content.mixed-content {
    background-color: transparent !important;
    padding: 0;
}

.send .chat-content .text-with-emoji {
    width: 100%;
    color: #fff;
    display : flex;
    justify-content: end;
}

.send .chat-content .text-with-emoji .html-message {
    border-radius: 16px;
    margin-top: 8px;
    padding: 12px 16px;
    background-color: #6785FF;
}

.receive .chat-content .text-with-emoji {
    width: 100%;
    color: #464748;
    display : flex;
    justify-content: start;
}

.receive .chat-content .text-with-emoji .html-message {
    border-radius: 16px;
    margin-top: 8px;
    padding: 12px 16px;
    background-color: #fff;
}

.chat-time {
    color: #B6BEC8;
    font-size: 0.75rem;
}

.send .chat-time {
    margin-left: auto;
}

.emotion-popup-section {
    position: absolute;
    z-index: 9999;
    min-width: 400px;
    bottom: 88px;
    padding-right: 16px;
    width: 100%;
}

.popup-title-section {
    padding-right: 16px;
}

.popup-title {
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    padding: 8px 16px;
}

.popup-title .cancel-btn {
    cursor: pointer;
}

.emotion-popup {
    position: relative;
    padding-right: 16px;
    max-height: 200px;
    overflow-y: auto;
}

.emotion-popup::-webkit-scrollbar {
    display: none;
}

.emoticon-overlay-container {
    position: absolute;
    width: 100%;
    padding-right: 32px;
    z-index: 9999;
    bottom: 350px;
}

.emoticon-overlay {
    display: flex;
    height: 100px;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
}

.emoticon-grid {
    display: grid;
    background-color: #fff;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.emoticon-item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>