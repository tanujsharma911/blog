import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Select from "../Select";
import RTE from '../RTE'
import appwriteService from '../../appwrite/conf'
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        title: post?.title || '',
        slug: post?.slug || '',
        content: post?.content || '',
        status: post?.status || 'active',
    });
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const submit = async (data) => {
        console.log("data", data);
        console.log("post", post);
        if (post) { // Update article
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.thumbnail);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                thumbnail: file ? file.$id : undefined
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
        else {  // Create article
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.thumbnail = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
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
            <div className="w-2/3 px-2">
                <Input className="mb-4"
                    label="Title"
                    placeholder="Title"
                    {...register("title", { required: true })}
                />
                <Input className="mb-4"
                    label="Slug"
                    placeholder="Slug"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Thumbnail"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img className="rounded-lg"
                            src={appwriteService.getFilePreview(post.thumbnail)}
                            alt={post.title}
                        />
                    </div>
                )}
                <Select className="mb-4"
                    options={["active", "inactive"]}
                    label="Status"
                    {...register("status", { required: true })}
                />
                <button type="submit" className={`w-full $`}>
                    {post ? "Update" : "Submit"}
                </button>
            </div>
        </form>
    )
}

export default PostForm