import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router";

import LogoutBtn from "../logoutBtn"

function Header() {
    // let location = useLocation();
    const authStatus = useSelector(state => state.auth.status);

    const navigate = useNavigate();
    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: 'Create Article',
            slug: '/create-article',
            active: authStatus
        },
        {
            name: 'Account',
            slug: '/account',
            active: authStatus
        },
        {
            name: 'Your Blogs',
            slug: '/account/blogs',
            active: authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        }
    ];

    return (
        <header className="sticky top-0 left-0 bg-white border-b-2 border-gray-100 dark:bg-gray-900">
            <nav className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 text-2xl font-bold rtl:space-x-reverse">Blog</Link>

                {/* Links */}
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button className="block py-2 px-3 text-black cursor-pointer rounded-sm hover:bg-gray-100 transition-colors duration-100 ease-in-out dark:text-white dark:hover:bg-gray-700" aria-current="page"
                                        onClick={() => navigate(item.slug)}
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                    </ul>
                </div>
            </nav>
        </header>

    )
}

export default Header