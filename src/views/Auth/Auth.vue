<template>
    <div class="md-layout">
        <md-card class="md-layout-item">
            <md-card-header>
                <div class="md-title">
                    <h1>
                        Not authorized
                    </h1>
                    <p>
                        You can generate a personal access token for each application you use that needs access to the
                        GitLab API.
                        <br>
                        <a href="https://gitlab.com/profile/personal_access_tokens" target="_blank">
                            gitlab.com
                        </a>
                    </p>
                </div>
            </md-card-header>

            <md-card-content>
                <md-field :class="{ 'md-invalid': error.length}">
                    <label>
                        Token
                    </label>
                    <md-input
                        id="first-name"
                        v-model="token"
                        :disabled="sending"
                        autocomplete="off"
                        @focus="hideErrors"
                    />
                    <span class="md-error">
                        {{ error }}
                    </span>
                </md-field>
            </md-card-content>

            <md-card-actions>
                <md-button
                    class="md-raised md-primary"
                    :disabled="sending"
                    @click="setToken"
                >
                    Set token
                </md-button>
            </md-card-actions>

            <md-progress-bar v-if="sending" md-mode="indeterminate" />
        </md-card>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Authorization from '@/service/Authorization'

@Component
export default class Auth extends Vue {
    token: string = ''
    error: string = ''
    sending: boolean = false

    setToken() {
        this.sending = true
        Authorization.login(this.token)
            .then(() => {
                this.sending = false
                this.$router.push('/')
            })
            .catch(() => {
                this.sending = false
                this.error = 'Token is not correct'
            })
    }

    hideErrors() {
        this.error = ''
    }
}
</script>

<style lang="scss" scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }

    .md-layout {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
    }

    .dark {
        .md-layout-item {
            background: #323232;
            color: #ffffff;
        }
        .md-field {
            label {
                color: #ffffff;
            }

            &.md-theme-default.md-focused .md-input,
            &.md-theme-default.md-focused .md-textarea,
            &.md-theme-default.md-has-value .md-input,
            &.md-theme-default.md-has-value .md-textarea {
                -webkit-text-fill-color: rgba(255, 255, 255, 0.87);
            }
        }
    }
</style>
