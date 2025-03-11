"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssocManyAttribute = void 0;
class AssocManyAttribute {
    constructor(factory, size = 1) {
        this.factory = factory;
        this.size = size;
    }
    value() {
        return this.factory.buildList(this.size);
    }
    asyncValue() {
        return this.factory.createList(this.size);
    }
    clone() {
        return new AssocManyAttribute(this.factory, this.size);
    }
}
exports.AssocManyAttribute = AssocManyAttribute;
//# sourceMappingURL=AssocManyAttribute.js.map