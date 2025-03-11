export declare class FactoryAttribute<T> {
    private readonly attrValue;
    constructor(value: T);
    value(): T;
    asyncValue(): T;
    clone(): FactoryAttribute<T>;
}
