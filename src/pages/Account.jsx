
import LogoutBtn from '../components/LogoutBtn.jsx'
import { useSelector } from 'react-redux';
import AllPost from './AllPosts.jsx';

function Account() {
  const userData = useSelector(state => state.auth.userData);

  return (
    <>
      <div className='mt-10 flex items-center justify-between border border-gray-200 rounded-lg p-5 w-full'>
        <div className="shrink-0 group block">
          <div className="flex items-center">

            <span className="inline-flex items-center justify-center size-15.5 rounded-full bg-gray-500 text-lg font-semibold text-white">
              {userData?.name.slice(0, 1).toUpperCase()}
            </span>
            <div className="ms-3">
              <h3 className="font-semibold text-gray-800 dark:text-white">{userData?.name}</h3>
              <p className="text-sm font-medium text-gray-400 dark:text-neutral-500">{userData?.email}</p>
            </div>
          </div>
        </div>
        <div className=''>
          <LogoutBtn />
        </div>
      </div>
      <div className='mt-10'>
        <h2 className="text-2xl mb-5 font-semibold text-gray-800 dark:text-white">Your Posts</h2>
        <AllPost />
      </div>
    </>
  )
}

export default Account