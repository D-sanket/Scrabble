
const defaultNotificationsState = {
    unread: 0,
};

export default (state = defaultNotificationsState, action = {}) => {

    switch(action.type){
        case "ON_NOTIFICATION_RECEIVED":
            state = {
                ...state,
                unread: state.unread + 1
            };
            break;
        case "ON_NOTIFICATION_READ":
            state = {
                ...state,
                unread: 0
            };
            break;
    }

    return state;
}
