import { useContext, useEffect } from "react";

import authContext from "../../../context/authContext/authContext";
import Layout from "../Layout";
import NavbarProfile from "./NavbarProfile";

export default function LayoutProfile({ children }) {

  const { userSession } = useContext(authContext);

  return (
    <Layout>
      <div className='top-margin ' >
        <main className='container'>
          {userSession.uid && <NavbarProfile />}
          {children}
        </main>
      </div>
    </Layout>
  )
}