import {
    ActionTree,
    GetterTree,
    Module,
    MutationTree,
} from 'vuex'
import {aptUser} from '@/api'
import Firebase from '@/service/Firebase'
import {tRequestInfo, Store, tRequest} from '@/types'

const state: Store.GeneralState = {
    myRequests: null,
    requests: null,
}

const mutations: MutationTree<Store.GeneralState>  = {
    SET_MY_REQUESTS(state, data: Store.MutationTypes['SET_MY_REQUESTS']) {
        const sortedReq: {
            [key in string] : tRequestInfo[]
        } = {}

        data.forEach((item) => {
            const branch= item.source_branch
            if (Array.isArray(sortedReq[branch])) {
                sortedReq[branch].push(item)
            } else {
                sortedReq[branch] = []
                sortedReq[branch].push(item)
            }
        })

        state.myRequests = sortedReq
    },
    SET_REQUESTS(state, data: Store.MutationTypes['SET_REQUESTS']) {
        const sortedReq: {
            [key in string] : tRequest[]
        } = {}

        if(data) {
            Object.keys(data).forEach((item) => {
                const { source_branch } = data[item]
                if (Array.isArray(sortedReq[source_branch])) {
                    sortedReq[source_branch].push(data[item])
                } else {
                    sortedReq[source_branch] = []
                    sortedReq[source_branch].push(data[item])
                }
            })

            state.requests = sortedReq
        } else {
            state.requests = null
        }
    }
}

const getters: GetterTree<Store.GeneralState, Store.StoreState> = {
    includesInRoster: (state): Store.GettersTypes['includesInRoster'] => (sourceBranch: string, idRequest: number) => {
        return !!state.requests
            && !!state.requests[sourceBranch]
            && !!state.requests[sourceBranch].find((request) => request.id === idRequest )
    },
}

const actions: ActionTree<Store.GeneralState, Store.StoreState> = {
    GET_MY_REQUESTS(context): Store.ActionTypesResult['GET_MY_REQUESTS'] {
        aptUser.openedMR()
            .then((data) => {
                context.commit('SET_USER_ID', data[0].author)
                context.commit('SET_MY_REQUESTS', data)
            })
    },
    GET_REQUESTS(context): Store.ActionTypesResult['GET_REQUESTS'] {
        Firebase.read('/roster', (snapshot: firebase.database.DataSnapshot) => {
            context.commit('SET_REQUESTS', snapshot.val())
        })
    }
}

const storeGeneral: Module<Store.GeneralState, Store.StoreState> = {
    state,
    mutations,
    getters,
    actions,
}

export default storeGeneral
