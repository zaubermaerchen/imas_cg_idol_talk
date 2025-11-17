<script setup lang="ts">
interface Props {
  direction: 'top' | 'bottom'
  message: string
}

const props = defineProps<Props>()
</script>

<template>
  <p v-bind:class="[props.direction, 'cute', 'position0']">{{ props.message }}</p>
</template>

<style scoped>
p {
  min-height: 1.45em;
  color: #1d1d1d;
  background: #ffffff;
  margin: 0;
  padding: 5px 10px;
  word-wrap: break-word;
  border: solid 3px #0080ff;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}

p::before,
p::after {
  position: absolute;
  content: ' ';
  width: 0;
  height: 0;
  border: solid 0 transparent;
}

p::before {
  border-width: 0 6px;
}
p::after {
  border-width: 0 4px;
}

p.top {
  margin-bottom: 12px;
}
p.top:before {
  border-top: solid 12px #0080ff;
  bottom: -12px;
}
p.top:after {
  border-top: solid 9px #fff;
  bottom: -8px;
}

p.bottom {
  margin-top: 12px;
}
p.bottom:before {
  border-bottom: solid 12px #0080ff;
  top: -12px;
}
p.bottom:after {
  border-bottom: solid 9px #fff;
  top: -8px;
}

p.cute {
  border-color: #f36;
}
p.cool {
  border-color: #0080ff;
}
p.passion {
  border-color: #ffb025;
}

p.top.cute:before {
  border-top-color: #f36;
}
p.top.cool:before {
  border-top-color: #0080ff;
}
p.top.passion:before {
  border-top-color: #ffb025;
}

p.bottom.cute:before {
  border-bottom-color: #f36;
}
p.bottom.cool:before {
  border-bottom-color: #0080ff;
}
p.bottom.passion:before {
  border-bottom-color: #ffb025;
}

p.position0:before {
  left: 138px;
}
p.position0:after {
  left: 140px;
}
p.position1:before {
  left: 78px;
}
p.position1:after {
  left: 80px;
}
p.position2:before {
  left: 198px;
}
p.position2:after {
  left: 200px;
}
p.position3:before {
  left: 18px;
}
p.position3:after {
  left: 20px;
}
p.position4:before {
  left: 258px;
}
p.position4:after {
  left: 260px;
}
</style>
