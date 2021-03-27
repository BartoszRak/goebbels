import { isError } from './is-error'
import { isFunction } from './is-function'

export const isObject = (
  value: unknown,
): value is Record<string | number, unknown> =>
  value instanceof Object &&
  !Array.isArray(value) &&
  !isError(value) &&
  !isFunction(value)
