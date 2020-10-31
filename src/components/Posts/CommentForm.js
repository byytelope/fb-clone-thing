import { useState } from "react";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { CREATE_COMMENT_MUTATION } from "../../utils/graphql";

export default function CommentForm({ postId }) {
    const [comment, setComment] = useState("");

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment("");
        },
        variables: {
            postId,
            body: comment,
        },
    });

    return (
        <form
            noValidate
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full justify-center"
        >
            <TextField
                label="Make a new comment"
                name="comment"
                value={comment}
                variant="outlined"
                color="secondary"
                onChange={(e) => setComment(e.target.value)}
                fullWidth
                multiline
            />
            <div className="flex h-14 w-full justify-center md:w-auto md:justify-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="focus:outline-none"
                    size="large"
                    fullWidth
                    disabled={comment.trim() === ""}
                    onClick={createComment}
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
