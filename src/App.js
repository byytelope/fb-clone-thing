import { BrowserRouter as Router, Route } from "react-router-dom";
import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    ThemeProvider,
} from "@material-ui/core/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

import { AuthProvider } from "./contexts/auth";
import AuthRoute from "./utils/AuthRoute";
import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import PostView from "./pages/PostView";

import "./App.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[500],
        },
        secondary: {
            main: blueGrey[900],
        },
    },
});

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <ThemeProvider theme={theme}>
                    <MenuBar />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/user/:id" component={UserProfile} />
                    <Route exact path="/posts/:postId" component={PostView} />
                    <AuthRoute exact path="/login" component={Login} />
                    <AuthRoute exact path="/register" component={Register} />
                </ThemeProvider>
            </Router>
        </AuthProvider>
    );
}
