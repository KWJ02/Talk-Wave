<template>
    <div class="profile-root">
        <button @click="logout" class="logout-btn">로그아웃</button>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['logout'])

const logout = () => {
    emit('logout', {data : "SignUp"})
}
</script>

<style scoped>
.profile-root {
    width : 100%;
    display : flex;
    align-items: center;
    justify-content: center;
}

.logout-btn {
    padding : 300px;
    border-radius: 0 16px;
    color : #fff;
    font-size : 5rem;
    background-color: var(--primary);
}
</style>