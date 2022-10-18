### **ConfigureReturn\<T, K extends keyof T\>**

The class used to configure the value of a mocked property.

**Class Members:**

`callback<...T>(func: (...args: ...T) => void): MockReturns<R> & MockThrows<R>`

Method to configure a callback on a mocked method, which will be called with the parameter values that the mocked method is given when the code is executed. This can only be used when mocking methods. Attempting to do so on a field will result in an Error being thrown.

**Example:**

```typescript
classMock
    .setup((instance) =>
        instance.buildPerson(It.isAny<string>(), It.isAny<number>())
    )
    .callback((name: string, age: number) => {
        expect(name).toEqual("Some name");
    })
    .returns("my return value", false);
```

or

```typescript
// Not allowed. Throws and Error.
classMock.setup((instance) => instance.someField).callback(() => {});
```

**Returns:**
[MockReturns<R>](./interfaces/returns.interface.ts) & [MockThrows](./interfaces/throws.interface.ts)

---

`returns<R>(value: R, retain = false): void`

Method to set the return value on a mocked property. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock
    .setup((instance) => instance.someMethod())
    .returns("my return value", false);
```

or

```typescript
classMock.setup((instance) => instance.someField).returns("my value", false);
```

**Returns:**

`void`

---

`returnsAsync<R>(value: Awaited<R>, retain = false): void`

Method to set the async return value on a mocked property. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock
    .setup((instance) => instance.someMethod())
    .returnsAsync("my return value", false);
```

or

```typescript
classMock
    .setup((instance) => instance.someField)
    .returnsAsync("my value", false);
```

**Returns:**

`void`

---

`throws(error: Error, retain = false): void`

Configures an error to be thrown by the given property. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock
    .setup((instance) => instance.someMethod())
    .throws(new Error("AH"), false);
```

or

```typescript
classMock
    .setup((instance) => instance.someField)
    .throws(new Error("AH"), false);
```

**Returns:**

`void`

---

`throwsAsync(error: Error, retain = false): void`

Configures an async error to be thrown by the given property. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock
    .setup((instance) => instance.someMethod())
    .throwsAsync(new Error("AH"), false);
```

or

```typescript
classMock
    .setup((instance) => instance.someField)
    .throwsAsync(new Error("AH"), false);
```

**Returns:**

`void`
