import { Factory } from './Factory';
export declare class AssocOneAttribute<T extends {}> {
    private readonly factory;
    constructor(factory: Factory<T>);
    value(): T;
    asyncValue(): Promise<T>;
    clone(): AssocOneAttribute<T>;
}
