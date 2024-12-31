<template>
    
        <sign-up-component v-if="pointer === 'SignUp'" @sendEmit="sendEmit"/>
        <sign-in-component v-if="pointer === 'SignIn'" @sendEmit="sendEmit"/>

        <div class="root" :class="{ 'not-pointer' : pointer === 'SignUp' || pointer === 'SignIn' }">
            <menu-component v-if="pointer === 'Home' || pointer === 'Chat' || pointer==='Profile'" @goMenuItem="goMenuItem" @createRoom="createDialog"/>
            <home-component v-if="pointer === 'Home'" class="full-size"/>
            <chat-component v-if="pointer === 'Chat'" class="full-size"/>
            <profile-component v-if="pointer === 'Profile'" class="full-size" @logout="logout"/>

            <v-dialog max-width="500" height="240" v-model="isCreate" persistent="true">
                <v-card title="방 생성">
                    <v-card-text>
                        <input type="text" name="title" id="title" class="input-title" placeholder="방제목 입력해주세요."/>
                    </v-card-text>

                    <div class="btn-section">
                        <div class="btn-cancel" @click="isCreate = false" v-ripple>닫기</div>
                        <div class="btn-quit" @click="create" v-ripple>만들기</div>
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
import { ref } from 'vue';

const pointer = ref("SignUp");
const isCreate = ref(false);

const sendEmit = (payload) => {
    pointer.value = payload.data;
}

const goMenuItem = (payload) => {
    pointer.value = payload.data;
}

const logout = (payload) => {
    pointer.value = payload.data;
}

const createDialog = () => {
    isCreate.value = true;
}

const create = () => {
    
}
</script>

<style scoped>
.root {
    height : 100vh;
    display : flex;
}

.not-pointer {
    display : none;
}

.full-size {
    width : 100%;
}
</style>