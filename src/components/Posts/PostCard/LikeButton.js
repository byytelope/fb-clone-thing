import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

import { LIKE_POST_MUTATION } from "../../../utils/graphql";

export default function LikeButton({ user, post: { id, likeCount, likes } }) {
    const history = useHistory();
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, { variables: { postId: id } });

    const handleLike = () => {
        if (user) {
            likePost();
        } else {
            history.push("/login");
        }
    };

    const likeIcon = user ? (
        liked ? (
            <FavoriteTwoToneIcon />
        ) : (
            <FavoriteBorderIcon />
        )
    ) : (
        <FavoriteBorderIcon />
    );

    return (
        <div className="flex w-full h-full justify-center p-2">
            <Button color="secondary" onClick={handleLike} className="w-full focus:outline-none">
                <div className="py-4">{likeIcon}</div>
                <div className="px-4 text-center">{likeCount}</div>
            </Button>
        </div>
    );
}
