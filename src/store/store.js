import { defineStore } from 'pinia';

export const useRoomStore = defineStore('roomStore', {
    state: () => ({
        subscribedRooms : new Set(),
    }),
    actions: {
        addRoom(roomId) {
            this.subscribedRooms.add(roomId);
        },
        removeRoom(roomId) {
            this.subscribedRooms.delete(roomId);
        },
        isSubscribed(roomId) {
            return this.subscribedRooms.has(roomId);
        },
        clearRooms() {
            this.subscribedRooms.clear();
        },      
    }
})