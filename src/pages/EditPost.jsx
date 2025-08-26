import { useEffect, useState } from 'react'
import { PostForm } from '../components'
import appwriteServices from '../appwrite/conf'
import { useParams, useNavigate } from 'react-router';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        appwriteServices.getPost(slug).then((post) => {
            if (post) {
                setPost(post);
            }
            else {
                navigate('/');
            }
        });
    }, [slug, navigate]);

    return post ? (
        <div>
            <PostForm post={post} />
        </div>
    ) : null;
}

export default EditPost