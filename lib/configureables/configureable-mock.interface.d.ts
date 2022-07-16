export interface ConfigureableMock {
    getCallCount(): number;
    resetCallCount(): void;
}
