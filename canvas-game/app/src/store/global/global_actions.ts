// export enum GlobalStoreActions {
//     CHANGE_WEATHER
// }

import { Action } from "../action";
import { GlobalStoreSchem, Weather } from "./global_store_schem";

export function changeWeather (weather: Weather): Action<GlobalStoreSchem> {
    return {
        weather
    }
}