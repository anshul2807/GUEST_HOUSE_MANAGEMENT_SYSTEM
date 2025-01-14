import React, { useContext } from 'react'
import HomeConnect from './Home.connect';
import HomeDisconnect from './Home.disconnect';
import { UserContext } from '../context/UserContext';
function Home() {
    const {user}=useContext(UserContext);
    
    
  return (
    <>
    {user.isLogin? <HomeConnect /> : <HomeDisconnect/>}
    </>
  )
}

export default Home