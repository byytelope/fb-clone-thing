import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { AuthContext } from "../contexts/auth";
import { useForm } from "../utils/hooks/useForm";

export default function Login() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);

    const { onChange, onSubmit, formValues } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            history.goBack();
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: formValues,
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <div>
            <div className="m-auto py-8">
                <div className="text-3xl font-bold text-center text-secondary">Login</div>
            </div>
            <div className="flex justify-center py-8">
                <form
                    onSubmit={onSubmit}
                    noValidate
                    className="flex flex-col space-y-8 px-8 md:px-32 lg:px-64 w-full"
                >
                    <TextField
                        label="Username"
                        name="username"
                        autoComplete="username"
                        value={formValues.username}
                        variant="outlined"
                        color="secondary"
                        onChange={onChange}
                        error={errors.username ? true : false}
                        helperText={errors.username}
                    />
                    {/* TODO: Add email login | <TextField
                        label="Email"
                        name="email"
                        value={formValues.email}
                        variant="outlined"
                        color="secondary"
                        onChange={onChange}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                    /> */}
                    <TextField
                        label="Password"
                        name="password"
                        autoComplete="current-password"
                        value={formValues.password}
                        variant="outlined"
                        type="password"
                        color="secondary"
                        onChange={onChange}
                        error={errors.password ? true : false}
                        helperText={errors.password}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="focus:outline-none"
                        disabled={loading}
                        size="large"
                    >
                        {loading ? "Logging In" : "Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String! # TODO: Add email login | $email: String!
    ) {
        login(
            username: $username
            password: $password # TODO: Add email login | email: $email
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;
