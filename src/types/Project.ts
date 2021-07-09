import {tUser} from './User'

export type tiProject  = {
    id: number;
    description: string;
    name: string;
    name_with_namespace: string;
    path: string;
    path_with_namespace: string;
    created_at: string;
    default_branch: string;
    tag_list: any[];
    ssh_url_to_repo: string;
    http_url_to_repo: string;
    web_url: string;
    readme_url: string;
    avatar_url: any;
    star_count: number;
    forks_count: number;
    last_activity_at: string;
    namespace: tUser;
    _links: tLinks;
    empty_repo: boolean;
    archived: boolean;
    visibility: string;
    resolve_outdated_diff_discussions: boolean;
    container_registry_enabled: boolean;
    issues_enabled: boolean;
    merge_requests_enabled: boolean;
    wiki_enabled: boolean;
    jobs_enabled: boolean;
    snippets_enabled: boolean;
    issues_access_level: string;
    repository_access_level: string;
    merge_requests_access_level: string;
    wiki_access_level: string;
    builds_access_level: string;
    snippets_access_level: string;
    shared_runners_enabled: boolean;
    lfs_enabled: boolean;
    creator_id: number;
    import_status: string;
    open_issues_count: number;
    ci_default_git_depth: any;
    public_jobs: boolean;
    build_timeout: number;
    auto_cancel_pending_pipelines: string;
    build_coverage_regex: any;
    ci_config_path: any;
    shared_with_groups: tSharedWithGroup[];
    only_allow_merge_if_pipeline_succeeds: boolean;
    request_access_enabled: boolean;
    only_allow_merge_if_all_discussions_are_resolved: boolean;
    remove_source_branch_after_merge: boolean;
    printing_merge_request_link_enabled: boolean;
    merge_method: string;
    auto_devops_enabled: boolean;
    auto_devops_deploy_strategy: string;
    permissions: tPermissions;
    approvals_before_merge: number;
    mirror: boolean;
    external_authorization_classification_label: string;
    packages_enabled: boolean;
}

type tLinks =  {
    self: string;
    issues: string;
    merge_requests: string;
    repo_branches: string;
    labels: string;
    events: string;
    members: string;
}

type tSharedWithGroup = {
    group_id: number;
    group_name: string;
    group_full_path: string;
    group_access_level: number;
    expires_at: any;
}

type tPermissions = {
    project_access: any;
    group_access: tGroupAccess;
}

type tGroupAccess = {
    access_level: number;
    notification_level: number;
}
