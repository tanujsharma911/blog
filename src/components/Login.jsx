import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { login as authLogin } from '../store/authSlice'
import Input from './Input'
import { useDispatch } from 'react-redux'
import { authSlice } from '../store/authSlice'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    return (
        <div>Login</div>
    )
}

export default Login