type Ok<T> = { isError: false; value: T };
type Fail<E> = { isError: true; error: E };
export type Result<T, E> = Ok<T> | Fail<E>;

export function ok<T, E>(value: T): Result<T, E> {
  return { isError: false, value };
}

export function fail<T, E>(error: E): Result<T, E> {
  return { isError: true, error };
}

export function unwrap<T, E>(result: Result<T, E>): T {
  if (result.isError) {
    throw new Error("Can't unwrap error result.");
  }
  return result.value;
}
