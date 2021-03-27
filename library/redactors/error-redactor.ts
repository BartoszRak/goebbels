import { Detector, Redactor } from '../redactor'

export class ErrorRedactor extends Redactor<Error, Error> {
  constructor(
    private readonly mask: string,
    private readonly nameDetectors: Detector<string>[],
    private readonly messageDetectors: Detector<string>[],
    private readonly stackDetectors: Detector<string>[],
  ) {
    super()
  }

  redact(value: Error): Error {
    const newError = new Error()
    newError.name = this.shouldBeRedacted(value.name, this.nameDetectors)
      ? this.mask
      : value.name
    newError.message = this.shouldBeRedacted(
      value.message,
      this.messageDetectors,
    )
      ? this.mask
      : value.message
    if (value.stack) {
      newError.stack = this.shouldBeRedacted(value.stack, this.stackDetectors)
        ? this.mask
        : value.stack
    }
    return newError
  }

  private shouldBeRedacted(
    value: string,
    detectors: Detector<string>[],
  ): boolean {
    return detectors.some((detector) =>
      this.detectWithDetector(value, detector),
    )
  }
}
