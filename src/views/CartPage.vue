<template>
    <div class="container">
        <h1>Carrito</h1>
        <hr>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Imagen</th>
                    <th scope="col">Item</th>
                    <th scope="col">Cantidad</th>
                </tr>
            </thead>
            <tbody id="items">
                
                <tr v-for="item in $store.state.cart" :key="item.id">
                    <td> <img :src="item.foto" class="img-fluid rounded-3"
                                                            alt="Shopping item" style="width: 65px;"></td>
                    <td>{{ item.nombre }}</td>
                    <td>1</td>
                </tr>
            </tbody>
            <tfoot>
                <tr id="footer">
                    <th scope="row" colspan="5" class="text-end">Total: {{ $store.state.cart.length }}</th>
                </tr>
            </tfoot>
        </table>
        <div class="row" id="cards"></div>
    </div>
    <template id="template-carrito">
        <tr>
            <th scope="row">id</th>
            <td>Café</td>
            <td>1</td>
            <td>
                <button class="btn btn-info btn-sm">
                    +
                </button>
                <button class="btn btn-danger btn-sm">
                    -
                </button>
            </td>
            <td>$ <span>500</span></td>
        </tr>
    </template>

    
    <cart-add-remove />

    <template id="template-card">
        <div class="col-12 mb-2 col-md-4">
            <div class="card">
                <img src="" alt="" class="card-img-top">
                <div class="card-body">
                    <h5>Titulo</h5>
                    <p>precio</p>
                    <button class="btn btn-dark">Comprar</button>
                </div>
            </div>
        </div>
    </template>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
import CartAddRemove from '../components/CartAddRemove.vue';
export default {
    components: {
        CartAddRemove,
    },
    methods: {
        removeItem(item) {
            this.$store.commit('addRemoveCart', { product: item, toAdd: false })
        },

    },
    mounted() {

    }

}
</script>