import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../contexts/auth";
import { useForm } from "../utils/hooks/useForm";

export default function Register() {
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const context = useContext(AuthContext);

    const { onChange, onSubmit, formValues } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, { data: { register: userData } }) {
            context.login(userData);
            history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: formValues,
    });

    function registerUser() {
        addUser(); // Callback
    }

    return (
        <div>
            <div className="m-auto py-8">
                <div className="text-3xl font-bold text-center text-secondary">Register</div>
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
                        value={formValues.username}
                        variant="outlined"
                        color="secondary"
                        onChange={onChange}
                        error={errors.username ? true : false}
                        helperText={errors.username}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={formValues.email}
                        variant="outlined"
                        color="secondary"
                        onChange={onChange}
                        error={errors.email ? true : false}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        autoComplete="new-password"
                        value={formValues.password}
                        variant="outlined"
                        type="password"
                        color="secondary"
                        onChange={onChange}
                        error={errors.password ? true : false}
                        helperText={errors.password}
                    />
                    <TextField
                        label="Confirm password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        value={formValues.confirmPassword}
                        variant="outlined"
                        type="password"
                        color="secondary"
                        onChange={onChange}
                        error={errors.confirmPassword ? true : false}
                        helperText={errors.confirmPassword}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="focus:outline-none"
                        disabled={loading}
                        size="large"
                    >
                        {loading ? "Logging In" : "Submit & Login"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`;
