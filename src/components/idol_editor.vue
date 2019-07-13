<template>
    <section>
        <el-input placeholder="アイドル検索" v-model="keyword" v-on:input="search"></el-input>
        <ul>
            <li v-for="idol in idols"><img v-bind:src="getImageUrl(idol.idol_id)" v-bind:alt="idol.name" v-on:click="click(idol.type, idol.idol_id)" />/imagebox></li>
        </ul>
        <el-pagination background layout="prev, pager, next" v-bind:current-page.sync="page" v-on:current-change="changePage" v-bind:total="count" v-bind:page-size="limit" v-if="getPages() > 1" ></el-pagination>
    </section>
</template>

<script lang="ts">
    import * as api from './api.ts';

    export default {
        name: "idol_editor",
        props: [
            "index",
            "idol_id",
        ],
        data: function () {
            return {
                keyword: "",
                idols: [],
                page: 1,
                count: 0,
                limit: 10,
            };
        },
        created: function (): void {
            this.init();
        },
        methods: {
            init(): void {
                if (this.idol_id == 0) {
                    this.search();
                } else {
                    api.getIdol(this.idol_id).then((idol: any) => {
                        this.keyword = idol.name;
                        this.idols = [idol];
                        this.page = 1;
                        this.count = 1;
                    })
                }
            },
            search(offset: number = 0): void {
                let name: string | null = null;
                if (this.keyword.length > 0) {
                    name = this.keyword;
                }

                api.searchIdol(name, null, null, this.limit, offset).then((json: any) => {
                    this.idols = json.results;
                    this.count = json.count;
                    if (offset == 0) {
                        this.page = 1;
                    }
                })
            },
            getPages(): number { return Math.ceil(this.count / this.limit); },
            getOffset(): number { return (this.page - 1) * this.limit; },
            changePage(): void {
                this.search(this.getOffset());
            },
            getImageUrl: function (idol_id: number): string {
                return 'http://zaubermaerchen.info/imas_cg/image/idol/xs/' + idol_id + '/';
            },
            click(type: number, idol_id: number): void {
                this.$emit("click", this.index, type, idol_id);
            }
        },
    }
</script>

<style scoped>
    section {
        width: auto;
        max-width: 500px;
    }
    .el-pagination {
        display: flex;
        justify-content: center;
    }
    ul {
        display: flex;
        flex-wrap: wrap;
        font-size: 0;
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 0;
        min-height: 200px;
        align-content: baseline;
    }
    ul > li {
        margin: 0;
        padding: 0;
    }
</style>