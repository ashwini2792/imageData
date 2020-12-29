import {put, call, takeLatest} from "redux-saga/effects";
import ActionType from "../ActionType";
import { fetchDataAPI } from "../services/DataService";

export function* fetchData(...action){
    const onSuc = action[0].payload[0];
    const onErr = action[0].payload[1];
    try {
        const result = yield call(fetchDataAPI);
        if(result.status === 200){
            if(onSuc){
                onSuc(result.data)
            }
            yield put({type:ActionType.RESPONSE_DATA,payload:result.data})
        }
        else{
            yield put({type:ActionType.ERROR,payload:result.statusText})
            if(onErr){
                onErr('Error Occured')
            }
        }
    }catch(error){
        if(onErr){
            onErr('Error Occured')
        }
        yield put({type:ActionType.ERROR,payload:error})
    }

}

export function* imageWatcher(){
   yield takeLatest(ActionType.FETCH_DATA, fetchData);
}