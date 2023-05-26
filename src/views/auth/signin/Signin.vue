<template>
    <div class="signin-container">
        <h1>E-TUTOR</h1>
        <span>BY THINGERNET ELECTRONICS</span>
        <img src="@/assets/login-text.png" alt="" draggable="false" class="signin-text-img" >
        <img src="@/assets/login.png" alt="" draggable="false" class="signin-bg" >
        <div class="signin-form-container">
            <input type="text" placeholder="your email" v-model="email">
            <input type="password" placeholder="password" v-model="password" >
            <div class="signin-form-btns">
                <button @click="onSubmit">Sign in</button>
                <div class="google-login-btn">
                    <p>
                        <img src="@/assets/google.png" alt="" draggable="false" >
                    </p>
                    <span>Sign in with Google</span>
                </div>
            </div>
            <div class="signin-new-etutor">
                <span>new in E-Tutor?</span>
                <a @click='gotoSignup'>Sign up</a>
            </div>
        </div>
    </div>
</template>

<script>
import { SERVER_URI } from "@/config";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { openNotification } from "@/components/notification";

export default {
    name: 'SignIn',
    data() {
        return {
            email: "",
            password: "",
        }
    },
    methods: {
        gotoSignup() {
            this.$router.push('/signup');
        },
        onSubmit() {
            const { email, password } = this;
            axios.post(`${SERVER_URI}/api/users/signin`, { email, password })
                .then(res => {
                    if(res) {
                        const { token } = res.data;
                        // set token to localstorage
                        localStorage.setItem("jwtToken", token);
                        //decode token to get user data
                        const decoded = jwt_decode(token);
                        //set current user
                        this.$store.dispatch('auth/signIn', decoded);
                        this.$router.push('/home');
                        openNotification('success', 'Success', 'successfully signed in.');
                    }
                })
                .catch(err => openNotification('warn', 'Warn', err.response.data.msg))
        }
    }
}
</script>

<style scoped>
    @import './styles.css';
</style>