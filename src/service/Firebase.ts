import * as firebase from 'firebase/app'
import 'firebase/database'

type FireBaseConfig = {
    apiKey: string
    authDomain: string
    databaseURL: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
}

type FireBaseData = {
    project_id: number
    iid: number
    source_branch: string
    author_id: number
    id: number
    icon: string
    name: string
    body: string
    link: string
    timestamp: number
}

class FireBase {
    database: firebase.database.Database

    private firebaseConfig: FireBaseConfig = {
        apiKey: "test",
        authDomain: "test",
        databaseURL: "test",
        projectId: "test",
        storageBucket: "test",
        messagingSenderId: "test",
        appId: "test"
    }

    constructor() {
        firebase.initializeApp(this.firebaseConfig)
        this.database = firebase.database()
    }

    setToRoster(idRequest:number, data:FireBaseData) {
        this.database.ref(`roster/${idRequest}`).set(data)
    }

    removeFromRoster(idRequest:number) {
        this.database.ref('roster').child(`${idRequest}`).remove()
    }

    read(key:string | undefined, callback:any) {
        return this.database.ref(key).on('value', callback)
    }
}

export default new FireBase()
