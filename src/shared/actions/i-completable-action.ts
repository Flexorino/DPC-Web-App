
export interface CompletableAction<T> {
    resolve: (x: T) => void;
    reject: (x: Error) => void;
    then: <H>(funky: (x: T) => H) => Promise<H>;
    catch: <H>(funky: (x: any) => H | T) => Promise<H | T>;
    finally: (funky: () => T) => Promise<T>;
}
