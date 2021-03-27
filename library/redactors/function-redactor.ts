import { Detector, Redactor } from '../redactor'

export class FunctionRedactor extends Redactor<Function, Function> {
  constructor(
    private readonly mask: string,
    private readonly nameDetectors: Detector<string>[],
  ) {
    super()
  }

  redact(value: Function): Function {
    if (this.shouldBeRedactedByName(value.name)) {
      return {
        [this.mask]: (...args: unknown[]) => value(...args),
      }[this.mask]
    }
    return value
  }

  private shouldBeRedactedByName(functionName: string): boolean {
    return this.nameDetectors.some((detector) =>
      this.detectWithDetector(functionName, detector),
    )
  }
}
