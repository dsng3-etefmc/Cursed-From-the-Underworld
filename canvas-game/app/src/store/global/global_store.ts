import { combineReducers, createStore } from "redux";
import { Action } from "../action";
import { globalReducer } from "./global_reducer";
import { GlobalStoreSchem, Weather } from "./global_store_schem";

export const defaultGlobalStore: GlobalStoreSchem = {
    weather: Weather.sunny
}

const gotReducer = combineReducers(globalReducer);
export const GlobalStore = createStore(gotReducer);