<template>
    <section>
        <section class="idol_talk">
            <serif v-bind:top="true" v-bind:type="top_serif.type" v-bind:position="top_serif.position" v-bind:message="top_serif.message" v-on:click="clickSerif"></serif>
            <draggable class="idol_image" v-model="idols" v-bind:element="'ul'" v-on:start="drag=true" v-on:end="drag=false">
                <li v-for="(idol, index) in idols"><idolimage v-bind:index="index" v-bind:id="idol.id" v-on:click="clickIdol"></idolimage></li>
            </draggable>
            <serif v-bind:top="false" v-bind:type="bottom_serif.type" v-bind:position="bottom_serif.position" v-bind:message="bottom_serif.message" v-on:click="clickSerif"></serif>
        </section>

        <form method="get">
            <input type="hidden" v-for="(idol, index) in idols" v-bind:name="'idol' + index" v-bind:value="idol.id" />
            <input type="hidden" v-for="(idol, index) in idols" v-bind:name="'type' + index" v-bind:value="idol.type" />
            <input type="hidden" name="top_serif" v-bind:value="top_serif.message" />
            <input type="hidden" name="top_serif_index" v-bind:value="top_serif.position" />
            <input type="hidden" name="bottom_serif" v-bind:value="bottom_serif.message" />
            <input type="hidden" name="bottom_serif_index" v-bind:value="bottom_serif.position" />
            <el-button type="primary" native-type="submit">固定URL生成</el-button>
        </form>


        <modal name="idol_editor">
            <idoleditor v-bind:index="edit_idol.index" v-bind:idol_id="edit_idol.idol_id" v-on:click="changeIdol"></idoleditor>
        </modal>
        <modal name="serif_editor">
            <serifeditor v-bind:top="edit_serif.top" v-bind:position="edit_serif.position" v-bind:message="edit_serif.message" v-on:change="changeSerif"></serifeditor>
        </modal>
    </section>
</template>

<script lang="ts">
    import draggable from 'vuedraggable'
    import serif from './components/serif.vue';
    import idoL_image from './components/idol_image.vue';
    import idol_editor from './components/idol_editor.vue';
    import serif_editor from './components/serif_editor.vue';

    export default {
        name: "app",
        components: {
            "draggable": draggable,
            "serif": serif,
            "idolimage": idoL_image,
            "idoleditor": idol_editor,
            "serifeditor": serif_editor,
        },
        data: function () {
            return {
                idols: [
                    { type: 0, position: 3, id: 0 },
                    { type: 0, position: 1, id: 0 },
                    { type: 0, position: 0, id: 0 },
                    { type: 0, position: 2, id: 0 },
                    { type: 0, position: 4, id: 0 },
                ],
                top_serif: {
                    type: 0,
                    position: 0,
                    message: "",
                },
                bottom_serif: {
                    type: 0,
                    position: 0,
                    message: "",
                },
                edit_idol: {
                    index: 0,
                    idol_id: 0,
                },
                edit_serif: {
                    top: true,
                    position: 0,
                    message: "",
                },
            };
        },
        mounted: function (): void {
            this.setParameters();
        },
        methods: {
            setParameters: function(): void {
                const parameters: URLSearchParams = new URLSearchParams(window.location.search);
                if(parameters.has("top_serif")) {
                    this.top_serif.message = decodeURIComponent(parameters.get("top_serif").replace(/\+/g, " ");
                }
                if(parameters.has("bottom_serif")) {
                    this.bottom_serif.message = decodeURIComponent(parameters.get("bottom_serif").replace(/\+/g, " ");
                }
                if(parameters.has("bottom_serif_index")) {
                    this.bottom_serif.position = parseInt(parameters.get("bottom_serif_index"));
                }
                if(parameters.has("top_serif_index")) {
                    this.top_serif.position = parseInt(parameters.get("top_serif_index"));
                }
                for(let index: number = 0; index < this.idols.length; index++) {
                    let key = "type" + index;
                    if(parameters.has(key)) {
                        this.idols[index].type = parseInt(parameters.get(key));
                    }
                    key = "idol" + index;
                    if(parameters.has(key)) {
                        this.idols[index].id = parseInt(parameters.get(key));
                    }

                    if (this.top_serif.position == this.idols[index].position) {
                        this.top_serif.type = this.idols[index].type;
                    }
                    if (this.bottom_serif.position == this.idols[index].position) {
                        this.bottom_serif.type = this.idols[index].type;
                    }
                }
            },
            clickSerif(top: boolean): void {
                let serif = top ? this.top_serif : this.bottom_serif;
                this.edit_serif.top = top;
                this.edit_serif.position = serif.position;
                this.edit_serif.message = serif.message;
                setTimeout(() => {
                    this.$modal.push('serif_editor');
                }, 100);
            },
            changeSerif(top: boolean, index: number, message: string): void {
                let serif = top ? this.top_serif : this.bottom_serif;
                serif.type = this.idols[index].type;
                serif.position = this.idols[index].position;
                serif.message = message;
                this.$modal.pop()
            },
            clickIdol(index: number, idol_id: number): void {
                this.edit_idol.index = index;
                this.edit_idol.idol_id =  idol_id;
                setTimeout(() => {
                    this.$modal.push("idol_editor");
                }, 100);
            },
            changeIdol(index: number, type: number, idol_id: number): void {
                this.idols[index].type = type;
                this.idols[index].id = idol_id;
                if (this.top_serif.position == this.idols[index].position) {
                    this.top_serif.type = type;
                }
                if (this.bottom_serif.position == this.idols[index].position) {
                    this.bottom_serif.type = type;
                }
                this.$modal.pop()
            }
        }
    }
</script>

<style scoped>
    section.idol_talk {
        width: 300px;
        padding: 5px 10px;
        margin: 0 auto;
        background: #000000;
    }

    ul.idol_image {
        display: flex;
        display: -webkit-box;
        font-size: 0;
        margin-top: 0;
        padding-left: 1em;
    }

    ul.idol_image > li {
        margin: 0;
        padding: 0;
        cursor: pointer;
    }
</style>