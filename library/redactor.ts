export type Detector<T> = RegExp | ((value: T) => boolean)

export abstract class Redactor<T, V> {
  abstract redact(value: T, ...restOfArgs: any[]): V

  protected detectWithDetector<R>(value: R, detector: Detector<R>): boolean {
    if (this.isDetectorRegExp(detector)) {
      const regexResult = String(value).match(detector)
      return regexResult !== null
    }
    return detector(value)
  }

  private isDetectorRegExp<R>(detector: Detector<R>): detector is RegExp {
    return typeof detector === 'object'
  }
}
