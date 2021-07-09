import Vue, { VNode } from 'vue'
import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'

import { Store } from './types'

export declare type OmitByValue<T, ValueType> = Pick<T, {
    [Key in keyof T]: T[Key] extends ValueType ? never : Key;
}[keyof T]>;

export declare type PickByValue<T, ValueType> = Pick<T, {
    [Key in keyof T]: T[Key] extends ValueType ? Key : never;
}[keyof T]>;


type ActionsWithParams = OmitByValue<Store.ActionTypes, undefined>
type ActionsWithoutParams = PickByValue<Store.ActionTypes, undefined>

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {
        }

        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {
        }

        interface IntrinsicElements {
            [elem: string]: any
        }
    }
}

declare module 'vuex/types/index' {
    interface Commit {
        <Key extends keyof Store.MutationTypes>(
            type: Key,
            payload: Store.MutationTypes[Key],
            options?: CommitOptions,
        ): void
    }

    interface Dispatch {
        <Key extends keyof ActionsWithParams>(
            type: Key,
            payload: ActionsWithParams[Key],
            options?: DispatchOptions,
        ): Promise<Store.ActionTypesResult[Key]>
        <Key extends keyof ActionsWithoutParams>(
            type: Key,
            payload?: ActionsWithoutParams[Key],
            options?: DispatchOptions,
        ): Promise<Store.ActionTypesResult[Key]>
    }
}

declare module 'vue/types/vue' {
    type CustomStore = Omit<VuexStore<Store.StoreState>, 'getters' | 'commit' | 'dispatch'>

    interface Vue {
        $store: CustomStore & {
            getters: Store.GettersTypes
            commit<Key extends keyof Store.MutationTypes>(
                type: Key,
                payload: Store.MutationTypes[Key],
                options?: CommitOptions,
            ): void
            dispatch<Key extends keyof ActionsWithParams>(
                type: Key,
                payload: ActionsWithParams[Key],
                options?: DispatchOptions,
            ): Promise<Store.ActionTypesResult[Key]>
            dispatch<Key extends keyof ActionsWithoutParams>(
                type: Key,
                payload?: ActionsWithoutParams[Key],
                options?: DispatchOptions,
            ): Promise<Store.ActionTypesResult[Key]>
        }
    }
}
