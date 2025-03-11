import { DataSource } from 'typeorm';
import { AssocManyAttribute } from './AssocManyAttribute';
import { AssocOneAttribute } from './AssocOneAttribute';
import { FactoryAttribute } from './FactoryAttribute';
import { Sequence } from './Sequence';
/**
 * Interface for a class
 */
export type IConstructable<T> = new () => T;
/**
 * Attribute type
 */
export type Attr<U> = [
    keyof U,
    Sequence<U[keyof U]> | AssocManyAttribute<any> | AssocOneAttribute<U[keyof U]> | FactoryAttribute<any>
];
export type Attrs<U> = Array<Attr<U>>;
/**
 * Factory defines attributes, sequences and associations for an Entity
 */
export declare class Factory<T extends {}> {
    /**
     * typeorm Entity class
     */
    Entity: IConstructable<T>;
    /**
     * array of attributes generators
     */
    attrs: Attrs<T>;
    private datasource;
    private privateRepository;
    /** constructor */
    constructor(Entity: IConstructable<T>, datasource: DataSource, attrs?: Attrs<T>);
    private get repository();
    /**
     * Clones current factory definition
     */
    clone(): Factory<T>;
    /**
     * sequence generator
     */
    sequence<K extends keyof T>(name: K, sequenceFunction: (i: number) => T[K]): Factory<T>;
    /**
     * attribute generator
     */
    attr<K extends keyof T>(name: K, value: T[K]): Factory<T>;
    /**
     * association generator for one hasMany
     */
    assocMany<K extends keyof T>(name: K, factory: Factory<any>, size?: number): Factory<T>;
    /**
     * association generator for one hasMany
     */
    assocOne<K extends keyof T>(name: K, factory: Factory<T[K]>): Factory<T>;
    /**
     * builds an instance of Entity
     */
    build(attributes?: Partial<T>): T;
    /**
     * builds a list instances of Entity
     */
    buildList(size: number, attributes?: Partial<T>): T[];
    /**
     * creates an Entity
     */
    create(attributes?: Partial<T>): Promise<T>;
    /**
     * creates a list of Entities
     */
    createList(size: number, attributes?: Partial<T>): Promise<T[]>;
    private assignAttrs;
    private assignAsyncAttrs;
    private createEntity;
}
