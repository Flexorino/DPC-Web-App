export interface CancelableAction<T> {
    cancel: (x: T) => void;
}