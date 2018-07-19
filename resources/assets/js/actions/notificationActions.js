
export function onNotificationReceived(payload){
    return {
        type: "ON_NOTIFICATION_RECEIVED",
        payload: payload
    };
}

export function onNotificationRead(payload){
    return {
        type: "ON_NOTIFICATION_READ",
        payload: payload
    };
}
