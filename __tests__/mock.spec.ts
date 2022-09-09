import { Mock, It } from "../src";
import { Cook } from "./cook.interface";

const testCases = [
  {
    expectedValue: "Banana Bread",
    propKey: "recipeName",
  },
  {
    expectedValue: 23,
    propKey: "numberOfIngredients",
  },
  {
    expectedValue: {
      firstName: "FName",
      lastName: "LName",
    },
    propKey: "ownerDetails",
  },
  {
    expectedValue: ["bananas", "sugar"],
    propKey: "ingredients",
  },
];

for (const testCase of testCases) {
  const mockObj = new Mock<Cook>();

  test(`Mock ${testCase.propKey} of type ${
    Array.isArray(testCase.expectedValue)
      ? "array"
      : typeof testCase.expectedValue
  } works as expected`, () => {
    // Arrange
    const expectedValue = testCase.expectedValue;
    mockObj
      .setup((c) => (c as unknown as Record<string, unknown>)[testCase.propKey])
      .returns(expectedValue, true);

    // Act
    const actualValue =
      mockObj.object()[testCase.propKey as unknown as keyof Cook];

    // Assert
    expect(actualValue).toEqual(expectedValue);
    expect(
      mockObj.getCallCount(
        (c) => (c as unknown as Record<string, unknown>)[testCase.propKey]
      )
    ).toEqual(1);
  });

  test(`Mock ${testCase.propKey} of type ${
    Array.isArray(testCase.expectedValue)
      ? "array"
      : typeof testCase.expectedValue
  } keeps track of count`, () => {
    // Arrange
    const expectedValue = testCase.expectedValue;

    // Act
    const actualValue =
      mockObj.object()[testCase.propKey as unknown as keyof Cook];

    // Assert
    expect(actualValue).toEqual(expectedValue);
    expect(
      mockObj.getCallCount(
        (c) => (c as unknown as Record<string, unknown>)[testCase.propKey]
      )
    ).toEqual(2);
  });

  test(`Mock ${testCase.propKey} of type ${
    Array.isArray(testCase.expectedValue)
      ? "array"
      : typeof testCase.expectedValue
  } can reset count`, () => {
    // Arrange
    const expectedValue = testCase.expectedValue;

    // Act
    mockObj.resetCallCount();

    // Assert
    expect(
      mockObj.getCallCount(
        (c) => (c as unknown as Record<string, unknown>)[testCase.propKey]
      )
    ).toEqual(0);
  });

  test(`Mock ${testCase.propKey} of type ${
    Array.isArray(testCase.expectedValue)
      ? "array"
      : typeof testCase.expectedValue
  } without retain unsets value after first call`, () => {
    // Arrange
    const expectedValue = testCase.expectedValue;
    mockObj
      .setup((c) => (c as unknown as Record<string, unknown>)[testCase.propKey])
      .returns(expectedValue);

    // Act
    const setValue =
      mockObj.object()[testCase.propKey as unknown as keyof Cook];
    const unsetValue =
      mockObj.object()[testCase.propKey as unknown as keyof Cook];

    // Assert
    expect(setValue).toEqual(expectedValue);
    expect(unsetValue).toBeUndefined();
    expect(
      mockObj.getCallCount(
        (c) => (c as unknown as Record<string, unknown>)[testCase.propKey]
      )
    ).toEqual(2);
  });
}

test("returnsAsync works as expected", async () => {
  // Arrange
  const expected = 43;
  const mockObj = new Mock<Cook>();
  mockObj.setup((c) => c.getCookTime()).returnsAsync(expected);

  // Act
  const actual = await mockObj.object().getCookTime();

  // Assert
  expect(actual).toEqual(expected);
  expect(mockObj.getCallCount((i) => i.getCookTime())).toEqual(1);
});

test("returns works as expected", () => {
  // Arrange
  const expected = true;
  const mockObj = new Mock<Cook>();
  mockObj.setup((c) => c.isCooked()).returns(expected);

  // Act
  const actual = mockObj.object().isCooked();

  // Assert
  expect(actual).toEqual(expected);
  expect(mockObj.getCallCount((i) => i.isCooked)).toEqual(1);
});

test("returns works as expected and retains as expected", () => {
  // Arrange
  const expected = true;
  const retainMockObj = new Mock<Cook>();
  retainMockObj.setup((c) => c.isCooked()).returns(expected, true);

  const noRetainMockObj = new Mock<Cook>();
  noRetainMockObj.setup((c) => c.isCooked()).returns(expected);

  // Act
  const retainVal1 = retainMockObj.object().isCooked();
  const retainVal2 = retainMockObj.object().isCooked();
  const noRetainVal1 = noRetainMockObj.object().isCooked();

  // Assert
  expect(() => noRetainMockObj.object().isCooked()).toThrow();
  expect(retainVal1).toEqual(expected);
  expect(retainVal1).toEqual(retainVal2);
  expect(noRetainVal1).toEqual(expected);
  expect(retainMockObj.getCallCount((i) => i.isCooked())).toEqual(2);
  expect(noRetainMockObj.getCallCount((i) => i.isCooked())).toEqual(1);
});

test("returnsAsync works as expected and retains as expected", async () => {
  // Arrange
  const expected = 42;
  const retainMockObj = new Mock<Cook>();
  retainMockObj
    .setup((c) => c.getCookTime(It.isAny<string>()))
    .returnsAsync(expected, true);

  const noRetainMockObj = new Mock<Cook>();
  noRetainMockObj.setup((c) => c.getCookTime()).returnsAsync(expected);

  // Act
  const retainVal1 = await retainMockObj.object().getCookTime("hey");
  const retainVal2 = await retainMockObj.object().getCookTime("hey");
  const noRetainVal1 = await noRetainMockObj.object().getCookTime();

  // Assert
  expect(() => noRetainMockObj.object().getCookTime()).toThrow();
  expect(retainVal1).toEqual(expected);
  expect(retainVal1).toEqual(retainVal2);
  expect(noRetainVal1).toEqual(expected);
  expect(retainMockObj.getCallCount((i) => i.getCookTime())).toEqual(2);
  expect(noRetainMockObj.getCallCount((i) => i.getCookTime())).toEqual(1);
});

test("setupMethod count is reset", async () => {
  // Arrange
  const timesToCall = 3;
  const mockObj = new Mock<Cook>();
  mockObj.setup((c) => c.getCookTime()).returnsAsync(32, true);
  mockObj.setup((c) => c.isCooked()).returnsAsync(false, true);

  // Act
  for (let i = 0; i < timesToCall; i++) {
    await mockObj.object().getCookTime();
    mockObj.object().isCooked();
  }

  const actualTimesCalled = {
    getCookTime: mockObj.getCallCount((i) => i.isCooked()),
    isCooked: mockObj.getCallCount((i) => i.isCooked()),
  };

  mockObj.resetCallCount();

  // Assert
  expect(actualTimesCalled.getCookTime).toEqual(timesToCall);
  expect(actualTimesCalled.isCooked).toEqual(timesToCall);
  expect(mockObj.getCallCount((i) => i.isCooked())).toEqual(0);
  expect(mockObj.getCallCount((i) => i.isCooked())).toEqual(0);
});
