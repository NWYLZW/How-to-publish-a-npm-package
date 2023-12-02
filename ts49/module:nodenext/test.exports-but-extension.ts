import { foo } from '@yje/how-to-publish-a-typescript-package.exports-but-extension'
import { bar } from '@yje/how-to-publish-a-typescript-package.exports-but-extension/sub'

const t0 = foo()
//    ^?

const t1 = bar()
//    ^?
