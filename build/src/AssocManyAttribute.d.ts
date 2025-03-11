import { Factory } from './Factory';
export declare class AssocManyAttribute<T extends {}> {
    private readonly factory;
    private readonly size;
    constructor(factory: Factory<T>, size?: number);
    value(): T[];
    asyncValue(): Promise<T[]>;
    clone(): AssocManyAttribute<T>;
}
