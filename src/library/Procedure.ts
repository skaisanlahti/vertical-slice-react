export interface Procedure<TInput = void, TResult = void> {
  handle(input: TInput): TResult;
}
