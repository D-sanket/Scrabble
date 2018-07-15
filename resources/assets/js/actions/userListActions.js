

export function onUsersFetch(payload) {
    return {
        type: "FETCH_USERS",
        payload: payload
    };
}


export function defaultAction(payload) {
    return {
        type: "DEFAULT_LIST",
        payload: payload
    };
}

