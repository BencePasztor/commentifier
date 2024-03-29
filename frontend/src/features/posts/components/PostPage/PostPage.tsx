import PostHeader from "./PostHeader/PostHeader"
import type { PostWithComments } from "../../types"

const PostPage = ({ /*id,*/ title, description, imageSource, sourceUrl, /*_count, createdAt, comment*/ }: PostWithComments) => {
    return (
        <>
            <PostHeader {...{ title, description, imageSource, sourceUrl }} />
            {/* TODO: Comments */}
        </>
    )
}

export default PostPage