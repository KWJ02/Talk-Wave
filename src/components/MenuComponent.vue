<template>
    <div class="menu-root">
        <div class="menu-list-container">
            <div class="menu-list-fn">

                <div class="act-background" v-if="activeHome" :class="{'active' : activeHome}" v-ripple>
                    <img src="@/assets/images/icon_home_active.svg" alt="home" width="28px" class="icon-img"/>
                </div>

                <div class="act-background" v-else v-ripple>
                    <img src="@/assets/images/icon_home.svg" alt="home" width="28px" class="icon-img" @click="goHome"/>
                </div>
                
                <div class="act-background" v-if="activeChat" :class="{'active' : activeChat}" v-ripple>
                    <img src="@/assets/images/icon_chat_active.svg" alt="chat" width="16px" class="icon-img" />
                </div>

                <div class="act-background" v-else v-ripple>
                    <img src="@/assets/images/icon_chat.svg" alt="chat" width="16px" class="icon-img" @click="goChat"/>
                </div>
                
                <div class="divider"></div>

                <img src="@/assets/images/icon_add.svg" alt="add" width="40px" class="icon-img" @click="createRoom"/>
            </div>
            <div class="menu-list-user">
                <img src="@/assets/images/icon_user.svg" alt="user" width="40px" class="icon-img" @click="goProfile"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const activeHome = ref(true);
const activeChat = ref(false);
const activeProfile = ref(false);
const emit = defineEmits(['goMenuItem', 'createRoom'])

const goHome = () => {
    if(activeHome.value) {
        return;
    }

    activeHome.value = true;
    activeChat.value = false;
    activeProfile.value = false;
    emit('goMenuItem', {data : "Home"});
}

const goChat = () => {
    if(activeChat.value) {
        return;
    }

    activeChat.value = true;
    activeHome.value = false;
    activeProfile.value = false;
    emit('goMenuItem', {data : "Chat"});
}

const goProfile = () => {
    if(activeProfile.value) {
        return
    }

    activeChat.value = false;
    activeHome.value = false;
    activeProfile.value = true;
    emit('goMenuItem', {data : "Profile"});
}

const createRoom = () => {
    emit('createRoom')
}
</script>

<style scoped>
.menu-root {
    background-color: var(--normal);
    border-radius : 24px;
    margin : 16px;
    color : #fff;
}

.menu-list-container {
    height : 100%;
    width: 80px;
    display : flex;
    flex-direction: column;
    justify-content: space-between;
}

.menu-list-fn {
    display : flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top : 24px;
    gap : 28px;
}

.menu-list-user {
    display : flex;
    align-items: center;
    justify-content: center;
    margin-bottom : 24px;
}

.act-background {
    display : flex;
    width : 40px;
    height : 40px;
    border-radius : 16px;
    align-items : center;
    justify-content: center;
}

.icon-img {
    cursor : pointer;
}

.divider {
    width : 44px;
    height : 2px;
    background-color: #fff;
}

.active {
    background-color: var(--primary);
    border-radius : 16px;
}
</style>