export type Action<T> = Partial<T>

// old method

// export interface Action<Types, Payloads> {
//     type: Types,
//     payload: Payloads
// }