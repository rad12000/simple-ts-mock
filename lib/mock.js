"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mock = void 0;
const configureables_1 = require("./configureables");
class Mock {
    constructor() {
        this.calledCount = (method) => { var _a, _b; return (_b = (_a = this.propertyConfigMap[method]) === null || _a === void 0 ? void 0 : _a.getCallCount()) !== null && _b !== void 0 ? _b : 0; };
        this.clearCalls = () => {
            for (const key of Object.keys(this.propertyConfigMap)) {
                const obj = this.propertyConfigMap;
                obj[key].resetCallCount();
            }
        };
        this.object = () => this._object;
        this._object = {};
        this.propertyConfigMap = {};
    }
    setupMethod(methodName) {
        const returns = new configureables_1.ConfigureReturn(this._object, methodName);
        this.propertyConfigMap[methodName] = returns;
        return returns;
    }
    setupField(fieldName) {
        const returns = new configureables_1.ConfigureValue(this._object, fieldName);
        this.propertyConfigMap[fieldName] = returns;
        return returns;
    }
}
exports.Mock = Mock;
