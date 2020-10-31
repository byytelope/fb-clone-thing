import Button from "@material-ui/core/Button";

import CommentTwoToneIcon from "@material-ui/icons/CommentTwoTone";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";

export default function LikeButton({ handleOnClick, commentCount }) {
    return (
        <div className="flex w-full h-full justify-center p-2">
            <Button color="secondary" onClick={handleOnClick} className="w-full focus:outline-none">
                <div className="py-4">
                    {commentCount > 0 ? <CommentTwoToneIcon /> : <ModeCommentOutlinedIcon />}
                </div>
                <div className="px-4 text-center">{commentCount}</div>
            </Button>
        </div>
    );
}
