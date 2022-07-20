### **Mock\<T\>**

The class used to create a new mock of the given type.

**Example:**

```typescript
const classMock = new Mock<MyInterface>();
```

or

```typescript
const classMock = new Mock<MyClass>();
```

---

**Class Members:**

`setup<R>(configure: (instance: T) => R): ConfigureableMock<R>`

Method to specify the method you want to setup and specify the return value of.

**Example:**

```typescript
classMock.setup((instance) => instance.someMethod());
```

or

```typescript
classMock.setup((instance) => instance.someField());
```

**Returns:**

[ConfigurableMock](./configurables/configurable-mock.md)

---

`object(): T`

Method to retrieve the mocked object for testing.

**Example:**

```typescript
classMock.object();
```

**Returns:**

An instance of the mocked type.

---

`resetCallCount(): void`

Method to reset the number of calls on all mocked fields and methods.

**Example:**

```typescript
classMock.resetCallCount();
```

**Returns:**

`void`

---

`getCallCount<R>(configure: (instance: T) => R): number`

Method to get the number of times a given property has had its value retrieved.

**Example:**

```typescript
classMock.getCallCount((i) => i.myMethod());
```

or

```typescript
classMock.getCallCount((i) => i.myField);
```

**Returns:**

`number` The number of times the given property has had its value retrieved.
