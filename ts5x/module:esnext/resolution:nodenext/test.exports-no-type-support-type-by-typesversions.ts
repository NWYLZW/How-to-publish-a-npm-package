import { foo } from '@yje/how-to-publish-a-typescript-package.exports-no-type-support-type-by-typesversions'
import { bar } from '@yje/how-to-publish-a-typescript-package.exports-no-type-support-type-by-typesversions/dist/sub'

const t0 = foo()
//    ^?

const t1 = bar()
//    ^?
