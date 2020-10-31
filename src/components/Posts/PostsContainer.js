import { useQuery } from "@apollo/client";
import Fade from "@material-ui/core/Fade";

import PostCard from "./PostCard/PostCard";
import { FETCH_POSTS_QUERY } from "../../utils/graphql";

export default function PostsContainer() {
    const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 p-8">
            {loading ? (
                <div>Loading...</div>
            ) : (
                posts &&
                posts.map((post) => (
                    <Fade in={true} key={post.id}>
                        <div>
                            <PostCard post={post} />
                        </div>
                    </Fade>
                ))
            )}
        </div>
    );
}
