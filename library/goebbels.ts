import { GoebbelsConfig, goebbelsDefaultConfig } from './goebbels.config'
import { StringRedactor } from './redactors/string-redactor'
import { NumberRedactor } from './redactors/number-redactor'
import { ErrorRedactor } from './redactors/error-redactor'
import { ObjectRedactor } from './redactors/object-redactor'
import {
  isString,
  isError,
  isNumber,
  isObject,
  isArray,
  isFunction,
  deepMerge,
  DeepPartial,
} from './utils'
import { FunctionRedactor } from './redactors/function-redactor'

export type GoebbelsResult<T> =
  | T
  | {
      error: Error
      message: string
    }

export class Goebbels {
  private readonly config: GoebbelsConfig
  private readonly stringRedactor: StringRedactor
  private readonly numberRedactor: NumberRedactor
  private readonly errorRedactor: ErrorRedactor
  private readonly objectRedactor: ObjectRedactor
  private readonly functionRedactor: FunctionRedactor

  constructor(config?: DeepPartial<GoebbelsConfig>) {
    const validConfig = config
      ? deepMerge<GoebbelsConfig>(goebbelsDefaultConfig, config)
      : goebbelsDefaultConfig // Change later - it should merge default and passed config
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
    return this.redactWithDepth(value)
  }

  private redactWithDepth(
    value: unknown,
    depth: number = 0,
  ): GoebbelsResult<unknown> {
    if(depth > this.config.depth) {
      return value
    }
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
      if (isFunction(value)) {
        return this.functionRedactor.redact(value)
      }
      if (isArray(value)) {
        return value.map((singleValue) =>
          this.redactWithDepth(singleValue, depth + 1),
        )
      }
      if (isObject(value)) {
        return this.objectRedactor.redact(value, (...args) =>
          this.redactWithDepth(...args, depth + 1),
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
