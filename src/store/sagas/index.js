import { all,fork } from "redux-saga/effects";
import {  imageWatcher } from "./imageSaga";

export default function* rootSaga(){
    yield all([
        fork(imageWatcher)
    ])
}