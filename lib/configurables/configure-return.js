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
exports.ConfigureReturn = void 0;
const its_1 = require("./its");
class ConfigureReturn {
    constructor(objectInstance, propertyName, params) {
        this.getCallCount = () => this.methodCallsCount;
        this.resetCallCount = () => {
            this.methodCallsCount = 0;
        };
        this.objectInstance = objectInstance;
        this.propertyName = propertyName;
        this.params = params;
        this.methodCallsCount = 0;
        this.wrapMethod();
    }
    returns(value, retain = false) {
        const handler = () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }
            return value;
        };
        this.wrapMethod(handler);
    }
    returnsAsync(value, retain = false) {
        const handler = () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }
            return Promise.resolve(value);
        };
        this.wrapMethod(handler);
    }
    throws(error, retain = false) {
        const handler = () => {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }
            throw error;
        };
        this.wrapMethod(handler);
    }
    throwsAsync(error, retain = false) {
        const handler = () => __awaiter(this, void 0, void 0, function* () {
            if (!retain) {
                delete this.objectInstance[this.propertyName];
            }
            throw error;
        });
        this.wrapMethod(handler);
    }
    wrapMethod(method) {
        const propertyValueWrapper = (...args) => {
            let isValidCall = true;
            this.actualParams = args;
            try {
                for (let i = 0; i < args.length; i++) {
                    const expectedParam = this.params[i];
                    if (expectedParam === its_1.anyValue)
                        continue;
                    if (expectedParam === args[i])
                        continue;
                    isValidCall = false;
                }
            }
            catch (e) {
                console.log(e);
                isValidCall = false;
            }
            if (isValidCall) {
                this.methodCallsCount++;
            }
            if (method !== undefined) {
                return method();
            }
        };
        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }
}
exports.ConfigureReturn = ConfigureReturn;
