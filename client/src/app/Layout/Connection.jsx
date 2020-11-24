import React from "react";
import { useSelector } from "react-redux";
import { checkIsOrderHubInitConnected, joinHubGroup } from "app/centralHub";
import { getAccountToken } from "features/Account/accountSlice";

const Connection = () => {
    const isConnected = useSelector(checkIsOrderHubInitConnected);
    const token = useSelector(getAccountToken);

    React.useEffect(() => {
        if (isConnected) {
            joinHubGroup(token);
        }
    }, [isConnected, token]);

    return null;
};

export default React.memo(Connection);
