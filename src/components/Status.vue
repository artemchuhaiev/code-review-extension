<template>
    <div class="status md-body-1">
        <md-icon v-if="info.has_conflicts" class="status_warning">
            warning
            <md-tooltip md-direction="bottom">
                Has conflicts
            </md-tooltip>
        </md-icon>
        <span
            v-if="info.pipeline"
            class="status_pipeline"
            :class="info.pipeline.status"
            @click="linkToPipeline"
        >
            <md-icon>
                {{ icon }}
                <md-tooltip md-direction="bottom">
                    Pipeline {{ info.pipeline.status }}
                </md-tooltip>
            </md-icon>
        </span>
        <span
            class="status_comment"
            :class="{'status_comment__empty': info.user_notes_count === 0 }"
        >
            <md-icon>
                comment
            </md-icon>
            <md-tooltip md-direction="bottom">
                {{ info.user_notes_count }}
            </md-tooltip>
        </span>
        <span v-if="resolvable">
            {{ resolved }} / {{ resolvable }}
        </span>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {tNote, tRequestInfo} from '@/types'
import { aptUser } from '@/api'

@Component
export default class Status extends Vue {
    @Prop() info: tRequestInfo

    resolvable: number| null = null
    resolved: number| null = null

    created() {
        if (this.info.iid && this.info.project_id) {
            aptUser.notes(this.info.project_id, this.info.iid).then((notes: tNote[]) => {
                this.resolvable = notes.filter(note => note.resolvable).length
                this.resolved = notes.filter(note => note.resolved).length
            })
        }
    }

    get icon ():string {
        switch(this.info.pipeline.status) {
            case 'success':
                return 'check_circle_outline'
            case 'running':
            case 'pending':
                return 'cached'
            case 'failed':
                return 'highlight_off'
            case 'canceled':
            case 'skipped':
                return 'alarm_off'
            default:
                return 'help_outline'
        }
    }

    linkToPipeline () {
        window.open(this.info.pipeline.web_url, '_blank')
    }
}
</script>

<style lang="scss">
    .status {
        &_pipeline {
            cursor: pointer;
            &.success{
                .md-icon {
                    color: #1aaa55;
                }
            }
            &.running,
            &.pending {
                .md-icon {
                    color: #418cd8;
                }
            }
            &.failed {
                .md-icon {
                    color: red;
                }
            }
        }
        &_comment {
            &.status_comment__empty {
                opacity: .2;
            }
        }
        &_warning {
            color: #ff5252 !important;
        }
    }
</style>
