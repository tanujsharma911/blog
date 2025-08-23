import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import Select from "../Select";
import appwriteService from '../../appwrite/conf'
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValue } = useForm({
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active',
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.thumbnail);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                thumbnail: file ? file.$id : undefined
            })
            if(dbPost){
                navigate('/');
            }
        }
    }

    return (
        <div>PostForm</div>
    )
}

export default PostForm