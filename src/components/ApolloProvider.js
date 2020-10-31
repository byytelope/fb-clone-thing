import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

import App from "../App";

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = createHttpLink({ uri: "http://localhost:5000" });

const authLink = setContext(() => {
    const token = localStorage.getItem("jwtToken");
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
