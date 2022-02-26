import CookieModal from 'src/components/CookieModal'
import SidebarWithHeader from 'src/components/SidebarWithHeader'
import { Fragment } from 'react'
const Standard = ({ children, isAuthenticated, currentUser }) => {
  //const { isAuthenticated, currentUser } = useAuth()
  const brand = 'news.jace.pro'
  let myProps = {
    brand,
    isAuthenticated,
    currentUser,
  }
  return (
    <Fragment>
      <CookieModal />
      <SidebarWithHeader {...myProps}>{children}</SidebarWithHeader>
    </Fragment>
  )
}

export default Standard
