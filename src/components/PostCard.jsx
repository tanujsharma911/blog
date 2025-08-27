import { Link } from 'react-router'

function PostCard({ $id, title, createdBy }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="p-4 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {title}
                </h3>
                <p>By {createdBy}</p>
            </div>
        </Link>
    )
}

export default PostCard