<template>
  <div class="change-password change-password_position">
    <label>Введите старый пароль:
      <input
        class="base-input"
        type="password"
        placeholder="Старый пароль"
        v-model="oldPassword">
    </label>
    <label class="change-password__label">Введите новый пароль:
      <input 
        class="base-input"
        type="password"
        placeholder="Новый пароль"
        v-model="newPassword">
    </label>
    <label class="change-password__label">Повторите новый пароль:
      <input
        class="base-input"
        type="password"
        placeholder="Новый пароль"
        v-model="repeatNewPassword">
    </label>
    <p class="change-password__wrap-button">
      <button class="base-button" v-on:click="changePassword">Сохранить</button>
    </p>
  </div>
</template>

<script>
import Tooltip from "@/components/Tooltip";

export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: ""
    };
  },
  components: {
    Tooltip
  },
  methods: {
    changePassword() {
      if (this.newPassword === this.repeatNewPassword) {
        if (this.newPassword.length < 6) {
          this.$store.commit("SET_ACTIVE_TOOLTIP", {
            msgTooltip: "Пароль должен быть не менее 6 символов",
            typeTooltip: "error"
          });
        } else {
          this.$store
            .dispatch("changePassword", {
              newPassword: this.newPassword,
              oldPassword: this.oldPassword
            })
            .then(
              () => {
                this.oldPassword = "";
                this.newPassword = "";
                this.repeatNewPassword = "";
                this.$store.commit("SET_ACTIVE_TOOLTIP", {
                  msgTooltip: "Пароль успешно изменен",
                  typeTooltip: "success"
                });
              },
              e => {
                if (e.code == "auth/wrong-password") {
                  this.$store.commit("SET_ACTIVE_TOOLTIP", {
                    msgTooltip: "Старый пароль был введен неправильно",
                    typeTooltip: "error"
                  });
                }
              }
            );
        }
      } else {
        this.$store.commit("SET_ACTIVE_TOOLTIP", {
          msgTooltip: "Пароли не совпадают",
          typeTooltip: "error"
        });
      }
    }
  }
};
</script>

<style>
.change-password_position {
  padding: 10px 0;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.change-password__label {
  display: block;
}
.change-password__wrap-button {
  width: 300px;
  text-align: center;
}
</style>
