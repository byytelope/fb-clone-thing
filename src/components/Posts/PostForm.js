import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { useForm } from "../../utils/hooks/useForm";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../../utils/graphql";

export default function PostForm() {
    const { onChange, onSubmit, formValues } = useForm(createPostCallback, { body: "" });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        update(proxy, result) {
            const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [result.data.createPost, ...data.getPosts] },
            });
            formValues.body = "";
        },
        onError() {},
        variables: formValues,
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full justify-center"
        >
            <TextField
                label="Make a new post"
                name="body"
                value={formValues.body}
                variant="outlined"
                color="secondary"
                onChange={onChange}
                fullWidth
                multiline
                error={error ? true : false}
                helperText={error && error.graphQLErrors[0].message}
            />
            <div className="flex h-14 w-full justify-center md:w-auto md:justify-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="focus:outline-none"
                    size="large"
                    fullWidth
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}
