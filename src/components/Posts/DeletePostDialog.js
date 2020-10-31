import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeletePostDialog({ open, handleClose, handleConfirm, isComment }) {
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>{isComment ? "Delete comment?" : "Delete post?"}</DialogTitle>
            <DialogActions>
                <div className="space-x-2 text-secondary">
                    <Button color="secondary" onClick={handleConfirm}>
                        Yes
                    </Button>
                    <Button color="secondary" onClick={handleClose} autoFocus>
                        No
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    );
}
