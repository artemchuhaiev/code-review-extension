<template>
    <div
        class="md-layout md-alignment-center-center requests"
        :class="{
            'requests__approved': approvedRequest,
            'requests__warning': warningRequest,
        }"
    >
        <template v-if="requestInfo">
            <div class="md-layout-item md-size-55">
                <Info :info="requestInfo" />
            </div>
            <div class="md-layout-item">
                <Buttons :info="requestInfo" :approved-request="approvedRequest" />
            </div>
            <div class="md-layout-item md-size-15">
                <Status :info="requestInfo" />
            </div>
            <div class="md-layout-item">
                <Approved
                    :iid-requests="requestInfo.iid"
                    :id-project="requestInfo.project_id"
                    @approved-request="approvedRequest = true"
                />
            </div>
            <a
                :href="`${requestInfo.web_url}/diffs`"
                target="_blank"
                class="requests_link"
            >
                Changes {{ requestInfo.changes_count }}
            </a>
        </template>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import Firebase from '@/service/Firebase'
import {tRequestInfo, tRequest} from '@/types'
import {aptUser} from '@/api'
import Buttons from './Buttons.vue'
import Approved from './Approved.vue'
import Info from './Info.vue'
import Status from './Status.vue'

const MERGED_STATUS:string = 'can_be_merged'
const MERGE_STATE: string = 'opened'

@Component({
    components: {
        Buttons,
        Approved,
        Info,
        Status,
    },
})
export default class Request extends Vue {
    @Prop() request: tRequest
    requestInfo: tRequestInfo | null = null
    approvedRequest: boolean = false

    created() {
        aptUser.requestInfo(this.request.project_id, this.request.iid)
            .then(data => {
                if (data.state === MERGE_STATE) {
                    this.requestInfo = data

                    if (data.has_conflicts) {
                        Firebase.removeFromRoster(data.id)
                    }
                } else {
                    Firebase.removeFromRoster(data.id)
                }
            })
    }

    get warningRequest() {
        return this.requestInfo
            ? this.requestInfo.merge_status !== MERGED_STATUS
            : false
    }

}
</script>

<style lang="scss">
    .requests {
        min-height: 65px;
        padding: 8px;
        border-bottom: 1px solid rgba(0,0,0,.1);
        position: relative;
        &:last-child {
            border-bottom: none;
        }

        &_link {
            position: absolute;
            font-size: 12px;
            line-height: 12px;
            top: 4px;
            right: 8px;
        }

        &__approved {
            background-color: #e8f5e9;
        }

        &__warning {
            background-color: #ffebee;
        }
    }
    .dark {
        .requests {
            &__approved {
                background-color: #2c4a2c;
            }

            &__warning {
                background-color: #5d333a;
            }
        }
        .md-elevation-2 {
            box-shadow: 0 3px 1px -2px rgba(255, 255, 255, 0.2),
            0 2px 2px 0 rgba(255, 255, 255, 0.14),
            0 1px 5px 0 rgba(255, 255, 255, 0.12);

            .info_item {
                color: rgba(255, 255, 255, 0.64);
            }

            .status_comment .md-icon.md-theme-default.md-icon-font {
                color: rgba(255, 255, 255, 0.75);
            }
        }
    }
</style>
