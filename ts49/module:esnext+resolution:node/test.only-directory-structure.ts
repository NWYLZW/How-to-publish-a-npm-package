import { foo } from '@yje/how-to-publish-a-typescript-package.only-directory-structure'
import { bar } from '@yje/how-to-publish-a-typescript-package.only-directory-structure/sub'

const t0 = foo()
//    ^?

const t1 = bar()
//    ^?
