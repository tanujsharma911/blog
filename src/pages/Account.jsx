
import LogoutBtn from '../components/LogoutBtn.jsx'
import { useSelector } from 'react-redux';

function Account() {
  const userData = useSelector(state => state.auth.userData);

  return (
    <div className='mt-10 flex flex-col'>
      <div>
        name: {userData?.name}
      </div>
      <div className='mt-10'>
        <LogoutBtn />
      </div>
    </div>
  )
}

export default Account