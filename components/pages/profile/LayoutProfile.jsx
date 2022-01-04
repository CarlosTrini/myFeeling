import { useContext, useEffect } from "react";
import Layout from "../Layout";
import NavbarProfile from "./NavbarProfile";

export default function LayoutProfile({children}) {

  return (
    <Layout>
      <div className='top-margin ' >
        <main className='container'>
        <NavbarProfile />
        {children}
        </main>
      </div>
    </Layout>
  )
}