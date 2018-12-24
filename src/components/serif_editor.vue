<template>
    <section>
        <h2>トークメンバー</h2>
        <p>
            <select v-model="new_position">>
                <option v-for="(option, index) in positions" v-bind:value="index">{{ option.name }}</option>
            </select>
        </p>
        <h2>トーク内容</h2>
        <p>
            <input type="text" v-model="new_message" />
        </p>

        <p>
            <button type="button" v-on:click="click">更新</button>
        </p>
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
    select {
        font-size: 16px;
        border-radius: 3px;
        box-shadow: none;
        padding: .5em 2px;
        border: 1px solid #bbb;
    }
    input[type="text"] {
        width: 100%;
        font-size: 16px;
        border-radius: 3px;
        box-shadow: none;
        padding: .5em;
        border: 1px solid #bbb;
    }
    button {
        font-size: 16px;
        border-radius: 3px;
        box-shadow: none;
        padding: .5em 2em;
        border: 1px solid #bbb;
    }
</style>