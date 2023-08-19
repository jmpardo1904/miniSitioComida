<template>
    <div class="container-fluid">
        <div class="row no-gutter">

            <div class="col-md-6 d-none d-md-flex bg-image-registro"></div>

            <div class="col-md-6 bg-light">
                <div class="login d-flex align-items-center py-5">

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 col-xl-7 mx-auto">
                                <h3 class="display-4">Registrate</h3>
                                <p class="text-muted mb-4">ingresa los siguientes datos:</p>
                                <form @submit="register">
                                    <div class="mb-3">
                                        <input type="text" v-model="name" placeholder="Nombre del Usuario" autofocus=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4" />
                                    </div>
                                    <div class="mb-3">
                                        <input type="email" v-model="email" placeholder="Correo" autofocus=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4" />
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" v-model="password" placeholder="Contraseña"
                                            class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" v-model="password_confirmation"
                                            placeholder="Confirmar Contraseña" required=""
                                            class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                    </div>
                                    <div class="d-grid gap-2 mt-2">
                                        <button type="submit"
                                            class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Registrarme</button>
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
export default {
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        }
    },
    computed: {
        errorMessage() {
            let messages = [];
            if (this.errors.email) messages.push(this.errors.email);
            if (this.errors.name) messages.push(this.errors.name);
            if (this.errors.password) messages.push(this.errors.password);
            if (this.errors.password_confirmation) messages.push(this.errors.password_confirmation);
            return messages.join('<br>');
        }
    },
    methods: {
        register(e) {
            e.preventDefault();
            axios.post('http://127.0.0.1:8000/api/registro', {
                name: this.name,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
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
};
</script>
