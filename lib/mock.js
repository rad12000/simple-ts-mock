"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mock = void 0;
const it_is_any_1 = require("./configurables/its/it-is-any");
const configurables_1 = require("./configurables");
/**
 * A class which simplifies mocking of interfaces and classes alike.
 */
class Mock {
    constructor() {
        this._object = {};
        this.propertyConfigMap = {};
    }
    /**
     * Gets the number of calls for a given property.
     * @param configure The property to check the number of calls on.
     * @returns The number of times the method was called.
     */
    getCallCount(configure) {
        const mockConfig = { isMethod: false, params: [], propName: "" };
        // @ts-ignore
        const proxyHandler = {
            get: (_, propertyName) => {
                mockConfig.propName = propertyName;
                return function (...args) {
                    mockConfig.isMethod = true;
                    mockConfig.params = args;
                };
            },
        };
        // @ts-ignore
        const proxyT = new Proxy({}, proxyHandler);
        configure(proxyT);
        const mockedProp = this.propertyConfigMap[mockConfig.propName];
        if (!mockedProp) {
            return 0;
        }
        if (mockConfig.isMethod) {
            const mockedMethod = mockedProp;
            if (!mockedMethod.actualParams) {
                return 0;
            }
            const paramLength = [
                mockedMethod.actualParams.length,
                mockConfig.params.length,
            ].sort((a, b) => b - a)[0];
            for (let i = 0; i < paramLength; i++) {
                if (mockConfig.params[i] == it_is_any_1.anyValue) {
                    continue;
                }
                if (mockedMethod.actualParams[i] !== mockConfig.params[i]) {
                    return 0;
                }
            }
        }
        return mockedProp.getCallCount();
    }
    /**
     * Clears call count for all methods.
     */
    resetCallCount() {
        for (const key of Object.keys(this.propertyConfigMap)) {
            const obj = this.propertyConfigMap;
            obj[key].resetCallCount();
        }
    }
    /**
     * Get the mocked object.
     * @returns The mocked instance of @type {T}
     */
    object() {
        return this._object;
    }
    /**
     * Sets up a method to mock.
     * @param configure a handler to specify the property to mock.
     * @returns A configurable object.
     */
    setup(configure) {
        const mockConfig = { isMethod: false, params: [], propName: "" };
        // @ts-ignore
        const proxyHandler = {
            get: (_, propertyName) => {
                mockConfig.propName = propertyName;
                return function (...args) {
                    mockConfig.isMethod = true;
                    mockConfig.params = args;
                };
            },
        };
        // @ts-ignore
        const proxyT = new Proxy({}, proxyHandler);
        configure(proxyT);
        let configureObject;
        if (mockConfig.isMethod) {
            configureObject = new configurables_1.ConfigureReturn(this._object, mockConfig.propName, mockConfig.params);
        }
        else {
            configureObject = new configurables_1.ConfigureValue(this._object, mockConfig.propName);
        }
        this.propertyConfigMap[mockConfig.propName] = configureObject;
        return configureObject;
    }
}
exports.Mock = Mock;
