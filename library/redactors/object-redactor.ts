import { Goebbels } from 'library/goebbels'
import { Detector, Redactor } from '../redactor'

export class ObjectRedactor extends Redactor<Record<string | number, unknown>, Record<string | number, unknown>> {
  constructor(
    private readonly mask: string,
    private readonly keyDetectors: Detector<number | string>[],
  ) {
    super()
  }

  redact(value: Record<string | number, unknown>, redactRef: Goebbels['redact']): Record<string | number, unknown> {
    const newObject: typeof value = Object.assign({}, value)
    Object.entries(value).forEach(([key, value]) => {
        newObject[key] = this.shouldBeRedactedByKey(key) ? this.mask : redactRef(value)
    })
    return newObject
  }

  private shouldBeRedactedByKey(key: string | number): boolean {
    return this.keyDetectors.some((detector) =>
      this.detectWithDetector(`${key}`, detector),
    )
  }
}
