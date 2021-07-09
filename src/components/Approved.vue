<template>
    <div class="approvals">
        <a
            v-for="(item, key) in approvedBy"
            :key="key"
            :href="item.user.web_url"
            class="approvals_item"
        >
            <md-avatar class="md-avatar-icon md-small md-primary">
                <img
                    :src="item.user.avatar_url"
                    :alt="item.user.name"
                >
                <md-tooltip md-direction="bottom">
                    {{ item.user.name }}
                </md-tooltip>
            </md-avatar>
        </a>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {aptUser} from '@/api'
import {tApprovals, tApprovedBy} from '@/types'
import Firebase from '@/service/Firebase'

@Component
export default class Approved extends Vue {
    @Prop() iidRequests: number
    @Prop() idProject: number

    approvals: tApprovals | null = null
    approvedBy: tApprovedBy[] = []

    created() {
        aptUser.approvals(this.idProject, this.iidRequests)
            .then(data => {
                this.approvals = data
                this.approvedBy = data.approved_by

                if (this.approvedBy.length >= 2) {
                    Firebase.removeFromRoster(data.id)

                    this.approved()
                }
            })
    }

    approved() {
        this.$emit('approved-request')
    }
}
</script>

<style lang="scss">
    .approvals {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: nowrap;
        &_item {
            margin: 4px 4px 4px -10px;
        }
    }
</style>
