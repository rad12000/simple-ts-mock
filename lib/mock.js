"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mock = void 0;
const configurables_1 = require("./configurables");
class Mock {
    constructor() {
        this._object = {};
        this.propertyConfigMap = {};
    }
    getCallCount(configure) {
        var _a, _b;
        const mockConfig = { isMethod: false, params: [], propName: "" };
        const proxyHandler = {
            get: (_, propertyName) => {
                mockConfig.propName = propertyName;
                return function (...args) {
                    mockConfig.isMethod = true;
                    mockConfig.params = args;
                };
            },
        };
        const proxyT = new Proxy({}, proxyHandler);
        configure(proxyT);
        return (_b = (_a = this.propertyConfigMap[mockConfig.propName]) === null || _a === void 0 ? void 0 : _a.getCallCount()) !== null && _b !== void 0 ? _b : 0;
    }
    resetCallCount() {
        for (const key of Object.keys(this.propertyConfigMap)) {
            const obj = this.propertyConfigMap;
            obj[key].resetCallCount();
        }
    }
    object() {
        return this._object;
    }
    setup(configure) {
        const mockConfig = { isMethod: false, params: [], propName: "" };
        const proxyHandler = {
            get: (_, propertyName) => {
                mockConfig.propName = propertyName;
                return function (...args) {
                    mockConfig.isMethod = true;
                    mockConfig.params = args;
                };
            },
        };
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
