import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

interface propsType {
    isLoggedIn:boolean,
    setIsLoggedIn: (arg0: boolean) => void
}

const Dashboard:React.FC<propsType> = ({isLoggedIn, setIsLoggedIn}) => {
  return (
    <>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  )
}

export default Dashboard