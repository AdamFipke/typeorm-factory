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
exports.Factory = void 0;
const AssocManyAttribute_1 = require("./AssocManyAttribute");
const AssocOneAttribute_1 = require("./AssocOneAttribute");
const FactoryAttribute_1 = require("./FactoryAttribute");
const Sequence_1 = require("./Sequence");
/**
 * Factory defines attributes, sequences and associations for an Entity
 */
class Factory {
    /** constructor */
    constructor(Entity, datasource, attrs) {
        this.privateRepository = undefined;
        this.Entity = Entity;
        this.datasource = datasource;
        this.attrs = attrs || [];
    }
    get repository() {
        this.privateRepository =
            this.privateRepository || this.datasource.getRepository(this.Entity);
        return this.privateRepository;
    }
    /**
     * Clones current factory definition
     */
    clone() {
        const clonedAttrs = this.attrs.map(([name, attr]) => [
            name,
            attr.clone()
        ]);
        return new Factory(this.Entity, this.datasource, clonedAttrs);
    }
    /**
     * sequence generator
     */
    sequence(name, sequenceFunction) {
        this.attrs.push([name, new Sequence_1.Sequence(sequenceFunction)]);
        return this;
    }
    /**
     * attribute generator
     */
    attr(name, value) {
        const clonedFactory = this.clone();
        clonedFactory.attrs.push([name, new FactoryAttribute_1.FactoryAttribute(value)]);
        return clonedFactory;
    }
    // here is `any` for factory attribute definition. Typescript does not understand T[K][0]
    /**
     * association generator for one hasMany
     */
    assocMany(name, factory, size = 1) {
        const clonedFactory = this.clone();
        clonedFactory.attrs.push([name, new AssocManyAttribute_1.AssocManyAttribute(factory, size)]);
        return clonedFactory;
    }
    /**
     * association generator for one hasMany
     */
    assocOne(name, 
    // @ts-ignore
    factory) {
        const clonedFactory = this.clone();
        // @ts-ignore
        clonedFactory.attrs.push([name, new AssocOneAttribute_1.AssocOneAttribute(factory)]);
        return clonedFactory;
    }
    /**
     * builds an instance of Entity
     */
    build(attributes = {}) {
        const ignoreKeys = Object.keys(attributes);
        const obj = this.assignAttrs(new this.Entity(), ignoreKeys);
        // @ts-ignore
        return this.repository.merge(obj, attributes);
    }
    /**
     * builds a list instances of Entity
     */
    buildList(size, attributes = {}) {
        return Array.from({ length: size }, () => this.build(attributes));
    }
    /**
     * creates an Entity
     */
    create(attributes = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.createEntity(attributes);
            return this.repository.save(entity);
        });
    }
    /**
     * creates a list of Entities
     */
    createList(size, attributes = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield Promise.all(Array.from({ length: size }, () => this.createEntity(attributes)));
            return this.repository.save(entities);
        });
    }
    assignAttrs(obj, ignoreKeys) {
        return this.attrs.reduce((sum, [key, attribute]) => {
            if (ignoreKeys.indexOf(key) === -1) {
                sum[key] = attribute.value();
            }
            return sum;
        }, obj);
    }
    assignAsyncAttrs(obj, ignoreKeys) {
        return this.attrs.reduce((sum, [key, factory]) => {
            return sum.then((s) => __awaiter(this, void 0, void 0, function* () {
                if (ignoreKeys.indexOf(key) === -1) {
                    s[key] = yield factory.asyncValue();
                }
                return s;
            }));
        }, Promise.resolve(obj));
    }
    createEntity(attributes = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const ignoreKeys = Object.keys(attributes);
            const obj = yield this.assignAsyncAttrs(new this.Entity(), ignoreKeys);
            // @ts-ignore
            return this.repository.merge(obj, attributes);
        });
    }
}
exports.Factory = Factory;
//# sourceMappingURL=Factory.js.map