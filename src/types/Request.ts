import {tUser} from './User'

export type tRequest = {
    project_id: number
    iid: number
    source_branch: string
    author_id: number
    id: number
}

export type tRequestInfo = tRequest & {
    id: number;
    title: string;
    description: string;
    state: string;
    created_at: string;
    updated_at: string;
    merged_by: tUser;
    merged_at: any;
    closed_by: any;
    closed_at: any;
    target_branch: string;
    source_branch: string;
    user_notes_count: number;
    upvotes: number;
    downvotes: number;
    assignee: any;
    author: tUser;
    assignees: tUser[];
    source_project_id: number;
    target_project_id: number;
    labels: any[];
    work_in_progress: boolean;
    milestone: any;
    merge_when_pipeline_succeeds: boolean;
    merge_status: string;
    sha: string;
    merge_commit_sha: any;
    squash_commit_sha: any;
    discussion_locked: any;
    should_remove_source_branch: any;
    force_remove_source_branch: boolean;
    reference: string;
    web_url: string;
    time_stats: tTimeStats;
    squash: boolean;
    task_completion_status: tTaskCompletionStatus;
    has_conflicts: boolean;
    blocking_discussions_resolved: boolean;
    subscribed: boolean;
    changes_count: string;
    latest_build_started_at: string;
    latest_build_finished_at: string;
    first_deployed_to_production_at: any;
    pipeline: tPipeline;
    head_pipeline: tHeadPipeline;
    diff_refs: tDiffRefs;
    merge_error: any;
    user: tUserStatus;
    approvals_before_merge: number;
}

export type tPipeline =  {
    id: number;
    sha: string;
    ref: string;
    status: 'running' | 'pending' | 'success' | 'failed' | 'canceled' | 'skipped';
    created_at: string;
    updated_at: string;
    web_url: string;
}

export type tNote = {
    id: number
    type: string
    body: string
    attachment: null
    author: tUser
    created_at: string
    updated_at: string
    system: boolean
    noteable_id: number
    noteable_type: string
    position: any
    resolvable: boolean
    resolved: boolean
    resolved_by: null
    noteable_iid: number
}

type tTimeStats = {
    time_estimate: number;
    total_time_spent: number;
    human_time_estimate: any;
    human_total_time_spent: any;
}

type tTaskCompletionStatus = {
    count: number;
    completed_count: number;
}

type tHeadPipeline = {
    id: number;
    sha: string;
    ref: string;
    status: string;
    created_at: string;
    updated_at: string;
    web_url: string;
    before_sha: string;
    tag: boolean;
    yaml_errors: any;
    user: tUser;
    started_at: string;
    finished_at: string;
    committed_at: any;
    duration: number;
    coverage: any;
    detailed_status: tDetailedStatus;
}

type tDetailedStatus = {
    icon: string;
    text: string;
    label: string;
    group: string;
    tooltip: string;
    has_details: boolean;
    details_path: string;
    illustration: any;
    favicon: string;
}

type tDiffRefs = {
    base_sha: string;
    head_sha: string;
    start_sha: string;
}

type tUserStatus = {
    can_merge: boolean;
}
