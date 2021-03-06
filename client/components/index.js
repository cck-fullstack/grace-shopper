/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AddUser} from './createUser'
export {default as UserPage} from './userPage'
export {default as Cart} from './cart'
export {default as SingleItem} from './single-item'
export {default as Items} from './all-items'
export {default as OrderHistory} from './order-history'
export {default as Checkout} from './checkout'
export {default as AdminPage} from './admin-page'
export {default as Category} from './category'
export {default as Footer} from './footer'
