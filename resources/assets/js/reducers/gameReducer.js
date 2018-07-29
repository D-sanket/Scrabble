import $ from "jquery";
import {getToken, store} from "../core";
import { onLogout } from "../actions/authActions";

const defaultGameState = {
    isGameOn: false,
    isPaused: false,
    data: null,
    loading: true,
    size: window.innerWidth > window.innerHeight ? 0.9*window.innerHeight : window.innerWidth
};

export default function (state = defaultGameState, action = {}) {
    switch (action.type){
        case "_GAME":
            state = {
                ...state,
                loading: false,
                data: {
                    game: action.payload.game[0],
                    player1: action.payload.player1[0],
                    player2: action.payload.player2[0],
                }
            };
            break;
        case "ON_GAME_CONTINUED":
            state = {
                ...state,
                isGameOn: true
            };
            continueGame(action.payload);
            break;
        case "ON_GAME_CLOSED":
            state = defaultGameState;
            break;

        case "ON_GAME_RESIZE":
            state = {
                ...state,
                size: window.innerWidth > window.innerHeight ? 0.9*window.innerHeight : window.innerWidth
            };
            break;
    }

    return state;
}

function continueGame(id) {
    axios.post('/api/game/continue/'+id, { token: getToken() })
        .then(function (response) {
            store.dispatch({
                type: "_GAME",
                payload: response.data
            });
        })
        .catch(function (error) {
            if(error.response.status === 401){
                store.dispatch(onLogout(store.getState().authReducer()));
            }
            console.error(error);
        });
}

