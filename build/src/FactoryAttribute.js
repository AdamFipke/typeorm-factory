"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryAttribute = void 0;
class FactoryAttribute {
    constructor(value) {
        this.attrValue = value;
    }
    value() {
        return this.attrValue;
    }
    asyncValue() {
        return this.value();
    }
    clone() {
        return new FactoryAttribute(this.attrValue);
    }
}
exports.FactoryAttribute = FactoryAttribute;
//# sourceMappingURL=FactoryAttribute.js.map