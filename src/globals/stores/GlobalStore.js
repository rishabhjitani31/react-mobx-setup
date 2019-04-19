import { observable } from "mobx"

class GlobalStore {
    @observable isLoggedIn = true
    @observable loading = false
}

export default GlobalStore