import { isArray, isObject } from './types'

export const deepMerge = <T>(
  base: any,
  addition: any,
  mergeArrays = false,
): T => {
  const newObject = { ...base }
  Object.entries(addition).forEach(([key, value]) => {
    if (!newObject[key]) {
      newObject[key] = value
    } else {
      const actualValue = newObject[key]
      if (isObject(actualValue) && isObject(value)) {
        newObject[key] = deepMerge(actualValue, value)
        return
      }
      if (isArray(actualValue) && isArray(value) && mergeArrays) {
        newObject[key] = [...actualValue, ...value]
        return
      }
      newObject[key] = value
    }
  })
  return newObject as unknown as T
}
