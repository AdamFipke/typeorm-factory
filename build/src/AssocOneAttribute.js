"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssocOneAttribute = void 0;
class AssocOneAttribute {
    constructor(factory) {
        this.factory = factory;
    }
    value() {
        return this.factory.build();
    }
    asyncValue() {
        return this.factory.create();
    }
    clone() {
        return new AssocOneAttribute(this.factory);
    }
}
exports.AssocOneAttribute = AssocOneAttribute;
//# sourceMappingURL=AssocOneAttribute.js.map