import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/conf";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
// import { UserRound } from 'lucide-react';

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
                navigate("/");
            }
        });
    };


    return post ? (
        <div className="">
            <div className="w-full mb-6">
                <h1 className="text-5xl font-bold">{post.title}</h1>
                <p className="mt-2 ml-2">Created By {post.createdBy}</p>
            </div>
            <div className="browser-css" id="blog_content">
                {parse(post.content)}
            </div>
            {isAuthor && (
                <div className="mt-20">
                    <Link to={`/edit-post/${post.$id}`}>
                        <button type="button" className="cursor-pointer py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white">
                            Edit
                        </button>
                    </Link>
                    <button onClick={deletePost} className="ml-5 py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-100 text-red-800 hover:bg-red-200 focus:outline-hidden focus:bg-red-200 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:bg-red-800/30 dark:hover:bg-red-800/20 dark:focus:bg-red-800/20">
                        Delete
                    </button>
                </div>
            )}
        </div>
    ) : null;
}