<template>
    <div id="app">
        <div class="page-container">
            <md-app md-waterfall md-mode="fixed" :class="{'dark': enableDark}">
                <md-app-toolbar v-if="visibleToolbar" class="md-primary">
                    <div class="md-toolbar-section-start">
                        <img
                            v-if="project"
                            :src="project.avatar_url"
                            :alt="project.name"
                            class="toolbar_logo"
                        >
                        <span v-if="user" class="md-title">
                            {{ user.name }}
                        </span>
                    </div>

                    <md-tabs md-sync-route class="md-primary">
                        <md-tab md-label="My Requests" to="/my-requests" />
                        <md-tab md-label="Requests for review" to="/requests" />
                    </md-tabs>

                    <div class="md-toolbar-section-end">
                        <div class="theme-switch">
                            <button class="dark-theme" @click="darkMode">
                                {{ enableDark ? '☀️' : '🌙' }}
                            </button>
                        </div>
                        <md-menu md-size="big" md-direction="bottom-end">
                            <md-button class="md-icon-button" md-menu-trigger>
                                <md-icon>more_vert</md-icon>
                            </md-button>

                            <md-menu-content>
                                <md-menu-item @click="logOut">
                                    <span>Log Out</span>
                                    <md-icon>directions_run</md-icon>
                                </md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </div>
                </md-app-toolbar>

                <md-app-content :class="{'dark': enableDark}">
                    <router-view />
                </md-app-content>
            </md-app>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import Authorization from "@/service/Authorization"
import Notification from "@/service/Notification"

const ENABLE_DARk_MODE = 'enableDarkMode'

@Component
export default class App extends Vue {
    enableDark = false

    darkMode() {
        this.enableDark = !this.enableDark
        if (this.enableDark) {
            localStorage.setItem(ENABLE_DARk_MODE, ENABLE_DARk_MODE)
        } else {
            localStorage.removeItem(ENABLE_DARk_MODE)
        }
    }

    created() {
        if (Authorization.isLogged()) {
            Notification.requestPermission()
        }

        this.enableDark = !!(localStorage.getItem(ENABLE_DARk_MODE))
    }

    get visibleToolbar() {
        return this.$route.name !== 'Auth'
    }

    get project() {
        return this.$store.state.profile.project
    }

    get user() {
        return this.$store.state.profile.user
    }

    logOut() {
        Authorization.logout()
    }
}
</script>

<style lang="scss">
    body {
        width: 800px;
        height: 600px;
    }
    .md-app {
        height: 100vh;
    }
    .theme-switch {
        width: 2em;
        height: 2em;
        border: 1px solid rgba(249, 249, 249, 0.23);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 1em;
        border-radius: 50%;

        .dark-theme {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            cursor: pointer;
            user-select: none;

            &:hover {
                background: #218ade;
                border-radius: 50%;
            }
        }
    }
    .dark {
        .md-toolbar.md-theme-default,
        .md-toolbar .md-tabs .md-tabs-navigation{
            background: #1d2128;
            transition: none;
        }
        .md-layout-column.md-scrollbar,
        .md-content.md-theme-default {
            color: rgba(255, 255, 255, 0.87);
            background: #323232;
            &:after {
                background-color: rgba(255, 255, 255, 0.42);
            }
        }
    }
    .group-requests {
        margin-bottom: 16px;
        position: relative;

        &_link {
            position: absolute;
            z-index: 1;
            left: 8px;
            top: calc(0% - 8px);
            font-size: 12px;
        }
    }
    .md-progress-bar {
        width: 100%;
    }
    .toolbar_logo {
        width: 32px;
        height: 32px;
    }
</style>
