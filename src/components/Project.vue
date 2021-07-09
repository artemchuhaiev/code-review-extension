<template>
    <a
        v-if="project"
        :href="project.web_url"
        :title="project.name"
        target="_blank"
    >
        {{ project.name }}
    </a>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {aptUser} from '@/api'
import {tiProject} from '@/types'

@Component
export default class Project extends Vue {
    @Prop() idProject: number

    project: tiProject | null = null

    created() {
        aptUser.projectInfo(this.idProject)
            .then(data => {
                this.project = data
            })
    }
}
</script>
