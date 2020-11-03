import { useQuery } from "@apollo/client";
import moment from "moment";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";

import { FETCH_USER_QUERY } from "../utils/graphql";

export default function Profile(props) {
    const username = props.match.params.username;
    const { loading, data: { getUser: user } = {} } = useQuery(FETCH_USER_QUERY, {
        variables: { username },
    });

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col items-center text-secondary">
                    <div className="rounded-full text-6xl">
                        <FaceTwoToneIcon fontSize="inherit" className="text-secondary" />
                    </div>
                    <div className="font-bold text-4xl">{user.username}</div>
                    <div className="text-2xl">{user.email}</div>
                    <div className="text-xl py-8">{`Joined ${moment(user.createdAt).fromNow()}`}</div>
                </div>
            )}
        </div>
    );
}
