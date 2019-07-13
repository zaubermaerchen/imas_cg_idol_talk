<template>
    <img v-bind:src="getImagePath()" width="60" v-on:click="click" />
</template>

<script lang="ts">
    export default {
        name: "idol_image",
        props: [
            "index",
            "id",
        ],
        methods: {
            getImagePath(): string {
                if (this.id > 0) {
                    return "https://zaubermaerchen.info/imas_cg/image/idol/ls/" + this.id + "/";
                } else {
                    return "images/blank_ls.jpg";
                }
            },
            click(): void {
                this.$emit("click", this.index, this.id);
            }
        }
    }
</script>

<style scoped>
    img {
        cursor: pointer;
    }
</style>