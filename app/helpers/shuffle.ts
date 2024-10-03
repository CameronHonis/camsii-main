// TODO: test and fix me
export default function shuffle<T>(list: T[]): T[] {
    const rtn = [...list];
    for (let i = 0; i < rtn.length; i++) {
        // pick random index that is NOT i
        let j = Math.floor(Math.random() * rtn.length - 1);
        if (j >= i) j++;

        const temp = rtn[i];
        list[i] = rtn[j];
        list[j] = temp;
    }
    return rtn;
}