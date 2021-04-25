export class Reducer<Store, Actions> {
    store: Store;

    update (action: Actions, payload: object): void
}