export const anyValue = "IT-IS-ANY-VALUE";
export class It {
    static isAny<T>() {
        return anyValue as unknown as T;
    }
}
