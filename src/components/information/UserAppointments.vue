<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';



const toast = useToast();
const pay = ref(false);
const products = ref(null);
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref(null);
const dt = ref(null);
const filters = ref({});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' },
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);


const pagoSuccesfull = () => {
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Pago realizado', life: 3000 });
}


onBeforeMount(() => {
    initFilters();
});

/* getProdcutSmall se recupera desde service donde estan todas las fotos y datos de los platos */
onMounted(() => {

});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;
    if (product.value.name && product.value.name.trim() && product.value.price) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        productDialog.value = false;
        product.value = {};
    }
};

const editProduct = (editProduct) => {
    product.value = { ...editProduct };
    console.log(product);
    productDialog.value = true;
};

const confirmDeleteProduct = (editProduct) => {
    product.value = editProduct;
    deleteProductDialog.value = true;
};

const deleteProduct = () => {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};


const confirmDeleteSelected = () => {
    deleteProductsDialog.value = true;
};
const deleteSelectedProducts = () => {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};
</script>


<template>
    <div class="surface-card p-5 shadow-2 border-round flex-auto xl:ml-5 ">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <h5 class="m-0">Estado de tus citas</h5>
                        </div>
                    </template>
                </Toolbar>
                <DataTable ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id" :paginator="true"
                    :rows="10" :filters="filters"
                    paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5, 10, 25]"
                    currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} citas"
                    responsiveLayout="scroll">

                    <!-- HEADER -->
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between gap-4 md:align-items-center">
                            <div class="flex gap-2">
                                <Button icon="pi pi-file-edit"  class="p-button-rounded"
                                    @click="pay = true"></Button>
                                <Button  icon="pi pi-ban" class="p-button-danger p-button-rounded"
                                    @click="confirmDeleteSelected"
                                    :disabled="!selectedProducts || !selectedProducts.length" />
                            </div>

                            <span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                            </span>
                        </div>
                    </template>

                    <!-- APPOINTMENTS TABLE -->

                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column field="code" header="Codigo" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">Codigo</span>
                            {{ slotProps.data.code }}

                        </template>
                    </Column>
                    <Column field="name" header="Terapeuta" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">Terapeuta</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column field="therapy" header="Tipo de Terapia" :sortable="true"
                        >
                        <template #body="slotProps">
                            <span class="p-column-title">Tipo de Terapia</span>
                            {{ slotProps.data.name }}
                        </template>
                    </Column>

                    <Column field="price" header="Monto" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">Monto</span>
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="status" header="Estado" :sortable="true" >
                        <template #body="slotProps">
                            <span class="p-column-title">Estado</span>
                            {{ slotProps.data.category }}
                        </template>
                    </Column>
                </DataTable>
            </div>
</template>



<style scoped></style>