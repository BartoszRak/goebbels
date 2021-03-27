import { TypeGuard } from './type-guard'

export class GoebbelsCore {
  protected constructor(protected readonly typeGuard: TypeGuard) {}
}
