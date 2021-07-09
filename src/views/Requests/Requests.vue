<template>
    <div>
        <div
            v-for="(item, key) in requests"
            :key="key"
            class="md-elevation-2 group-requests"
        >
            <a
                :href="`https://test.myjetbrains.com/youtrack/issue/${item[0].source_branch}`"
                target="_blank"
                class="group-requests_link"
            >
                YouTrack
            </a>
            <Request
                v-for="request in item"
                :key="request.id"
                :request="request"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Request from '../../components/Request.vue'

@Component({
    components: {
        Request,
    }
})
export default class Requests extends Vue {

    created() {
        this.$store.dispatch('GET_NAMESPACES')
        this.$store.dispatch('GET_MY_REQUESTS')
        this.$store.dispatch('GET_REQUESTS')
    }

    get requests() {
        return this.$route.meta.myRequests
            ? this.$store.state.general.myRequests
            : this.$store.state.general.requests
    }

}
</script>
