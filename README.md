# Goebbels
![Goebbels version](https://img.shields.io/npm/v/goebbels)
![Goebbels license](https://img.shields.io/npm/l/goebbels)
![Goebbels downloads per month](https://img.shields.io/npm/dt/goebbels)

## For what?
For censuring sensitive informations in your data that will be passed somewhere where sensitive informations are not welcome (for example logs sent to some cloud logging provider).

## Why this one redactor is better than others?
- Highly customizable
- 0 external dependencies (easy to verify, no dependency-chain malware injection)
- 

## Installation
`yarn add goebbels`
or
`npm install goebbels`
**Declarations/types are included in this package*

## Usage

### Usage instruction
 1. ### Create an Goebbels instance
    With [default configuration](./library/goebbels-config.ts):
    ```ts
    import { Goebbels } from 'goebbels'
    
    const myGoebbels = new Goebbels()
    ```
    With your own configuration:
    ```ts
    import { Goebbels } from 'goebbels'
    
    const myGoebbels = new Goebbels({
        depth: 10,
        // ...rest of the config that you want to override
    })
    ```

2. ### Pass data to Goebbels.redact() to redact them
    ```ts
    import { Goebbels } from 'goebbels'
    
    const myGoebbels = new Goebbels()
    
    // Pass data - string is only example
    myGoebbels.redact('My welcoming text.') 
    ```

### Redacting different types of data
#### `string`
```ts
import { Goebbels } from 'goebbels'
    
const myGoebbels = new Goebbels()

myGoebbels.redact('My welcome text.')
```
Redacted output:
```
My welcome text
```
Unredacted output:
```
**MASKED_DATA**
```

#### `number`
```ts
import { Goebbels } from 'goebbels'
    
const myGoebbels = new Goebbels()

myGoebbels.redact(6123)
```
Redacted output:
```
6123
```
Unredacted output:
```
**MASKED_DATA**
```

#### `Error`
```ts
import { Goebbels } from 'goebbels'
    
const myGoebbels = new Goebbels()

const error = new Error('Sensitive message')
error.name = 'Sensitive name'
error.stack = 'Sensitive stack'
myGoebbels.redact(error)
```
Redacted output:
```
Error {
    name: 'Sensitive name',
    message: 'Sensitive message',
    stack: 'Sensitive stack',
}
```
Unredacted output:
```
Error {
    name: '**MASKED_DATA**',
    message: '**MASKED_DATA**',
    stack: '**MASKED_DATA**',
}
```

#### `Function`
```ts
import { Goebbels } from 'goebbels'
    
const myGoebbels = new Goebbels()

const sensitiveFunctionName = () => {
    // Some code...
}
myGoebbels.redact(sensitiveFunctionName)
```
Redacted output:
```
Function {
    name: '**MASKED_DATA**'
}
```
Unredacted output:
```
Function {
    name: 'sensitiveFunctionName'
}
```
#### Object
```ts
import { Goebbels } from 'goebbels'
    
const myGoebbels = new Goebbels()

myGoebbels.redact({
    name: 'John',
    email: 'not-existing-john-email@email.com'
})
```
Redacted output:
```
Object {
    name: 'John',
    email: '**MASKED_DATA**'
}
```
Unredacted output:
```
Object {
    name: 'John',
    email: 'not-existing-john-email@email.com'
}
```

#### `Array`
```ts
import { Goebbels } from 'goebbels'
    
const myGoebbels = new Goebbels()

myGoebbels.redact([
    'My text.',
     'My different text',
    1234,
    {
        name: 'John',
        email: 'not-existing-john-email@email.com'
    }
])
```
Redacted output:
```
Array [
    '**MASKED_DATA**',
    'My different text',
    1234,
    {
        name: 'John',
        email: '**MASKED_DATA**'
    }
]
```
Unredacted output:
```
Array [
    'My text.',
     'My different text',
    1234,
    {
        name: 'John',
        email: 'not-existing-john-email@email.com'
    }
]
```
## License
License: `MIT`
Author: `Bartosz Rak`
