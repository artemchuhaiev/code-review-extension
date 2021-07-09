import { tUser, tGroup } from './User'

export type tApprovals  = {
    id: number;
    iid: number;
    project_id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    merge_status: string;
    approved: boolean;
    approvals_required: number;
    approvals_left: number;
    require_password_to_approve: boolean;
    approved_by: tApprovedBy[];
    suggested_approvers: tUser[];
    approvers: tUser[];
    approver_groups: tApproverGroup[];
    user_has_approved: boolean;
    user_can_approve: boolean;
    approval_rules_left: tRule[];
    has_approval_rules: boolean;
    merge_request_approvers_available: boolean;
    multiple_approval_rules_available: boolean;
}

export type tApprovedBy  = {
    user: tUser;
}

type tApproverGroup  = {
    group: tGroup;
}

type tRule = {
    id: number;
    name: string;
    rule_type: string;
    eligible_approvers: tUser[];
    approvals_required: number;
    users: tUser[];
    groups: tGroup[];
    contains_hidden_groups: boolean;
    approved_by: tApprovedBy[];
    source_rule: any;
    approved: boolean;
}
