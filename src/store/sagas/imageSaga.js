import {put, call, takeLatest} from "redux-saga/effects";
import ActionType from "../ActionType";
import { fetchDataAPI } from "../services/DataService";

export function* fetchData(...action){
    const onSuc = action[0].payload[0];
    const onErr = action[0].payload[1];
    try {
        const result = yield call(fetchDataAPI);
        if(result.status === 200){
            const someImages = result.data.filter((img,index)=>{
                    return index < 5
            })
            if(onSuc){
                onSuc(someImages)
            }
            yield put({type:ActionType.RESPONSE_DATA,payload:someImages})
        }
        else{
            yield put({type:ActionType.ERROR,payload:result.statusText})
            if(onErr){
                onErr('someImages')
            }
        }
    }catch(error){
        if(onErr){
            onErr('someImages')
        }
        yield put({type:ActionType.ERROR,payload:error})
    }

}

export function* imageWatcher(){
   yield takeLatest(ActionType.FETCH_DATA, fetchData);
}