export type SequenceFunction<U> = (i: number) => U;
export declare class Sequence<T> {
    readonly sequenceFunction: SequenceFunction<T>;
    protected lastNumber: number;
    constructor(sequenceFunction: SequenceFunction<T>);
    value(): T;
    asyncValue(): T;
    clone(): this;
}
