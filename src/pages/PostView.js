import { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";

import CommentCard from "../components/Posts/CommentCard";
import CommentButton from "../components/Posts/PostCard/CommentButton";
import DeleteButton from "../components/Posts/PostCard/DeleteButton";
import LikeButton from "../components/Posts/PostCard/LikeButton";
import CommentForm from "../components/Posts/CommentForm";
import { AuthContext } from "../contexts/auth";
import { FETCH_POST_QUERY } from "../utils/graphql";

export default function PostView(props) {
    const postId = props.match.params.postId;
    const history = useHistory();
    const { hash } = useLocation();
    const { user } = useContext(AuthContext);

    // TODO: Make auto scroll to comments consistent.
    useEffect(() => {
        if (hash !== "") {
            const id = hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: "smooth" });
        }
    }, [hash]);

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        },
    });

    function scrollToComments() {
        const element = document.getElementById("comments");
        element.scrollIntoView({ behavior: "smooth" });
    }

    const deletePostCallback = () => history.push("/");

    let postMarkup;
    if (!getPost) {
        postMarkup = <div>Loading post...</div>;
    } else {
        const { id, body, createdAt, username, comments, commentCount, likes, likeCount } = getPost;

        postMarkup = (
            <div>
                <div className="md:px-32 xl:px-96 pb-2 md:pt-8">
                    <div className="flex flex-col items-center shadow w-full md:rounded-lg">
                        <div className="text-center w-full p-4">
                            <div className="grid grid-cols-3 w-full text-secondary">
                                <div></div>
                                <div className="rounded-full">
                                    <IconButton
                                        size="small"
                                        className="focus:outline-none"
                                        onClick={() => history.push(`/users/${username}`)}
                                    >
                                        <FaceTwoToneIcon
                                            fontSize="large"
                                            className="text-secondary"
                                        />
                                    </IconButton>
                                </div>
                                <div className="h-full place-self-end">
                                    {user && username === user.username && (
                                        <DeleteButton postId={id} callback={deletePostCallback} />
                                    )}
                                </div>
                            </div>
                            <div className="font-bold text-secondary">{username}</div>
                            <a className="text-sm text-primary" href={`/posts/${id}`}>
                                {moment(createdAt).fromNow(true)}
                            </a>
                        </div>
                        <div className="pb-4 text-secondary">
                            <div>{body}</div>
                        </div>
                        <div className="grid grid-cols-2 border-t divide-x w-full place-items-center text-secondary">
                            <LikeButton user={user} post={{ id, likeCount, likes }} />
                            <CommentButton
                                handleOnClick={scrollToComments}
                                commentCount={commentCount}
                            />
                        </div>
                    </div>
                </div>
                <div className="md:px-32 xl:px-96" id="comments">
                    {user && (
                        <div className="py-4 px-4 md:px-0">
                            <CommentForm postId={id} />
                        </div>
                    )}
                    <div className="py-2">
                        <CommentCard comments={comments} user={user} postId={id} />
                    </div>
                </div>
            </div>
        );
    }

    return postMarkup;
}
