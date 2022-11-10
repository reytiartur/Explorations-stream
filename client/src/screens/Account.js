import React, { useEffect } from 'react'
import Button from '../components/Button'
import Subscriptions from '../components/Subscriptions'
import { logOut } from '../utils/firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Account = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    const handleLogout = async () => {
        await logOut()
        navigate('/')
    }

  return (
    <div className='mt-16 px-4 sm:px-8 md:w-[600px] md:px-0 md:mx-auto md:mt-32'>
        <div className="flex flex-col items-center mb-2">
            <p className='text-xl font-bold'>{user.userLogin}</p>
            <p className='pt-2'>{user.email}</p>
        </div>
        <Subscriptions />
        <div className="flex justify-center mt-6">
            <Button onClick={handleLogout} buttonType='secondary' text="LOGOUT" />
        </div>
    </div>
  )
}

export default Account