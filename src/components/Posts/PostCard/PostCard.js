import { useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

import IconButton from "@material-ui/core/IconButton";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";

import CommentButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";
import { AuthContext } from "../../../contexts/auth";

export default function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
    const history = useHistory();
    const { user } = useContext(AuthContext);
    const openComments = () => history.push(`/posts/${id}/#comments`);

    return (
        <div className="flex flex-col items-center shadow w-full rounded-lg">
            <div className="text-center w-full p-4">
                <div className="grid grid-cols-3 w-full text-secondary">
                    <div></div>
                    <div className="rounded-full">
                        <IconButton
                            size="small"
                            className="focus:outline-none"
                            onClick={() => history.push(`/users/${username}`)}
                        >
                            <FaceTwoToneIcon fontSize="large" className="text-secondary" />
                        </IconButton>
                    </div>
                    <div className="place-self-end">
                        {user && username === user.username && <DeleteButton postId={id} />}
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
                <CommentButton handleOnClick={openComments} commentCount={commentCount} />
            </div>
        </div>
    );
}
