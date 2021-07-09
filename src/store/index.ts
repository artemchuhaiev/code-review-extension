import Vue from 'vue'
import Vuex from 'vuex'
import storeProfile from './modules/profile'
import storeGeneral from './modules/general'
import { Store } from '@/types'

Vue.use(Vuex)

export default new Vuex.Store<Store.StoreState>({
    modules: {
        profile: storeProfile,
        general: storeGeneral,
    },
    strict: true,
})
