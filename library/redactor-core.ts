import { TypeGuard } from './type-guard'

export class RedactorCore {
  protected constructor(private readonly typeGuard: TypeGuard) {}
}
