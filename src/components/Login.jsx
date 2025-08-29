import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { login as authLogin } from '../store/authSlice'
import Input from './Input'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = authService.checkAuthStatus();

                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div>
            <div className="relative flex flex-col justify-center mt-10 rounded-xl bg-transparent">
                <h1 className="block text-4xl text-center font-semibold text-slate-900">
                    Login
                </h1>
                {error && <p className="text-slate-500 font-light">
                    {error}
                </p>}
                <form onSubmit={handleSubmit(login)} className="mt-8 mx-auto mb-2 w-sm">
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="w-full max-w-sm min-w-[200px]">
                            <Input
                                label="Your Email"
                                type="email"
                                placeholder="hello@email.com"
                                required={true}
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
                                            .test(value) || "Email must be valid"
                                    }
                                })}
                            />
                        </div>

                        <div className="w-full max-w-sm min-w-[200px]">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="******"
                                required={true}
                                {...register("password", {
                                    minLength: 6,
                                    maxLength: 32
                                })}
                            />
                            {errors.password && <p className='mt-1'>Minimum 6 characters required</p>}
                        </div>
                    </div>

                    <button className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
                        Login
                    </button>
                </form>
                <p className="flex justify-center mt-6 text-sm text-slate-600">
                    Don&apos;t have an account?
                    <Link to="/signup" className="ml-1 text-sm font-semibold text-slate-700 underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login