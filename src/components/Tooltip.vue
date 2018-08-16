<template>
  <div class="tooltip tooltip_position" v-bind:class="typeTooltip">
    <p class="tooltip__message">{{ $store.state.msgTooltip }}</p>
    <button class="tooltip__button" v-on:click="closeTooltip">X</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timerId: 0
    };
  },
  computed: {
    typeTooltip() {
      if (this.$store.state.typeTooltip == "error") return "tooltip__error";
      else if (this.$store.state.typeTooltip == "success")
        return "tooltip__success";
    }
  },
  methods: {
    closeTooltip() {
      clearTimeout(this.timerId);
      this.$store.commit("SET_ACTIVE_TOOLTIP", {
        msgTooltip: "",
        typeTooltip: ""
      });
    }
  },
  mounted() {
    let id = setTimeout(() => {
      this.$store.commit("SET_ACTIVE_TOOLTIP", {
        msgTooltip: "",
        typeTooltip: ""
      });
    }, this.$store.state.timeAliveTooltip);
    this.timerId = id;
  }
};
</script>

<style>
.tooltip_position {
  position: relative;
  height: 50px;
  border-radius: 5px;
  width: 98%;
  margin: 0 auto;
  text-align: center;
  color: #000;
  font-size: 18px;
  padding: 5px 0;
}
.tooltip__error {
  background-color: rgba(255, 73, 73, 0.84);
}
.tooltip__success {
  background-color: rgba(66, 202, 78, 0.72);
}
.tooltip__button {
  position: absolute;
  top: 13px;
  right: 10px;
  height: 30px;
  width: 30px;
  background-color: transparent;
  border: 1px solid #0c4f86;
  border-radius: 2px;
  cursor: pointer;
  font-size: 18px;
}
</style>
