<template>
    
        <sign-up-component v-if="pointer === 'SignUp'" @sendEmit="sendEmit"/>
        <sign-in-component v-if="pointer === 'SignIn'" @sendEmit="sendEmit"/>

        <div class="root" :class="{ 'not-pointer' : pointer === 'SignUp' || pointer === 'SignIn' }">
            <menu-component v-if="pointer === 'Home' || pointer === 'Chat' || pointer==='Profile'" @goMenuItem="goMenuItem"/>
            <home-component v-if="pointer === 'Home'" class="full-size"/>
            <chat-component v-if="pointer === 'Chat'" class="full-size"/>
            <profile-component v-if="pointer === 'Profile'" class="full-size" @logout="logout"/>
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

const sendEmit = (payload) => {
    pointer.value = payload.data;
}

const goMenuItem = (payload) => {
    pointer.value = payload.data;
}

const logout = (payload) => {
    pointer.value = payload.data;
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