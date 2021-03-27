import { Detector, Redactor } from '../redactor'

export class NumberRedactor extends Redactor<number> {
  constructor(
    private readonly mask: string,
    private readonly detectors: Detector<number>[],
  ) {
    super()
  }

  redact(value: number): number | string {
    return this.shouldBeRedacted(value) ? this.mask : value
  }

  private shouldBeRedacted(value: number): boolean {
    return this.detectors.some((detector) =>
      this.detectWithDetector(value, detector),
    )
  }
}
