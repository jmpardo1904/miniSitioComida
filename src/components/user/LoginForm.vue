<template>
    <div class="container-fluid">
        <div class="row no-gutter">
            <div class="col-md-6 d-none d-md-flex bg-image"></div>
            <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto">
                                <h3 class="display-4">Iniciar Sesión</h3>
                                <p class="text-muted mb-4">Mini plataforma de pedidos </p>
                                <form @submit="login">
                                    <div class="mb-3">
                                        <input type="email" v-model="email" placeholder="Email address" autofocus=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4" />
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" v-model="password" placeholder="Password"
                                            class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                    </div>
                                    <div class="d-grid gap-2 mt-2">
                                        <button type="submit"
                                            class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Iniciar
                                            Sesión</button>
                                    </div>
                                    <div class="d-grid gap-2 mt-2">
                                        <router-link to="/RegisterForm"
                                            class="btn btn-success btn-block text-uppercase mb-2 rounded-pill shadow-sm">Registrarse</router-link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        login(e) {
            e.preventDefault();
            axios.post('http://127.0.0.1:8000/api/login', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    console.log(response);
                    if (response.data.ok) {
                        console.log("entra al if");
                        localStorage.setItem('token', response.data.token);
                        this.$router.push('HomePage');
                    } else {
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Usuario o contraseña incorrecta'
                        });
                    }
                })
                .catch(error => {
                    console.log("res>>>>", error.response.data.errors);
                    if (error.response && error.response.data) {
                        this.errors = error.response.data.errors;
                        this.$swal({
                            icon: 'error',
                            title: 'Oops...',
                            html: this.errorMessage
                        });
                    }
                });
        }
    }

}
</script>