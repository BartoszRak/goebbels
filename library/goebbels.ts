import { GoebbelsCore } from './goebbels-core'
import { TypeGuard } from './type-guard'
import { DeepPartial } from 'utility-types'
import { GoebbelsConfig, goebbelsDefaultConfig } from './goebbels.config'
import { Redactor } from './redactor'
import { StringRedactor } from './redactors/string-redactor'
import { NumberRedactor } from './redactors/number-redactor'
import { ErrorRedactor } from './redactors/error-redactor'

type GoebbelsResult<T> =
  | T
  | {
      error: Error
      message: string
    }

export class Goebbels extends GoebbelsCore {
  private readonly defaultConfig: GoebbelsConfig = goebbelsDefaultConfig
  private readonly config: GoebbelsConfig
  private readonly stringRedactor: StringRedactor
  private readonly numberRedactor: NumberRedactor
  private readonly errorRedactor: ErrorRedactor

  constructor(config: DeepPartial<GoebbelsConfig>) {
    super(new TypeGuard())
    const validConfig = this.defaultConfig // Change later - it should merge default and passed config
    this.config = validConfig

    this.stringRedactor = new StringRedactor(
      validConfig.mask,
      validConfig.detection.text,
    )
    this.numberRedactor = new NumberRedactor(
      validConfig.mask,
      validConfig.detection.number,
    )
    this.errorRedactor = new ErrorRedactor(
      validConfig.mask,
      validConfig.detection.error.name,
      validConfig.detection.error.message,
      validConfig.detection.error.stack,
    )
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
      if (this.typeGuard.isArray(value)) {
        return value.map((singleValue) => this.redact(singleValue))
      }
      if (this.typeGuard.isError(value)) {
        return this.errorRedactor.redact(value)
      }
    } catch (error) {}
  }
}
