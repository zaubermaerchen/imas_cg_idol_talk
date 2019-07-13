<template>
    <section>
        <el-select v-model="new_position" placeholder="トークメンバー">
            <el-option v-for="(option, index) in positions" v-bind:key="index" v-bind:label="option.name" v-bind:value="index"></el-option>
        </el-select>
        <el-input placeholder="トーク内容" v-model="new_message"></el-input>
        <el-button type="primary" v-on:click="click">更新</el-button>
    </section>
</template>

<script lang="ts">
    export default {
        name: "serif_editor",
        props: [
            "top",
            "position",
            "message",
        ],
        data: function () {
            return {
                positions: [
                    { index : 2, name : "リーダー" },
                    { index : 1, name : "メンバー1" },
                    { index : 3, name : "メンバー2" },
                    { index : 0, name : "メンバー3" },
                    { index : 4, name : "メンバー4" }
                ],
                new_position: this.position,
                new_message: this.message,
            };
        },
        methods: {
            isFirst(index: number): string {
                return index == 0 ? "selected" : "";
            },
            click(): void {
                const index = this.positions[this.new_position].index;
                this.$emit("change", this.top, index, this.new_message);
            }
        },
        watch: {
            position: {
                handler(val: number) {
                    this.new_position = val;
                }
            },
            message: {
                handler(val: string) {
                    this.new_message = val;
                }
            }
        }
    }
</script>

<style scoped>
    section {
        width: auto;
        max-width: 800px;
    }
    .el-select, .el-input {
        margin-bottom: 1em;
    }
</style>