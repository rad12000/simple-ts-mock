### **ConfigureReturn\<T, K extends keyof T\>**

The class used to configure the value of a mocked property.

**Class Members:**

`returns(value: MethodOrNeverReturnType<T[K]>, retain = false): void`

Method to set the return value on a mocked property. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock.setupMethod("someMethodKey").returns("my return value", false);
```

**Returns:**

`void`

---

`returnsAsync(value: MethodOrNeverReturnType<T[K]>, retain = false): void`

Method to set the asyncreturn value on a mocked property. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock.setupMethod("someMethodKey").returnsAsync("my return value", false);
```

**Returns:**

`void`

---

`throws(error: Error, retain = false): void`

Configures an error to be thrown by the given method. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock.setupMethod("someMethodKey").throws(new Error("AH"), false);
```

**Returns:**

`void`

---

`throwsAsync(error: Error, retain = false): void`

Configures an async error to be thrown by the given method. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock.setupMethod("someMethodKey").throwsAsync(new Error("AH"), false);
```

**Returns:**

`void`
