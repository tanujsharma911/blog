import { useEffect, useState } from 'react'
import appwriteServices from '../appwrite/conf'
import { PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteServices.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
    }, []);

    if (posts.length === 0) {
        return <div className='w-full text-center mt-10 text-gray-500'>
            No posts available, Login To see
        </div>;
    }

    return (
        <div className='max-w-screen-xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
            ))}
        </div>
    );
}

export default Home