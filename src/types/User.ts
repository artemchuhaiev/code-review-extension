export type tUser = {
    id: number;
    name: string;
    username: string;
    state: string;
    avatar_url: string;
    web_url: string;
}

export type tGroup = {
    id: number;
    name: string;
    path: string;
    description: string;
    visibility: string;
    lfs_enabled: boolean;
    avatar_url: any;
    web_url: string;
    request_access_enabled: boolean;
    full_name: string;
    full_path: string;
    parent_id: any;
    ldap_cn: any;
    ldap_access: any;
}
