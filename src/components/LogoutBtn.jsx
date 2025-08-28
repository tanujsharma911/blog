import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { logout } from "../store/authSlice"

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        const response = authService.logout()
            .then(() => dispatch(logout()));

        console.log(response);

    }

    return <button type="button" onClick={() => logoutHandler()} className="text-gray-900 bg-white border border-gray-300 cursor-pointer focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Logout</button>
}

export default LogoutBtn