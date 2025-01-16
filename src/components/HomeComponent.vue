<template>
    <div class="root-home">
        <!-- 툴팁 -->
        <div v-if="showDeptName" class="tooltip-text" :style="tooltipStyle">
            {{ selectName }}
        </div>

        <!-- 부서 목록 -->
        <div class="roster">Sucker Roster</div>
        <div class="dept-container">
            <div class="dept-grid-container">
                <div class="grid-item" v-for="r in deptLayer" :key="r.deptId">
                    <div class="grid-item-title" @click="showDetailDeptName(r.name, $event)"
                                                    @mouseleave="hideTooltip">
                        {{ r.name }}
                    </div>
                    <div class="grid-item-content">
                        <div class="sucker-list" v-for="user in r.userInfoList" :key="user.userId">
                            {{ user.userName }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "@/plugins/axiosInstance";

const deptLayer = ref([]);
const showDeptName = ref(false);
const selectName = ref("");
const tooltipStyle = ref({});


const showDetailDeptName = (name, event) => {
    showDeptName.value = true;
    selectName.value = name;
    updateTooltipPosition(event);
};

const updateTooltipPosition = (event) => {
    tooltipStyle.value = {
        top: `${event.clientY + 10}px`,
        left: `${event.clientX + 10}px`,
        maxWidth: "200px",
        height: "auto",
    };
};

const hideTooltip = () => {
    selectName.value = "";
    showDeptName.value = false;  
};

onMounted(() => {
    axios
        .get("/dept")
        .then((res) => {
            deptLayer.value = res.data;
        })
        .catch();
});
</script>

<style scoped>
.root-home {
    width: 100%;
    min-width: 1000px;
    padding: 32px 16px 32px 0;
    position: relative;
}

.tooltip-text {
    position: fixed;
    padding: 8px 12px;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    z-index: 1000;
}

.roster {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 4px;
}

.dept-grid-container {
    display: flex;
    gap: 16px;
    max-height: 512px;
    overflow-x: auto;
}

.grid-item {
    min-height: 160px;
    display: flex;
    flex-direction: column;
}

.grid-item-title {
    min-width: 160px;
    max-width: 160px;
    padding: 4px 12px;
    border-radius: 16px 16px 0 0;
    min-height: 32px;
    background-color: #b6bec8;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.grid-item-content {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}

.sucker-list {
    max-width: 160px;
    display: flex;
    justify-content: center;
    padding: 4px 8px;
    margin-top: 16px;
    border-radius: 16px;
    background-color: pink;
    transition: all 0.2s ease;
    cursor: pointer;
}

.sucker-list:hover {
    color: pink;
    background-color: black;
}

.grid-item-content::-webkit-scrollbar {
    display: none;
}
</style>