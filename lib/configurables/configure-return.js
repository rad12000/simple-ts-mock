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
    }
    returns(value, retain = false) {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            return value;
        };
        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }
    returnsAsync(value, retain = false) {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            return Promise.resolve(value);
        };
        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }
    throws(error, retain = false) {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            throw error;
        };
        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }
    throwsAsync(error, retain = false) {
        const propertyValueWrapper = () => __awaiter(this, void 0, void 0, function* () {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.propertyName] = null;
            }
            throw error;
        });
        this.objectInstance[this.propertyName] = propertyValueWrapper;
    }
}
exports.ConfigureReturn = ConfigureReturn;
