import { useContext } from "react";

import PostsContainer from "../components/Posts/PostsContainer";
import PostForm from "../components/Posts/PostForm";
import { AuthContext } from "../contexts/auth";

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <div className="m-auto py-8">
                <div className="text-3xl font-bold text-center text-secondary">Recent Posts</div>
            </div>
            {user && (
                <div className="px-8">
                    <PostForm />
                </div>
            )}
            <PostsContainer />
        </div>
    );
}
