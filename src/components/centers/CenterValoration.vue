<script setup>
import { ref, onMounted, inject } from 'vue';
/* import { useRouter, useRoute } from 'vue-router'; */

const comentsCenters = ref([])
const getValueComments = inject("comentsCenters", "vacio")
comentsCenters.value = getValueComments
</script>

<template>
    <div class="mt-5">
        <ul class="list-none m-0 p-0">
            <li class="py-5 border-top-1 surface-border" v-for="(comment, index) in comentsCenters.value"
                :key="index">
                <div class="calification flex align-items-start justify-content-between mb-3">
                    <div class="flex align-items-start">
                        <!-- <img src="/layout/images/iconos/ic_account.svg" class="w-3rem h-3rem flex-shrink-0 mr-3" /> -->
                        <img  v-if=" comment.User_Image" :src="'data:image/jpg;base64,' + comment.User_Image" style="border-radius: 30px;" class="w-3rem h-3rem flex-shrink-0 mr-3"  alt="user_comment_image">
                        <Avatar v-else icon="pi pi-user" style="border-radius: 30px;" class="mr-2" size="large" shape="circle" />

                        <div class="flex flex-column">
                            <span class="text-900 font-medium mb-1">{{ " " + comment.FirstName + " " + comment.LastName
                            }}</span>
                            <span class="text-500 font-medium text-sm">{{ comment.CreateDate }}</span>
                        </div>
                    </div>
                    <div class="flex align-items-center">
                        <span class="mr-2">
                            <Rating v-model="comment.Number" :cancel="false" readonly />
                        </span>
                        <span class="font-medium">{{ comment.Number }}</span>
                    </div>
                </div>
                <p class="text-600 p-0 m-0 line-height-3">{{ comment.CommentReply }}</p>
            </li>
        </ul>
    </div>
</template>


<style scoped>
@media screen and (max-width: 700px) {

    /* Responsive*/

    .mt-5 {
        display: flex;
        flex-direction: column;
    }

    .calification {
        display: flex;
        flex-direction: column;
    }

}
</style>