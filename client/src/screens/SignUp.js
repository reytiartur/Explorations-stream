import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { createUserData, createUserWithEmail, setCurrentUser } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../utils/userReducer'
import { useDispatch } from 'react-redux'

const SignUp = () => {

    const defaultFields = {
        email: '',
        userLogin: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFields)
    const { email, userLogin, password, confirmPassword } = formFields;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const resetFormField = () => {
        setFormFields(defaultFields);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        
        if(password !== confirmPassword) {
            alert('Passwords do not match!')
            return;
        }

        try {
            const { user } = await createUserWithEmail(email, password)
            await createUserData(user, { userLogin: userLogin })
            await setCurrentUser((currentUser) => dispatch(setUser(currentUser)))
            navigate('/')
        } catch {
            resetFormField()
        }
    }

  return (
    <div className='mt-52 md:mt-60'>
        <div className='text-gray-200 text-center text-xl'>
            <p>Create your account</p>
            <p>and try our services for</p>
            <p className='text-primary font-mono text-2xl font-bold'>FREE</p>
        </div>
        <form onSubmit={handleSignUp} className='w-80 mx-auto my-2 flex flex-col items-center md:w-96'>
          <Input label='Email' type='email' onChange={handleChange} value={email} name='email' required />
          <Input label='User Login' type='text' onChange={handleChange} value={userLogin} name='userLogin' required />
          <Input label='Password' type='password' onChange={handleChange} value={password} name='password' required />
          <Input label='Confirm Password' type='password' onChange={handleChange} value={confirmPassword} name='confirmPassword' required />
          <Button type='submit' text='Sign Up &#x1F892;' buttonType='primary' />
        </form>
        <div className='text-gray-200 flex justify-center items-center gap-2 text-lg'>
            <p>Already have an account?</p>
            <p className='underline underline-offset-2 text-primary md:text-gray-200 cursor-pointer hover:text-primary hover:no-underline' onClick={() => navigate('/')}>Log in.</p>
        </div>
    </div>
  )
}

export default SignUp