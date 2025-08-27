import { forwardRef, useId } from 'react';

function Select({
    label,
    options = [],
    defaultValue,
    ...props
}, ref) {

    const id = useId();

    return (
        <div className='my-5 flex items-center'>
            <label htmlFor={id} className="block mr-2 font-medium text-gray-900 dark:text-white">{label}</label>
            <select ref={ref} defaultValue={defaultValue ? defaultValue : 'active'} {...props} id={id} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-1 px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {options?.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select)