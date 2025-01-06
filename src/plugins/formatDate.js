export function formatDateToTime(date) {
    const dateArr = date.split("T");
    if (dateArr.length !== 2) return ''; // 잘못된 포맷 처리

    const timeArr = dateArr[1].split(":");
    let time = Number(timeArr[0]);
    const minute = Number(timeArr[1]);

    const amPm = time < 12 ? "오전" : "오후";

    // 12시인 경우를 특별히 처리
    if (time === 12) {
        return amPm + " " + time.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
    } else {
        const adjustedTime = (time % 12) === 0 ? 12 : time % 12;  // 오후 12시는 12시로 표시되므로 12시를 그대로 둡니다.
        return amPm + " " + adjustedTime.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0");
    }
}


export function remainTime(date) {
    const now = new Date();
    const sendDate = new Date(date);

    const diff = now - sendDate;
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (years > 0) {
        return `${years}년 전`;
    } else if (months > 0) {
        return `${months}개월 전`;
    } else if (days > 0) {
        return `${days}일 전`;
    } else if (hours > 0) {
        return `${hours}시간 전`;
    } else if (minutes > 0) {
        return `${minutes}분 전`;
    } else {
        return '방금 전';
    }
}