import { Link } from 'react'
import appwriteService from '../appwrite/conf'

function PostCard({ $id, thumbnail, title, content }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <img className="w-full h-auto rounded-t-xl" src={appwriteService.getFilePreview(thumbnail)} alt={title} />
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-neutral-400">
                        {content.length > 60 ? content.slice(0, 60) : content}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default PostCard