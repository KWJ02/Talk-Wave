<template>
    <div class="back" @click="sendEmit('SignUp')">뒤로가기</div>
    <div class="sign-in-root">
        <div class="sign-in-container">
            <img src="@/assets/images/icon_crab.svg" alt="crab" @click="crabCry"/>
            <input type="text" name="id" id="id" placeholder="id" v-model.trim="userId"
                :class="{'error' : idError}" @focus="idError = false" v-focus/>

            <input type="text" name="password" id="password" placeholder="password" v-model.trim="password"
                :class="{'error' : pwError}" @focus="pwError = false"/>
            <input type="text" name="nick" id="nick" placeholder="nickName" v-model.trim="nickName"
                :class="{'error' : nickError}" @focus="nickError = false"/>

            <div class="org-container">
                <div class="org-name">계급</div>
                <select name="org" id="org" class="org-selector" v-model="orgSelector"
                    :class="{'error' : orgError}" @focus="orgError = false">
                    <option value="president">회장</option>
                    <option value="manager">부장</option>
                    <option value="intern">인턴</option>
                </select>
            </div>

            <div class="submit-container">
                <div class="submit" @click="signIn">가입하기</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import axios from '@/plugins/axiosInstance'

const userId = ref("");
const password = ref("");
const nickName = ref("");

const idError = ref(false);
const pwError = ref(false);
const nickError = ref(false);
const orgError = ref(false);

const orgSelector = ref(null);
const deptId = ref(null);

const emit = defineEmits(['sendEmit']);

const sendEmit = (sendData) => {
    emit('sendEmit', {data : sendData})
}

const crabCry = () => {
    alert("나가쇼");
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

    switch(orgSelector.value) {
        case "president" : deptId.value = 3
            break;
        case "manager" : deptId.value = 2
            break;
        case "intern" : deptId.value = 1
            break;
    }

    const jsonData = {
        "userId" : userId.value,
        "password" : password.value,
        "name" : nickName.value,
        "deptId" : deptId.value,
    }

    axios.post('/api/user/register', jsonData)
    .then(() => {
        alert("회원가입 성공!");
        sendEmit("SignUp");
    }).catch((error) => {
        alert("회원가입 실패~!");
        console.error(error)
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