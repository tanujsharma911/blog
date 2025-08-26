import appwriteService from '../appwrite/conf'
import { PostCard } from '../components'
import { useState, useEffect } from 'react'

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts)
            }
        });
    }, [])
    
    return (
        <div className='flex flex-wrap'>
            {
                posts.map((post) => (
                    <PostCard key={post.$id} post={post} />
                ))
            }
        </div>
    )
}

export default AllPost