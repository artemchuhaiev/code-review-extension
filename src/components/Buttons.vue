<template>
    <md-button
        v-if="canAdd"
        class="md-raised md-primary"
        @click="addToRoster"
    >
        to review
    </md-button>
    <md-button
        v-else-if="canRemove"
        class="md-raised md-accent"
        @click="removeFromRoster"
    >
        remove
    </md-button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import Firebase from '@/service/Firebase'
import {tRequestInfo} from '@/types'

@Component
export default class Buttons extends Vue {
    @Prop() info: tRequestInfo
    @Prop() approvedRequest: boolean

    addToRoster() {
        Firebase.setToRoster(this.info.id , {
            project_id: this.info.project_id,
            iid: this.info.iid,
            source_branch: this.info.source_branch,
            author_id: this.info.author.id,
            id: this.info.id,
            icon: this.info.author.avatar_url,
            name: this.info.author.name,
            body: this.info.title,
            link: this.info.web_url,
            timestamp: Date.now()
        })
    }

    removeFromRoster() {
        Firebase.removeFromRoster(this.info.id)
    }

    get isMyRequest () {
        return this.info.author.id === this.$store.state.profile.userId
    }

    get canRemove () {
        return this.isMyRequest && this.$store.getters.includesInRoster(this.info.source_branch, this.info.id)
    }

    get canAdd () {
        return this.isMyRequest
            && !this.$store.getters.includesInRoster(this.info.source_branch, this.info.id)
            && !this.info.has_conflicts
            && !this.approvedRequest
    }
}
</script>

<style scoped lang="scss">
    .btn {
        width: 100%;
    }
</style>
