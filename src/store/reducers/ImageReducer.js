import ActionType from "../ActionType";

const initialState = {
    data:[]
}

export default function imageReducer(state = initialState, action) {
    switch (action.type){
        case ActionType.RESPONSE_DATA:{
            return {...state, data:action.payload}
        }

        default: {
            return state;
        }
    }
}