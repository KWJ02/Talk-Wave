<template>
    <div class="back" @click="sendEmit('SignUp')">뒤로가기</div>
    <div class="sign-in-root">
        <div class="sign-in-container">
            <img src="@/assets/images/icon_crab.svg" alt="crab"/>
            <input type="text" name="id" id="id" placeholder="id" v-model.trim="userId"
                :class="{'error' : idError}" @focus="idError = false" v-focus maxlength="255"/>

            <input type="text" name="password" id="password" placeholder="password" v-model.trim="password"
                :class="{'error' : pwError}" @focus="pwError = false" maxlength="255"/>
            <input type="text" name="nick" id="nick" placeholder="nickName" v-model.trim="nickName"
                :class="{'error' : nickError}" @focus="nickError = false" maxlength="20"/>

            <div class="org-container">
                <div class="org-name">계급</div>
                <select name="org" id="org" class="org-selector" v-model="orgSelector"
                    :class="{'error' : orgError}" @focus="orgError = false">
                    <option v-for="dept in userList" :key="dept.deptId" :id="dept.deptId" :value="dept.deptId">{{ dept.name }}</option>
                </select>
            </div>

            <div class="submit-container">
                <div class="submit" @click="signIn">가입하기</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import axios from '@/plugins/axiosInstance'

defineProps({
    userList: {
        type: Array,
        required: true,
    }
})

const userId = ref("");
const password = ref("");
const nickName = ref("");

const idError = ref(false);
const pwError = ref(false);
const nickError = ref(false);
const orgError = ref(false);

const orgSelector = ref(null);

const emit = defineEmits(['sendEmit']);

const sendEmit = (sendData) => {
    emit('sendEmit', {data : sendData})
}

const signIn = () => {
    let inValid = false;

    if(!userId.value) {
        inValid = true;
        idError.value = true;
    }

    if(!password.value) {
        inValid = true;
        pwError.value = true;
    }

    if(!nickName.value) {
        inValid = true;
        nickError.value = true;
    }

    if(!orgSelector.value) {
        inValid = true;
        orgError.value = true;
    }

    if(inValid) {
        alert("입력안한거있음");
        return;
    }

    const regexId = userId.value.replace(/[^a-zA-Z0-9]/g, '')
    const regexPw = password.value.replace(/[^a-zA-Z0-9]/g, '')

    if(regexId !== userId.value) {
        inValid = true;
        idError.value = true;
        alert("입력은 영어, 숫자만 가능")
    }

    if(regexPw !== password.value) {
        inValid = true;
        pwError.value = true;
        alert("입력은 영어, 숫자만 가능")
    }

    if(inValid) {
        return;
    }

    const jsonData = {
        "userId" : userId.value,
        "password" : password.value,
        "name" : nickName.value,
        "deptId" : orgSelector.value,
    }

    axios.post('/user/register', jsonData)
    .then(() => {
        alert("회원가입 성공!");
        window.location.reload();
    }).catch(() => {
        alert("회원가입 실패~!");
    })
}
</script>

<style scoped>
.sign-in-root {
    width : 100%;
    height : 100vh;
    display : flex;
    align-items: center;
    justify-content: center;
}

.back {
    position : fixed;
    top : 0;
    cursor: pointer;
}

.sign-in-container {
    max-width : 212px;
    display : flex;
    flex-direction: column;
    gap : 12px;
}

.sign-in-container img {
    cursor: pointer;
    z-index : 1000;
}

.sign-in-container input {
    outline : none;
    border : none;
}

.org-container {
    display : flex;
}

.org-container .org-name {
    flex-shrink: 0;
    margin-right : 12px;
}

.sign-in-container .org-container .org-selector {
    width : 100%;
    outline : none;
    display : flex;
    align-items: center;
    cursor : pointer;
    border : solid 1px #000000;
}

.submit-container {
    width : 100%;
    display : flex;
    justify-content: end;
}

.submit-container .submit {
    color : var(--primary);
    cursor: pointer;
}

.error {
    box-shadow : 0 0 2px 4px #F71234;
}
</style>