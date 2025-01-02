export function formatDateToTime(date) {
    const dateArr = date.split("T");
    const timeArr = dateArr[1].split(":");

    const time = Number(timeArr[0]);
    const minute = Number(timeArr[1]);

    const amPm = time < 12 ? "오전" : "오후";

    if(amPm === "오전") {
        return amPm + " " + time.toString().padStart(2,0) + ":" + minute.toString().padStart(2,0);
    } else {
        return time === 12 ? amPm + " " + time.toString().padStart(2,0) + ":" + minute.toString().padStart(2,0)
                           : amPm + " " + (time % 12).toString().padStart(2,0) + ":" + minute.toString().padStart(2,0);
    }
}