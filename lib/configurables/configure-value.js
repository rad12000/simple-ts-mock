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
        // Initial setup
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
            },
            configurable: true,
        });
    }
    callback(_) {
        throw new Error("Callbacks may only be used when configuring method calls, not fields!");
    }
    returns(value, retain) {
        const privateKey = `_${this.propertyName.toString()}`;
        // Set the private value
        this.objectInstance[privateKey] = { value, active: true };
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                let configuredObj = this.objectInstance[privateKey];
                let { value: returnValue, active } = configuredObj;
                if (!active) {
                    delete this.objectInstance[privateKey];
                    return;
                }
                if (!retain) {
                    configuredObj.active = false;
                }
                return returnValue;
            },
            set: (val) => {
                this.objectInstance[privateKey].value = val;
            },
            configurable: true,
        });
    }
    returnsAsync(value, retain) {
        const privateKey = `_${this.propertyName.toString()}`;
        // Set the private value
        this.objectInstance[privateKey] = { value, active: true };
        Object.defineProperty(this.objectInstance, this.propertyName, {
            get: () => {
                this.memberAccessedCount++;
                let configuredObj = this.objectInstance[privateKey];
                let { value: returnValue, active } = configuredObj;
                if (!active) {
                    delete this.objectInstance[privateKey];
                    return;
                }
                if (!retain) {
                    configuredObj.active = false;
                }
                return Promise.resolve(returnValue);
            },
            set: (val) => {
                this.objectInstance[privateKey].value = val;
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
