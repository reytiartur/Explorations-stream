import React, { useState } from 'react'
import { logInWithEmail, setCurrentUser, resetPassword } from '../utils/firebase'
import Input from '../components/Input'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../utils/userReducer'
import { useDispatch } from 'react-redux'

const SignIn = () => {

  const defaultFields = {
    email: '',
    password: '',
  }

  const [formFields, setFormFields] = useState(defaultFields)
  const { email, password } = formFields;

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({...formFields, [name]: value})
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { user } = await logInWithEmail(email, password)
    await setCurrentUser((currentUser) => dispatch(setUser(currentUser)))
  }

  const handlePasswordReset = async () => {
    if(!email) {
      alert('Email form is empty.')
      return;
    };

    resetPassword(email)
  }

  return (
    <div className='mt-52 md:mt-60'>
      <div className='text-gray-200 text-center text-xl'>
            <p>Sign into</p>
            <p>your account.</p>
        </div>
        <form onSubmit={handleLogin} className="w-80 mx-auto my-2 flex flex-col items-center md:w-96">
          <Input label='Email' type='email' onChange={handleChange} value={email} name='email' required  />
          <Input label='Password' type='password' onChange={handleChange} value={password} name='password' required />
          <Button type='submit' text='Sign In &#x1F892;' buttonType='primary' />
        </form>
        <div className='text-gray-200 flex justify-center items-center gap-2 text-lg'>
            <p>Forgot password?</p>
            <p className='underline underline-offset-2 text-primary md:text-gray-200 cursor-pointer hover:text-primary hover:no-underline' onClick={handlePasswordReset}>Reset password.</p>
        </div>
        <div className='text-gray-200 flex justify-center items-center gap-2 text-lg'>
            <p>Have no account?</p>
            <p className='underline underline-offset-2 text-primary md:text-gray-200 cursor-pointer hover:text-primary hover:no-underline' onClick={() => navigate('/signup')}>Sign up.</p>
        </div>
    </div>
  )
}

export default SignIn