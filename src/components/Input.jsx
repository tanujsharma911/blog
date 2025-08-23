import { forwardRef, useId } from 'react'

const Input = forwardRef(function Input({
    label, type = "text", placeholder, ...rest
}, ref) {

    const id = useId();

    return (
        <>
            <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type={type}
                id={id}
                placeholder={placeholder}
                ref={ref}
                {...rest}
            />
        </>
    )
});

export default Input