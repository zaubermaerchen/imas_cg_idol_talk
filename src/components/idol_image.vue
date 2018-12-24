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
                if (this.id == 0) {
                    this.$emit("click", this.index, "");
                } else {
                    const url = new URL("https://zaubermaerchen.info/imas_cg/api/idol/" + this.id + "/");

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
                        this.$emit("click", this.index, json.name);
                    })
                }
            }
        }
    }
</script>

<style scoped>
    img {
        cursor: pointer;
    }
</style>