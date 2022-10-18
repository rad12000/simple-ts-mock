export interface Callable {
    getCallCount(): number;
    resetCallCount(): void;
}
