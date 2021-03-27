export type Detector<T> = RegExp | ((value: T) => boolean)

export abstract class Redactor<T> {
  abstract redact(value: T): T | string

  protected detectWithDetector(value: T, detector: Detector<T>): boolean {
    if (this.isDetectorRegExp(detector)) {
      return detector.test(`${value}`)
    }
    return detector(value)
  }

  private isDetectorRegExp(detector: Detector<T>): detector is RegExp {
    return typeof detector === 'object'
  }
}
