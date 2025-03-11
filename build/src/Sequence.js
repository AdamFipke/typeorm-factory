"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequence = void 0;
class Sequence {
    constructor(sequenceFunction) {
        this.lastNumber = 0;
        this.sequenceFunction = sequenceFunction;
    }
    value() {
        this.lastNumber += 1;
        return this.sequenceFunction(this.lastNumber);
    }
    asyncValue() {
        return this.value();
    }
    clone() {
        return this;
    }
}
exports.Sequence = Sequence;
//# sourceMappingURL=Sequence.js.map