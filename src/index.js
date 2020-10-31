import { StrictMode } from "react";
import ReactDOM from "react-dom";

import ApolloProvider from "./components/ApolloProvider";

ReactDOM.render(<StrictMode>{ApolloProvider}</StrictMode>, document.getElementById("root"));
