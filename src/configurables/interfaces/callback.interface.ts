import { MockReturns } from "./returns.interface";
import { MockThrows } from "./throws.interface";

export interface MockCallback<R> {
    callback<T extends Array<unknown>>(
        func: (...args: T) => void
    ): MockReturns<R> & MockThrows;
}
