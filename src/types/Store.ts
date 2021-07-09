import {tRequest, tRequestInfo, tUser, tiProject} from '@/types'

export type StoreState = {
    profile: ProfileState
    general: GeneralState
}

export type GeneralState = {
    myRequests: {
        [key in string]: tRequestInfo[]
    } | null
    requests: {
        [key in string]: tRequest[]
    } | null
}

export type ProfileState = {
    userId: number | null
    user: tUser | null
    project: tiProject | null
}

export type MutationTypes = {
    SET_MY_REQUESTS: tRequestInfo[]
    SET_REQUESTS: {
        [key in string]: tRequest
    }
    SET_USER: tUser
    SET_PROJECT: tiProject
    SET_USER_ID: tUser
}

export interface GettersTypes {
    includesInRoster: (sourceBranch: string, idRequest: number) => boolean
}

export type ActionTypes = {
    GET_NAMESPACES: undefined
    GET_MY_REQUESTS: undefined
    GET_REQUESTS: undefined
}

export type ActionTypesResult = {
    GET_MY_REQUESTS: void
    GET_REQUESTS: void
    GET_NAMESPACES: void
}
