export type Detector<T> = RegExp | ((value: T) => boolean)

export abstract class Redactor<T, V> {
  abstract redact(value: T): V

  protected detectWithDetector<R>(value: R, detector: Detector<R>): boolean {
    if (this.isDetectorRegExp(detector)) {
      return detector.test(`${value}`)
    }
    return detector(value)
  }

  private isDetectorRegExp<R>(detector: Detector<R>): detector is RegExp {
    return typeof detector === 'object'
  }
}
