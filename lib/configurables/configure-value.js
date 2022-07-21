"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigureValue = void 0;
class ConfigureValue {
    constructor(objectInstance, propertyName) {
        this.objectInstance = objectInstance;
        this.propertyName = propertyName;
        this.memberAccessedCount = 0;
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
            },
            configurable: true,
        });
    }
    returns(value, retain) {
        const privateKey = `_${this.propertyName.toString()}`;
        this.objectInstance[privateKey] = value;
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                let returnValue = this.objectInstance[privateKey];
                if (!retain) {
                    if (this.objectInstance[privateKey] !== null &&
                        typeof this.objectInstance[privateKey] === "object") {
                        returnValue = Array.isArray(this.objectInstance[privateKey])
                            ? [...this.objectInstance[privateKey]]
                            : Object.assign({}, this.objectInstance[privateKey]);
                    }
                    this.objectInstance[privateKey] = null;
                }
                return returnValue;
            },
            set: (val) => {
                this.objectInstance[privateKey] = val;
            },
            configurable: true,
        });
    }
    returnsAsync(value, retain) {
        const privateKey = `_${this.propertyName.toString()}`;
        this.objectInstance[privateKey] = value;
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                let returnValue = this.objectInstance[privateKey];
                if (!retain) {
                    if (this.objectInstance[privateKey] !== null &&
                        typeof this.objectInstance[privateKey] === "object") {
                        returnValue = Array.isArray(this.objectInstance[privateKey])
                            ? [...this.objectInstance[privateKey]]
                            : Object.assign({}, this.objectInstance[privateKey]);
                    }
                    this.objectInstance[privateKey] = null;
                }
                return Promise.resolve(returnValue);
            },
            set: (val) => {
                this.objectInstance[privateKey] = val;
            },
            configurable: true,
        });
    }
    throws(error, retain) {
        const privateKey = `_${this.propertyName.toString()}`;
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                throw error;
            },
            configurable: true,
        });
    }
    throwsAsync(error, retain) {
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => __awaiter(this, void 0, void 0, function* () {
                this.memberAccessedCount++;
                throw error;
            }),
            configurable: true,
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
