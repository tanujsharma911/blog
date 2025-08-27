import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Select from "../Select";
import RTE from '../RTE'
import appwriteService from '../../appwrite/conf'
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control } = useForm({
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active',
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        if (post) { // Update article
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {  // Create article

            const dbPost = await appwriteService.createPost({
                ...data,
                userId: userData.$id,
                createdBy: userData.name || userData.email,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }

        return '';
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }));
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-full">
                <input className="w-full text-4xl font-bold mb-4 focus-within:ring-0 focus:ring-0 focus:ring-offset-0 focus:outline-0"
                    placeholder="Title"
                    maxLength={36}
                    defaultValue={post?.title ? post.title : ''}
                    {...register("title", { required: true })}
                />
                <div className="flex">
                    <label htmlFor="slug" className="font-mono">/post/</label>
                    <input className="font-mono mb-4 focus-within:ring-0 focus:ring-0 focus:ring-offset-0 focus:outline-0"
                        placeholder="url"
                        id="slug"
                        defaultValue={post?.$id ? post.$id : ''}
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                        disabled
                    />
                </div>
                <RTE label="" name="content" control={control} defaultValue={post ? post?.content : ''} className="w-full" />

                <Select className=""
                    options={["active", "inactive"]}
                    label="Visible"
                    defaultValue={post?.status ? post?.status : 'active'}
                    {...register("status", { required: true })}
                />
                <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    )
}

export default PostForm