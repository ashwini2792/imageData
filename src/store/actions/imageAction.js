import ActionType from "../ActionType";

export function fetchdataImages(...params){
    return {
        type:ActionType.FETCH_DATA,
        payload:params
    }
}