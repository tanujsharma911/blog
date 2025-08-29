import { useSelector } from "react-redux"
import { Link, NavLink } from "react-router";

function Header() {
    // let location = useLocation();
    const authStatus = useSelector(state => state.auth.status);

    const navItems = [
        {
            name: 'Blogs',
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
                    <ul className="flex flex-col gap-1 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <NavLink className={({ isActive }) => `block py-2 px-3 text-black cursor-pointer rounded-sm ${isActive ? "font-extrabold" : ""} text-black dark:text-white hover:bg-gray-100 transition-all duration-100 ease-in-out  dark:hover:bg-gray-700`} to={item.slug}>
                                        {item.name}
                                    </NavLink>
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