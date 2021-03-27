
import { DeepPartial } from 'utility-types'
import { GoebbelsConfig, goebbelsDefaultConfig } from './goebbels.config'
import { StringRedactor } from './redactors/string-redactor'
import { NumberRedactor } from './redactors/number-redactor'
import { ErrorRedactor } from './redactors/error-redactor'
import { ObjectRedactor } from './redactors/object-redactor'
import { isString, isError, isNumber, isObject, isArray, isFunction } from './utils'
import { FunctionRedactor } from './redactors/function-redactor'

export type GoebbelsResult<T> =
  | T
  | {
      error: Error
      message: string
    }

export class Goebbels  {
  private readonly config: GoebbelsConfig
  private readonly stringRedactor: StringRedactor
  private readonly numberRedactor: NumberRedactor
  private readonly errorRedactor: ErrorRedactor
  private readonly objectRedactor: ObjectRedactor
  private readonly functionRedactor: FunctionRedactor

  constructor(config: DeepPartial<GoebbelsConfig>) {
    const validConfig = goebbelsDefaultConfig // Change later - it should merge default and passed config
    const { mask, detection } = validConfig

    this.config = validConfig
    this.stringRedactor = new StringRedactor(mask, detection.text)
    this.numberRedactor = new NumberRedactor(mask, detection.number)
    this.errorRedactor = new ErrorRedactor(
      mask,
      detection.error.name,
      detection.error.message,
      detection.error.stack,
    )
    this.objectRedactor = new ObjectRedactor(mask, detection.object.key)
    this.functionRedactor = new FunctionRedactor(mask, detection.function.name)
  }

  redact(value: unknown): GoebbelsResult<unknown> {
    try {
      // Primitive values
      if (isString(value)) {
        return this.stringRedactor.redact(value)
      }
      if (isNumber(value)) {
        return this.numberRedactor.redact(value)
      }
      // Non-primitive values
      if (isError(value)) {
        return this.errorRedactor.redact(value)
      }
      if(isFunction(value)) {
        return this.functionRedactor.redact(value)
      }
      if (isArray(value)) {
        return value.map((singleValue) => this.redact(singleValue))
      }
      if (isObject(value)) {
        return this.objectRedactor.redact(value, (...args) =>
          this.redact(...args),
        )
      }
      // Cannot redact
      return value
    } catch (error) {
      return {
        error: this.errorRedactor.redact(error),
        message: 'Unknown error occurred during redact.',
      }
    }
  }
}
