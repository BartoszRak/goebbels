import { Detector, Redactor } from '../redactor'

export class StringRedactor extends Redactor<string, string> {
  constructor(
    private readonly mask: string,
    private readonly detectors: Detector<string>[],
  ) {
    super()
  }

  redact(value: string): string {
    return this.shouldBeRedacted(value) ? this.mask : value
  }

  private shouldBeRedacted(value: string): boolean {
    return this.detectors.some((detector) =>
      this.detectWithDetector(value, detector),
    )
  }
}
