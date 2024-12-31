<template>
    <div class="sign-up-root">
        <div class="sign-up-container">
            <img src="@/assets/images/icon_crab.svg" alt="crab" @click="crabCry"/>
            <input type="text" name="id" id="id" placeholder="id" v-model.trim="userId" 
                :class="{'error' : idError}" @focus="idError = false" v-focus/>
            <input type="text" name="password" id="password" placeholder="password" v-model.trim="userPw"
            :class="{'error' : pwError}" @focus="pwError = false" ref="pwInput" @keyup.enter="login"/>
            <button @click="login">로그인</button>
            <button class="btn-sign-in" @click="signIn">회원가입</button>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from '@/plugins/axiosInstance';

const userId = ref("");
const userPw = ref("");
const pwInput = ref(null);
const idError = ref(false);
const pwError = ref(false);

const emit = defineEmits(['sendEmit']);

const goHome = () => {
    emit('sendEmit', {data : "Home"});
}

const login = () => {
    let inValid = false;
    if(!userId.value) {
        inValid = true;
        idError.value = true;
    }

    if(!userPw.value) {
        inValid = true;
        pwError.value = true;
        pwInput.value.blur();
    }

    if(inValid) {
        alert("입력안한거있음");
        return;
    }

    axios.get(`/api/user/login?userId=${userId.value}&password=${userPw.value}`)
        .then(() => goHome())
        .catch((error) => alert("로그인 실패~!" + error));
}

const signIn = () => {
    emit('sendEmit', {data : "SignIn"});
}

const crabCry = () => {
    alert("꺼지쇼");
}
</script>

<style scoped>
.sign-up-root {
    width : 100%;
    height : 100vh;
    display : flex;
    align-items: center;
    justify-content: center;
}

.sign-up-container {
    max-width : 212px;
    display : flex;
    flex-direction: column;
    gap : 12px;
}

.sign-up-container img {
    cursor: pointer;
}

.sign-up-root input {
    outline : none;
    border : none;
}

.btn-sign-in {
    color : var(--primary);
    cursor: pointer;
}

.error {
    box-shadow : 0 0 2px 4px #F71234;
}
</style>