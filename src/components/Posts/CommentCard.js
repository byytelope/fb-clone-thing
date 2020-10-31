import { useHistory } from "react-router-dom";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";

import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";

import DeleteButton from "./PostCard/DeleteButton";

export default function CommentCard({ comments, postId, user }) {
    const history = useHistory();
    const CommentCards = comments.map((comment) => (
        <div className="pb-4" key={comment.id}>
            <div className="flex flex-col shadow w-full md:rounded-lg p-2">
                <div className="px-2 md:px-1">
                    <div className="flex justify-between w-full">
                        <div className="flex pb-1">
                            <div className="flex items-start">
                                <IconButton
                                    size="small"
                                    className="focus:outline-none"
                                    onClick={() => history.push(`/users/${comment.username}`)}
                                >
                                    <FaceTwoToneIcon className="text-secondary" />
                                </IconButton>
                            </div>
                            <div className="flex flex-col px-1">
                                <div className="font-bold mt-1 text-sm text-secondary">
                                    {comment.username}
                                </div>
                                <div className="text-xs text-primary">
                                    {moment(comment.createdAt).fromNow()}
                                </div>
                            </div>
                        </div>
                        {user && user.username === comment.username && (
                            <DeleteButton postId={postId} commentId={comment.id} />
                        )}
                    </div>
                    <div className="flex py-2 px-8">
                        <div className="text-secondary text-sm">{comment.body}</div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return <div>{CommentCards}</div>;
}
