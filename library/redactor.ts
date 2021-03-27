import { RedactorCore } from './redactor-core'
import { TypeGuard } from './type-guard'

export class Redactor extends RedactorCore {
  constructor() {
    super(new TypeGuard())
  }
}
