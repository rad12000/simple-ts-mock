# simple-js-mock

---

## Description

This lightweight, testing framework agnostic, package provides an easy way to mock interfaces and classes within your Typescript and Javascript projects. Inspired by the .NET package MOQ, .NET developers will find this package quite familiar. Will work with Mocha, Jest, Jasmine, or any other framework you use for writing unit tests!

---

## Example Usage

Example classes

```typescript
export class UserService {
    constructor() {}

    getUser(userId: int): Promise<User> {
        return Promise.resolve(new User());
    }
}

export class UserProvider {
    private readonly _userService: UserService;

    constructor(userService = new UserService()) {
        this._userService = userService;
    }

    async doUserStuff(userId: int): Promise<boolean> {
        const user = await this._userService.getUser(userId);

        return user ? true : false;
    }
}
```

Example testing: (Jest's syntax is used in this example, but you can use any other framework the same way.)

```typescript
import Mock from "simple-js-mock";
import { UserProvider, UserService } from "./user";

test("UserProvider returns true when user retrieved successfully", async () => {
    // Arrange
    const mockService = new Mock<UserService>();
    const userProvider = new UserProvider(mockService.object());
    const expected = true;
    mockService.setup((s) => s.getUser()).returnsAsync(new User());

    // Act
    const actual = await userProvider.doUserStuff(123);

    // Assert
    expect(mockService.getCallCount((s) => s.getUser())).toEqual(1);
    expect(actual).toEqual(expected);
});
```

---

## API

### **[Mock\<T\>](./src/mock.md)**

### **[ConfigurableMock](./src/configurables/configurable-mock.md)**
