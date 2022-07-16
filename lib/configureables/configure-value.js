"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureValue = void 0;
class ConfigureValue {
    constructor(objectInstance, propertyName) {
        this.objectInstance = objectInstance;
        this.property = propertyName;
        this.memberAccessedCount = 0;
    }
    set(value, retain = false) {
        const obj = this.objectInstance;
        const privateKey = `_${this.property.toString()}`;
        obj[privateKey] = value;
        Object.defineProperty(this.objectInstance, this.property, {
            get: () => {
                this.memberAccessedCount++;
                let returnValue = obj[privateKey];
                if (!retain) {
                    if (typeof obj[privateKey] === "object") {
                        returnValue = Array.isArray(obj[privateKey])
                            ? [...obj[privateKey]]
                            : Object.assign({}, obj[privateKey]);
                    }
                    obj[privateKey] = null;
                }
                return returnValue;
            },
            set: (val) => {
                obj[privateKey] = val;
            },
        });
    }
    getCallCount() {
        return this.memberAccessedCount;
    }
    resetCallCount() {
        this.memberAccessedCount = 0;
    }
}
exports.ConfigureValue = ConfigureValue;
