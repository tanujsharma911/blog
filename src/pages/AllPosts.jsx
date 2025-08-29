import appwriteServices from '../appwrite/conf'
import { PostCard } from '../components'
import { useState, useEffect } from 'react'
import { Query } from "appwrite";
import { useSelector } from 'react-redux';

function AllPost() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)
    const userData = useSelector(state => state.auth.userData);

    useEffect(() => {

        if (userData) {
            appwriteServices.getPosts([Query.equal('userId', userData.$id)])
                .then((posts) => {
                    if (posts.documents) {
                        setPosts(posts.documents);
                    }
                    setLoading(false);
                });
        }

    }, [userData]);

    return loading ? (
        <div className='text-center mt-10'>Loading...</div>
    ) : posts.length ? (
        <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

            {posts.map((post) => (
                <PostCard key={post.$id} {...post} />

            ))}
        </div>
    ) : (
        <div className='mt-20 w-fit mx-auto'>No Posts</div>
    )
}

export default AllPost