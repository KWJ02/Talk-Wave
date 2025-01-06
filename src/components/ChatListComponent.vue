<template>
    <div class="root-chat-list">
        <div class="search-container">
            <img src="@/assets/images/icon_chat_room_search.svg" alt="search" class="icon-search"/>
            <input type="text" class="search" placeholder="검색"/>
        </div>

        <div class="chat-room-list-container">

            <div class="chat-room-list" v-for="(item, index) in chatRooms" :key="index" @click="activeItem(item.roomId)"
            :class="{
                        'active-room': item.roomId === activeRoomId,
                        'last-item': index === chatRooms.length - 1
                    }">
                <div class="user-profile">
                    <img :src="changeProfile(item.roomId === activeRoomId)" alt="user"/>
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
import { ref, defineEmits, defineProps, inject, onMounted } from 'vue';
import profile from '@/assets/images/icon_chat_user.svg'
import activeProfile from '@/assets/images/icon_chat_user_active.svg'
import { remainTime } from '@/plugins/formatDate';
import axios from '@/plugins/axiosInstance';
import { useWebNotification } from '@vueuse/core';

defineProps({
    handleSendMessage: {
        type : Function,
    }
})

const chatRooms = ref([]);
const emit = defineEmits(['initRooms', 'roomActive', 'receiveMessage']);
const activeRoomId = ref(null);
const stompClient = inject('stompClient');
const myId = ref("")
const roomId = ref(null);
let { show } = useWebNotification();

//  알림 로직

show = ({title, body}) => {
    if (!('Notification' in window)) {
        console.error('This browser does not support notifications.');
        return null;
    }

    // 알림 권한 확인
    if (Notification.permission === 'granted') {
        return new Notification(title, { body });
    } else if (Notification.permission !== 'denied') {
        // 권한 요청
        return Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                return new Notification(title, { body });
            }
            return null;
        });
    }
    return null;
}

const changeProfile = (isActive) => {
    return isActive ? activeProfile : profile;
}

const activeItem = (id) => {
    activeRoomId.value = id;
    emit('roomActive', { id: id })
}

onMounted(async () => {
    myId.value = localStorage.getItem('talk-wave-id');

    // STOMP 연결 상태 확인 함수
    const waitForStompConnection = () => {
        return new Promise((resolve) => {
            const checkConnection = () => {
                if (stompClient && stompClient.connected) {
                    resolve();
                } else {
                    setTimeout(checkConnection, 100);
                }
            };
            checkConnection();
        });
    };

    try {
        // STOMP 연결이 완료될 때까지 대기
        await waitForStompConnection();

        const response = await axios.get(`/chat/rooms?userId=${myId.value}`);
        chatRooms.value = response.data;

        emit('initRooms', {rooms : chatRooms.value})

        if (chatRooms.value.length > 0) {
            roomId.value = chatRooms.value[0].roomId;
            activeRoomId.value = roomId.value;
            emit('roomActive', { id: roomId.value });
        }

        // STOMP 연결이 확인된 후 구독 시작
        chatRooms.value.forEach((room) => {
            console.log(`Subscribing to: /room/${room.roomId}`); // 구독하는 주소 확인
            stompClient.subscribe(`/room/${room.roomId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);

                if (document.hidden) { // 페이지 안보고있으면 알림
                    const notificationPromise = show({
                        title: receivedMessage.userName,
                        body: receivedMessage.message,
                    });

                    // `show()`가 Promise를 반환하는 경우 처리
                    if (notificationPromise instanceof Promise) {
                        notificationPromise.then((notification) => {
                            if (notification) {
                                setTimeout(() => {
                                    if (notification.close) {
                                        notification.close(); // 알림 닫기
                                    }
                                }, 1000);
                            }
                        });
                    } else if (notificationPromise) {
                        // `show()`가 동기적으로 `Notification` 객체를 반환하는 경우
                        setTimeout(() => {
                            if (notificationPromise.close) {
                                notificationPromise.close(); // 알림 닫기
                            }
                        }, 1000);
                    } else {
                        console.error('Failed to create notification.');
                    }
                }

                handleNewMessage(room.roomId, receivedMessage);
                emit('receiveMessage', {id : room.roomId, data : receivedMessage})
                
            });
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

const handleNewMessage = (roomId, message) => {
    // 해당 방을 리스트의 맨 위로 이동
    const roomIndex = chatRooms.value.findIndex((room) => room.roomId === roomId);
    if (roomIndex !== -1) {
        const [room] = chatRooms.value.splice(roomIndex, 1);
        room.latestMessage = message.message;
        
        // 새로운 배열로 갱신하여 Vue가 변화를 감지하도록 함
        chatRooms.value = [room, ...chatRooms.value];
        console.log(chatRooms.value);
    }
};
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
    flex-shrink: 0;
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