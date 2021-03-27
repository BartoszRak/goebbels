import { GoebbelsCore } from './goebbels-core'
import { TypeGuard } from './type-guard'
import { DeepPartial } from 'utility-types'
import { GoebbelsConfig, goebbelsDefaultConfig } from './goebbels.config'
import { StringRedactor } from './redactors/string-redactor'
import { NumberRedactor } from './redactors/number-redactor'
import { ErrorRedactor } from './redactors/error-redactor'
import { ObjectRedactor } from './redactors/object-redactor'

export type GoebbelsResult<T> =
  | T
  | {
      error: Error
      message: string
    }

export class Goebbels extends GoebbelsCore {
  private readonly config: GoebbelsConfig
  private readonly stringRedactor: StringRedactor
  private readonly numberRedactor: NumberRedactor
  private readonly errorRedactor: ErrorRedactor
  private readonly objectRedactor: ObjectRedactor

  constructor(config: DeepPartial<GoebbelsConfig>) {
    super(new TypeGuard())
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
  }

  redact(value: unknown): GoebbelsResult<unknown> {
    try {
      // Primitive values
      if (this.typeGuard.isString(value)) {
        return this.stringRedactor.redact(value)
      }
      if (this.typeGuard.isNumber(value)) {
        return this.numberRedactor.redact(value)
      }
      // Non-primitive values
      if (this.typeGuard.isError(value)) {
        return this.errorRedactor.redact(value)
      }
      if (this.typeGuard.isArray(value)) {
        return value.map((singleValue) => this.redact(singleValue))
      }
      if (this.typeGuard.isObject(value)) {
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
