### **ConfigureValue\<T, K extends keyof T\>**

The class used to configure the value of a mocked property.

**Class Members:**

`set(value: FieldOrNeverReturnType<T[K]>, retain = false): void`

Method to set the return value. Accepts an optional `retain` parameter which determines if after the value is read once it is retained or reset.

**Example:**

```typescript
classMock.setupValue("someFieldKey").("my return value", false);
```

**Returns:**

`void`
