<template>
    
        <sign-up-component v-if="pointer === 'SignUp'" @sendEmit="sendEmit"/>
        <sign-in-component v-if="pointer === 'SignIn'" @sendEmit="sendEmit" :userList="userList"/>

        <div class="root" :class="{ 'not-pointer' : pointer === 'SignUp' || pointer === 'SignIn' }">
            <menu-component v-if="pointer === 'Home' || pointer === 'Chat' || pointer==='Profile'" @goMenuItem="goMenuItem" @createRoom="createDialog"/>
            <home-component v-if="pointer === 'Home'" class="full-size"/>
            <chat-component v-if="pointer === 'Chat'" class="full-size"/>
            <profile-component v-if="pointer === 'Profile'" class="full-size" @logout="logout"/>

            <v-dialog max-width="500" height="600" v-model="isCreate">
                <v-card title="방 생성">
                    <v-card-text>
                        <input type="text" name="title" id="title" class="input-title" v-model.trim="roomName"
                            placeholder="방제목 입력해주세요." @keyup.enter="create"/>
                    </v-card-text>

                    <div class="invite-user-list-container">
                        초대할 사람 : {{ selectUserList.length > 0 ? selectUserList.map(id => getUserNameById(id)).join(", ") : '' }}
                    </div>

                    <div class="invite-container">
                        <div class="grade-list" v-for="grade in userList" :key="grade.deptId">
                            <div class="grade">{{ grade.name }}</div>
                            <div class="list-section">
                                <div class="grade-user-list" v-for="user in grade.userInfoList" :key="user.userId">
                                    <label :for="`${user.userId}`">
                                        <input type="checkbox" v-model="selectUserList" :id="`${user.userId}`" :value="user.userId" /> {{ user.userName }}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="btn-section">
                        <div class="btn-cancel" @click="isCreate = false" v-ripple>닫기</div>
                        <div class="btn-create" @click="create" v-ripple>만들기</div>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    
</template>

<script setup>
/* eslint-disable */
import SignInComponent from './components/SignInComponent.vue';
import SignUpComponent from './components/SignUpComponent.vue';
import HomeComponent from './components/HomeComponent.vue';
import MenuComponent from './components/MenuComponent.vue';
import ChatComponent from './components/ChatComponent.vue';
import ProfileComponent from './components/ProfileComponent.vue';
import { ref, onMounted, onUnmounted, provide } from 'vue';
import axios from '@/plugins/axiosInstance';
import { stompClient } from '@/plugins/webSocket';

const pointer = ref("SignUp");
const roomName = ref("");
const isCreate = ref(false);
const userList = ref([])
const selectUserList = ref([])
const myId = ref("");

const sendEmit = (payload) => {
    pointer.value = payload.data;
}

const goMenuItem = (payload) => {
    pointer.value = payload.data;
}

const logout = (payload) => {
    localStorage.removeItem("talk-wave-id");
    pointer.value = payload.data;
    window.location.href="/"
}

const createDialog = () => {
    isCreate.value = true;
}

const getUserNameById = (userId) => {
    // userList에서 userId에 해당하는 user를 찾아서 userName을 반환
    for (const grade of userList.value) {
      const user = grade.userInfoList.find(user => user.userId === userId);
      if (user) {
        return user.userName;
      }
    }
    return '';
  }

const create = () => {
    if(!myId.value) {
        alert("아이디없음")
        return
    }

    if(!roomName.value) {
        alert("방이름없음")
        return
    }

    if(!selectUserList.value) {
        alert("초대는 1명이상 필수")
        return
    }

    const jsonData = {
        roomName : roomName.value,
        userId : myId.value,
        userList : selectUserList.value
    }

    axios.post(`/chat/rooms`,JSON.stringify(jsonData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            isCreate.value = false;
            roomName.value = "";
            selectUserList.value = [];
            
            pointer.value = "Home";
            setTimeout(() => {
                pointer.value = "Chat"
            }, 100)
        })
        .catch((error) => {
            console.error(error);
        })
}

onMounted(() => {
    myId.value = localStorage.getItem("talk-wave-id")
    if(myId.value){
        pointer.value = "Home";
    }

    axios.get('/dept')
        .then((res) => {
            userList.value = res.data
            userList.value = userList.value.map(dept => {
                return {
                    ...dept,
                    userInfoList: dept.userInfoList.filter(user => user.userId !== myId.value)
                };
            });
        })
        .catch((error) => {
            console.error(error);
        })
})

onUnmounted(() => {
    if (stompClient.connected) {
        stompClient.deactivate();
    }
})

provide('stompClient', stompClient);
</script>

<style scoped>
.root {
    min-width : 1000px;
    height : 100vh;
    display : flex;
}

.not-pointer {
    display : none;
}

.full-size {
    width : 100%;
}

:deep(.v-dialog > .v-overlay__content) {
    justify-content: center;
}

.input-title {
    width : 100%;
    outline : none;
    border : none;
}

.invite-user-list-container {
    padding : 0 24px 12px 24px;
}

.invite-container {
    display : flex;
    flex-direction: column;
    padding : 0 24px;
    gap : 12px;
    margin-bottom : 12px;
}

.grade-list {
    width : 100%;
    box-sizing: border-box;
    display : flex;
    flex-direction: column;
    justify-content: start;
    border: solid 2px #000000;
    border-radius : 8px;
}

.grade {
    border-radius: 8px;
    background-color: #B6BEC8;
    padding : 12px;
}

.list-section {
    padding : 12px;
}

.btn-section {
    display : flex;
    gap : 24px;
    padding : 0 24px 12px 24px;
}

.btn-section > div {
    flex : 1;
    flex-shrink : 0;
    display : flex;
    justify-content: center;
}

.btn-cancel {
    background-color: #B6BEC8;
    padding : 8px;
    border-radius: 12px;
}

.btn-create {
    background-color: var(--primary);
    color : #fff;
    padding : 8px;
    border-radius: 12px;
}
</style>