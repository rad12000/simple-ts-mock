import { Callable } from "./callable.interface";
import { MockCallback } from "./callback.interface";
import { MockReturns } from "./returns.interface";
import { MockThrows } from "./throws.interface";
export interface ConfigurableMock<R> extends MockCallback<R>, MockReturns<R>, MockThrows, Callable {
}
