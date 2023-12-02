import { foo } from '@yje/how-to-publish-a-typescript-package.support-by-typesversions'
import { bar } from '@yje/how-to-publish-a-typescript-package.support-by-typesversions/sub'

const t0 = foo()
//    ^?

const t1 = bar()
//    ^?
