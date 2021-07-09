<template>
    <div class="info">
        <div class="info_item">
            <a
                :href="info.web_url"
                target="_blank"
                class="info_link"
            >
                {{ info.title }}
            </a>
        </div>
        <div class="info_item md-caption">
            <Project :id-project="info.project_id" />
            opened
            {{ timeAgo }}
            by
            <a :href="info.author.web_url" target="_blank">
                {{ info.author.name }}
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import moment from 'moment'
import {Component, Prop, Vue} from 'vue-property-decorator'
import {tRequestInfo} from '@/types'
import Project from './Project.vue'

@Component({
    components: {
        Project,
    },
})
export default class Info extends Vue {
    @Prop() info: tRequestInfo

    get timeAgo() {
        return moment.utc(this.info.created_at).fromNow()
    }
}
</script>

<style lang="scss">
    .info {
        display: flex;
        flex-direction: column;
        &_item {
            margin-bottom: 4px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &_link {
            display: block;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
</style>
