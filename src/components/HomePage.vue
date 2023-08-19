<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container" style="padding: 10px">
                <a class="navbar-brand" href="#">Mi Aplicación</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="btn btn-danger btn-logout" @click="cerrarSesion">Cerrar Sesión</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <div class="content">
            <div class="card-container">
                <div v-for="(item, index) in products" :key="index" class="card">
                    <img :src="item.foto" class="card-img-top" alt="Card Image">
                    <div class="card-body shadow p-3 mb-5 bg-body rounded">
                        <h5 class="card-title">{{ item.nombre }}</h5>
                        <p class="card-text">{{ item.descripcion }}</p>
                        <button @click="addOrRemove(item)" class="btn bt-success">Añadir Carrito</button>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <div class="container">
                <p>&copy; {{ currentYear }} Mi Aplicación. Todos los derechos reservados.</p>
            </div>
        </footer>
    </div>


</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            cardItems: [],
            products: [],
            currentYear: new Date().getFullYear(),
        };
    },
    mounted() {
        this.fetchCardItems();
    },
    methods: {
        async fetchCardItems() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/comida');
                console.log(response);
                this.products = response.data; 
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        },
        cerrarSesion() {

            localStorage.removeItem('token');
            this.$router.push('/LoginForm');
        },
        addToCart(product) {
            localStorage.setItem('carrito', product);
        },


        async addOrRemove(product){
                    this.$store.commit('addRemoveCart',{product:product,toAdd:true})
                    console.log("por aca");
    
         }
    },
}
</script>
<style>
.content {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 1200px;
    width: 100%;
    justify-content: center;
}

.card {
    width: 300px;
    border: 1px solid #ccc;
    overflow: hidden;
}

.card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-body {
    padding: 1rem;
}

.footer {
    background-color: #f8f9fa;
    padding: 20px 0;
    text-align: center;
    bottom: 0;
    width: 100%;
}

.btn-logout {
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>