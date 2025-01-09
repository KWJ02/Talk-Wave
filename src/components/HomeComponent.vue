<template>
    <div class="root-home">
        <div class="roster">Sucker Roster</div>
        <div class="dept-container">
            <div class="dept-grid-container">
                <div class="grid-item" v-for="r in deptLayer" :key="r.deptId">
                    <div class="grid-item-title">{{ r.name }}</div>
                    <div class="grid-item-content">
                        <div class="sucker-list" v-for="user in r.userInfoList" :key="user.userId">{{ user.userName }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from '@/plugins/axiosInstance';

const deptLayer = ref([]);

onMounted(() => {
    axios.get('/dept')
    .then((res) => {
        deptLayer.value = res.data;
        console.log(deptLayer.value)
    })
    .catch((error) => {
        console.error(error);
    })
})
</script>

<style scoped>
.root-home {
    width : 100%;
    min-width : 1000px;
    padding : 32px 16px 32px 0;
}

.roster {
    font-size : 2rem;
    font-weight : bold;
    text-align: center;
    margin-bottom: 32px;
}

.dept-grid-container {
    display : grid;
    gap : 16px;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: minmax(160px,160px);
    max-height : 512px;
    overflow-y: auto;
}

.grid-item {
    width : 100%;
    display : flex;
    flex-direction: column;
}

.grid-item .grid-item-title {
    padding : 4px 12px;
    border-radius: 16px 16px 0 0;
    min-height : 32px;
    background-color: #B6BEC8;
}

.grid-item .grid-item-content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.grid-item .grid-item-content .sucker-list {
    display : flex;
    justify-content: center;
    padding : 4px;
    margin : 8px 0;
    border-radius: 16px;
    background-color: pink;
    transition : all 0.2s ease;
}

.grid-item .grid-item-content .sucker-list:hover {
    color : pink;
    background-color: black;
}

.grid-item .grid-item-content::-webkit-scrollbar {
    display : none;
}
</style>