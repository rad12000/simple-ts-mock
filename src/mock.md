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

`setupMethod<K extends keyof T>(methodName: K): ConfigureReturn<T, K>`

Method to specify the method you want to setup and specify the return value of.

**Example:**

```typescript
classMock.setupMethod("someClassMethodName");
```

**Returns:**

[ConfigureReturn\<T, K\>](./configurables/configure-return.md)

---

`setupField<K extends keyof T>(fieldName: K): ConfigureValue<T, K>`

Method to specify the field you want to setup and set the value of.

**Example:**

```typescript
classMock.setupField("someClassMethodName");
```

**Returns:**

[ConfigureValue\<T, K\>](./configurables/configure-value.md)

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

`getCallCount(property: keyof T): number`

Method to get the number of times a given property has had its value retrieved.

**Example:**

```typescript
classMock.getCallCount("myPropertyName");
```

**Returns:**

`number` The number of times the given property has had its value retrieved.
