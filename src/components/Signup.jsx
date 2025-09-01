import { useState } from 'react'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { Link, useNavigate } from 'react-router'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
// import { stringify } from 'postcss'

function Signup() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);

            if (userData) {
                const res = await authService.checkAuthStatus();

                if (res) dispatch(login(res));
                navigate("/");
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="relative flex flex-col rounded-xl bg-transparent">
                <h1 className="block text-4xl text-center font-semibold text-slate-900">
                    Sign Up
                </h1>
                {error && <p className="text-slate-500 font-light"> {error} </p>}

                <form onSubmit={handleSubmit(create)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="w-full max-w-sm min-w-[200px]">
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="Your Full Name"
                                {...register("name", { required: "Please type your name" })}
                                error={errors}
                            />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <Input
                                label="Your Email"
                                type="email"
                                placeholder="name@email.com"
                                {...register("email", {
                                    required: "Please enter your email",
                                    validate: {
                                        matchPattern: (value) => /^([\w.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/
                                            .test(value) || "Email must be valid"
                                    }
                                })}
                                error={errors}
                            />
                        </div>
                        <div className="w-full max-w-sm min-w-[200px]">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="******"
                                {...register("password", {
                                    required: "Password is Required",
                                    minLength: 6,
                                    maxLength: 32
                                })}
                                error={errors}
                            />
                            {/* {errors.password && <p>{errors.password?.message}</p>} */}
                        </div>
                    </div>

                    <button className="mt-4 w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">
                        Sign Up
                    </button>
                </form>
                <p className="flex justify-center mt-6 text-sm text-slate-600">
                    Already have a account?
                    <Link to="/login" className="ml-1 text-sm font-semibold text-slate-700 underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup