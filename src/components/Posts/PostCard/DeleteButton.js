import { useState } from "react";
import { useMutation } from "@apollo/client";

import Button from "@material-ui/core/Button";
import DeleteSweepTwoToneIcon from "@material-ui/icons/DeleteSweepTwoTone";

import DeletePostDialog from "../DeletePostDialog";
import {
    DELETE_COMMENT_MUTATION,
    DELETE_POST_MUTATION,
    FETCH_POSTS_QUERY,
} from "../../../utils/graphql";

export default function DeleteButton({ postId, commentId, callback }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deleteAction] = useMutation(mutation, {
        update(proxy) {
            setOpen(false);
            if (!commentId) {
                const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
                const newPosts = data.getPosts.filter((post) => post.id !== postId);
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: [...newPosts] } });
            }
            if (callback) callback();
        },
        variables: {
            postId,
            commentId,
        },
    });

    return (
        <div>
            <Button
                className="focus:outline-none"
                variant="contained"
                color="secondary"
                onClick={handleOpen}
            >
                <DeleteSweepTwoToneIcon />
            </Button>
            <DeletePostDialog
                open={open}
                handleClose={handleClose}
                handleConfirm={deleteAction}
                isComment={commentId ? true : false}
            />
        </div>
    );
}
