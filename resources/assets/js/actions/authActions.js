

export function onLoginBtnClick(payload) {
    return {
        type: "ON_LOGIN_BTN_CLICK",
        payload: payload
    };
}

export function onRegisterBtnClick(payload) {
    return {
        type: "ON_REGISTER_BTN_CLICK",
        payload: payload
    };
}

export function onLogout(payload) {
    return {
        type: "ON_LOGOUT",
        payload: payload
    };
}



export function defaultAction(payload) {
    return {
        type: "DEFAULT",
        payload: payload
    };
}

