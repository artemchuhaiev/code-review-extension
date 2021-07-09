import { api } from "@/api";
import {tApprovals, tiProject, tRequestInfo, tUser, tNote} from '@/types'

const host:string = 'https://gitlab.com/api/v4/'

export default {
    namespaces(): Promise<[tiProject, tUser]> {
        return api.get(`${host}namespaces`)
    },

    openedMR(): Promise<[tRequestInfo]> {
        return api.get(`${host}merge_requests?state=opened`)
    },

    requestInfo(projectsId: number, requestsIid: number): Promise<tRequestInfo> {
        return api.get(`${host}projects/${projectsId}/merge_requests/${requestsIid}`)
    },

    approvals(projectsId:number, requestsIid:number): Promise<tApprovals> {
        return api.get(`${host}projects/${projectsId}/merge_requests/${requestsIid}/approvals`)
    },

    projectInfo(projectsId:number): Promise<tiProject> {
        return api.get(`${host}projects/${projectsId}`)
    },

    notes(projectsId:number, requestsIid: number): Promise<tNote[]> {
        return api.get(`${host}projects/${projectsId}/merge_requests/${requestsIid}/notes?per_page=50`)
    },
}
