import { Callable } from "./callable.interface";
import { MockReturns } from "./returns.interface";
import { MockThrows } from "./throws.interface";

export interface ConfigurableValue<R>
    extends MockReturns<R>,
        MockThrows,
        Callable {}
