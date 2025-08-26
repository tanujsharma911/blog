import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/conf";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post);
                        console.log("Post found", post);
                    }
                    else {
                        console.log("No post found", post);
                        navigate("/");
                    }
                });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.thumbnail);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img className="rounded-xl"
                    src={appwriteService.getFilePreview(post.thumbnail)}
                    alt={post.title}
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="mr-3">
                                Edit
                            </button>
                        </Link>
                        <button onClick={deletePost}>
                            Delete
                        </button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </div>
    ) : null;
}