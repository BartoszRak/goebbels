import { GoebbelsCore } from './goebbels-core'
import { TypeGuard } from './type-guard'
import { DeepPartial } from 'utility-types'
import { GoebbelsConfig, goebbelsDefaultConfig } from './goebbels.config'
import { Redactor } from './redactor'
import { StringRedactor } from './redactors/string-redactor'
import { NumberRedactor } from './redactors/number-redactor'

type GoebbelsResult<T> =
  | T
  | {
      error: Error
      message: string
    }

export class Goebbels extends GoebbelsCore {
  private readonly defaultConfig: GoebbelsConfig = goebbelsDefaultConfig
  private readonly config: GoebbelsConfig
  private readonly stringRedactor: Redactor<string>
  private readonly numberRedactor: Redactor<number>


  constructor(config: DeepPartial<GoebbelsConfig>) {
    super(new TypeGuard())
    this.config = this.defaultConfig // Change later

    this.stringRedactor = new StringRedactor(this.config.mask, this.config.detection.text)
    this.numberRedactor = new NumberRedactor(this.config.mask, this.config.detection.number)
  }

  redact(value: unknown): GoebbelsResult<unknown> {
    try {
      // Primitive values
      if (this.typeGuard.isString(value)) {
        return this.stringRedactor.redact(value)
      }
      if(this.typeGuard.isNumber(value)) {
        return this.numberRedactor.redact(value)
      }
      // Non-primitive values
    } catch (error) {}
  }
}
