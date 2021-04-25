import { createStore } from "redux";
import { Action } from "../action";
import { Reducer } from "../reducer";
import { defaultGlobalStore } from "./global_store";
import { GlobalStoreSchem } from "./global_store_schem";

export function globalReducer (
    store: GlobalStoreSchem = defaultGlobalStore, 
    action: Action<Partial<GlobalStoreSchem>>
) {
    return {
        ...store,
        ...action
    }
}

// export class GlobalProvider implements Provider<GlobalStore, > {
//     constructor () {

//     }
// }