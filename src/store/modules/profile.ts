import {
    ActionTree,
    Module,
    MutationTree,
} from 'vuex'
import {aptUser} from '@/api'
import {Store} from '@/types'
import Notification from '@/service/Notification'

const state: Store.ProfileState = {
    userId: null,
    user: null,
    project: null,
}

const mutations: MutationTree<Store.ProfileState> = {
    SET_USER(state, data: Store.MutationTypes['SET_USER']) {
        state.user = data
    },
    SET_PROJECT(state, data: Store.MutationTypes['SET_PROJECT']) {
        state.project = data
    },
    SET_USER_ID(state, data: Store.MutationTypes['SET_PROJECT']) {
        Notification.dataToBackground({
            id: data.id
        })
        state.userId = data.id
    },
}

const actions: ActionTree<Store.ProfileState, Store.StoreState> = {
    GET_NAMESPACES(context): Store.ActionTypesResult['GET_NAMESPACES'] {
        aptUser.namespaces()
            .then(data => {
                data.forEach((item: any) => {
                    if (item.kind === 'user') {
                        context.commit('SET_USER', item)
                    } else if (item.name === 'social-tech') {
                        context.commit('SET_PROJECT', item)
                    }
                })
            })
    },
}

const storeProfile: Module<Store.ProfileState, Store.StoreState> = {
    state,
    mutations,
    actions,
}

export default storeProfile
