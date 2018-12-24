<template>
    <section>
        <h2>アイドル選択</h2>
        <p>
            <input type="search" placeholder="アイドル絞り込み" v-model="keyword" />
        </p>
        <pager v-bind:count="count" v-bind:limit="limit" @change="changePage"></pager>
        <ul>
            <li v-for="idol in idols"><img v-bind:src="getImageUrl(idol.idol_id)" v-bind:alt="idol.name" v-on:click="click(idol.type, idol.idol_id)" /></li>
        </ul>
    </section>
</template>

<script lang="ts">
    import pager from './pager.vue';

    export default {
        name: "idol_editor",
        components: {
            "pager": pager
        },
        props: [
            "index",
            "name",
        ],
        data: function () {
            return {
                keyword: this.name,
                idols: [],
                count: 0,
                limit: 10,
            };
        },
        mounted: function (): void {
            this.search();
        },
        methods: {
            search: function (offset: number = 0): void {
                const url = new URL("https://zaubermaerchen.info/imas_cg/api/idol/search/");
                url.searchParams.append("name", this.keyword);
                url.searchParams.append("limit", this.limit.toString());
                url.searchParams.append("offset", offset.toString());

                fetch(url.href, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                    },
                    mode: "cors",
                    credentials: "omit"
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.idols = json.results;
                    this.count = json.count;
                })
            },
            changePage: function(offset: number): void {
                this.search(offset);
            },
            getImageUrl: function (idol_id: number): string {
                return 'http://zaubermaerchen.info/imas_cg/image/idol/xs/' + idol_id + '/';
            },
            click(type: number, idol_id: number): void {
                this.$emit("click", this.index, type, idol_id);
            }
        },
        watch: {
            name: {
                handler(val: string) {
                    this.keyword = val;
                }
            },
            keyword: {
                handler() {
                    this.search();
                }
            }
        }
    }
</script>

<style scoped>
    section {
        width: auto;
        max-width: 500px;
    }
    p {
        margin-bottom: 20px;
    }
    input[type="search"] {
        width: 100%;
        font-size: 16px;
        border-radius: 3px;
        box-shadow: none;
        padding: .5em 2px;
        border: 1px solid #bbb;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 0;
        margin-top: 20px;
        padding: 0;
    }
    ul > li {
        margin: 0;
        padding: 0;
    }

</style>