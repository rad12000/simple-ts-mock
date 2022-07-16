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
    constructor(objectInstance, property) {
        this.getCallCount = () => this.methodCallsCount;
        this.resetCallCount = () => {
            this.methodCallsCount = 0;
        };
        this.objectInstance = objectInstance;
        this.property = property;
        this.methodCallsCount = 0;
    }
    returns(value, retain = false) {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.property] = null;
            }
            return value;
        };
        this.objectInstance[this.property] = propertyValueWrapper;
    }
    returnsAsync(value, retain = false) {
        const propertyValueWrapper = () => __awaiter(this, void 0, void 0, function* () {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.property] = null;
            }
            return value;
        });
        this.objectInstance[this.property] = propertyValueWrapper;
    }
    throws(error, retain = false) {
        const propertyValueWrapper = () => {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.property] = null;
            }
            throw error;
        };
        this.objectInstance[this.property] = propertyValueWrapper;
    }
    throwsAsync(error, retain = false) {
        const propertyValueWrapper = () => __awaiter(this, void 0, void 0, function* () {
            this.methodCallsCount++;
            if (!retain) {
                this.objectInstance[this.property] = null;
            }
            throw error;
        });
        this.objectInstance[this.property] = propertyValueWrapper;
    }
}
exports.ConfigureReturn = ConfigureReturn;
