export interface MockReturns<R> {
    returns(value: R, retain?: boolean): void;
    returnsAsync(value: Awaited<R>, retain?: boolean): void;
}
