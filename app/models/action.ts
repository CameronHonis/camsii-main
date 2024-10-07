export default interface Action<T = any> {
    type: string;
    payload?: T;
}