import AboutPage from 'src/pages/AboutPage'
import CookieModal from 'src/components/CookieModal'
import { useAuth } from '@redwoodjs/auth'
import SidebarWithHeader from 'src/components/SidebarWithHeader'
import Footer from 'src/components/Footer'
import { Fragment } from 'react'
const Standard = ({ children, isAuthenticated, currentUser }) => {
  //const { isAuthenticated, currentUser } = useAuth()
  const brand = 'Seedling'
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
