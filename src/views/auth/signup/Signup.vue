<template>
    <div class="signup-container">
        <h1>Tus datos</h1>
        <p>1-click sign up with google</p>
        <div class="google-login-btn">
            <p>
                <img src="@/assets/google.png" alt="" draggable="false" >
            </p>
            <span>Sign in with Google</span>
        </div>
        <span>or use your mail and password</span>
        <div class="signup-form-container">
            <label>Name</label>
            <input type="text" v-model="name" placeholder="enter your name">

            <label>Email</label>
            <input type="text" v-model="email" placeholder="enter your email">

            <label>Password</label>
            <input type="password" v-model="password" placeholder="enter a password">
        </div>
        <div class="gdpr-container">
            <input type="checkbox" :checked="isAccept" @click="handleGDPR">
            <span>
                I accept <b>terms & conditions</b> and <b>data protection</b>
            </span>
        </div>
        <button @click='onSubmit'>Sign up</button>
    </div>
</template>

<script>
import { SERVER_URI } from "@/config";
import axios from "axios";
import { openNotification } from "@/components/notification";

export default {
    name: 'SignUp',
    data() {
        return {
            isAccept: false,
            name: "",
            email: "",
            password: "",
        }
    },
    methods: {
        handleGDPR() {
            var { isAccept } = this;
            this.isAccept = !isAccept;
        },
        onSubmit() {
            const { name, email, password, isAccept } = this;
            if(!isAccept) {
                openNotification('warn', 'Warn', 'You must accept terms & conditions and data protection.');
                return;
            }
            axios.post(`${SERVER_URI}/api/users/signup`, { name, email, password })
                .then(res => {
                    if(res) {
                        this.$router.push('/');
                        openNotification('success', 'Success', 'successfully registered.')
                    }
                })
                .catch(err => openNotification('warn', 'Warn', err.response.data.msg))
            
            // console.log('login-data: ', this.$store.state.auth.authUserList);
        }
    }
}
</script>

<style scoped>
    @import './styles.css';
</style>