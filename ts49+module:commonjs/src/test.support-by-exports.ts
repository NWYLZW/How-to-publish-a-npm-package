import { foo } from '@yje/how-to-publish-a-typescript-package.support-by-exports'
import { bar } from '@yje/how-to-publish-a-typescript-package.support-by-exports/sub'

const t0 = foo()
//    ^?

const t1 = bar()
//    ^?
