import { Link } from 'react-router'
import appwriteService from '../appwrite/conf'

function PostCard({ $id, thumbnail, title }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <img className="w-full h-auto rounded-t-xl" src={appwriteService.getFilePreview(thumbnail)} alt={title} />
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        {title}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

export default PostCard