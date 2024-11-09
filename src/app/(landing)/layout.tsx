import { ReactNode } from "react"
import { Navbar } from "@/components/navbar"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  )
}

export default Layout
