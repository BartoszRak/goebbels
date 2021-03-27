export class TypeGuard {
  isObject(value: unknown): value is object {
    return (
      value instanceof Object &&
      !Array.isArray(value) &&
      !this.isError(value) &&
      !this.isFunction(value)
    )
  }

  isNumber(value: unknown): value is number {
    return typeof value === 'number'
  }

  isString(value: unknown): value is string {
    return typeof value === 'string'
  }

  isError(value: unknown): value is Error {
    return value instanceof Error
  }

  isFunction(value: unknown): value is Function {
    return value instanceof Function
  }
}
