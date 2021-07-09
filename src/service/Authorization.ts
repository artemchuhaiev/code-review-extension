import {aptUser, api} from "../api"
import router from "@/router"

const STORAGE = window.localStorage
const PRIVATE_TOKEN:string = 'PRIVATE-TOKEN'

class Authorization {
    private authorized: boolean = false

    constructor(token:string | null) {
        if (token === null) return
        api.setToken(token)
        this.authorized = true
    }


    isLogged():boolean {
        return this.authorized
    }

    login(token: string):Promise<void> {
        api.setToken(token)
        return new Promise((resolve, reject) => {
            aptUser.namespaces()
                .then(() => {
                    STORAGE.setItem(PRIVATE_TOKEN, token)
                    this.authorized = true
                    resolve()
                })
                .catch(() => {
                    api.setToken('')
                    this.authorized = false
                    reject()
                })
        })
    }

    logout ():void {
        STORAGE.removeItem(PRIVATE_TOKEN)
        api.setToken('')
        this.authorized = false
        router.push('/auth')
    }

}

export default new Authorization(STORAGE.getItem(PRIVATE_TOKEN))
