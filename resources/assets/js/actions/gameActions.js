
export function onGameContinued(data) {
    return {
        type: "ON_GAME_CONTINUED",
        payload: data
    };
}


export function onGameClosed(data) {
    return {
        type: "ON_GAME_CLOSED",
        payload: data
    };
}



export function onGameResize(data) {
    return {
        type: "ON_GAME_RESIZE",
        payload: data
    };
}
