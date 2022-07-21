export interface ConfigureableMock<R> {
    getCallCount(): number;
    returns(value: R, retain?: boolean): void;
    returnsAsync(value: Awaited<R>, retain?: boolean): void;
    resetCallCount(): void;
    throws(error: Error, retain?: boolean): void;
    throwsAsync(error: Error, retain?: boolean): void;
}
