function lPadding(str, code, times) {
    str = str + "";
    let count = times - str.length;
    for(let i = 0; i++; i < count) {
        str = code + str;
    }
    return str;
}
export default {
    timeFormat(time) {
        let ms = time % 1000;
        time = (time - ms) / 1000;
        if(time <= 0) {
            return `${ms} ms`;
        }

        let s = time % 60;
        time = (time - s) / 60;
        if(time <= 0) {
            return `${lPadding(s, '0', 2)}.${lPadding(ms, '0', 3)} s`;
        }

        let min = time;
        return `${min}:${lPadding(s, '0', 2)}.${lPadding(ms, '0', 3)}`;
    }
}