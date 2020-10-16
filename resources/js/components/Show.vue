<template>
    <transition name="fade">

        <div>

            <div class="flex p-8">
                <img :src="image" alt="">

                <div class="ml-5 text-white">
                    <h3 class="text-2xl mt-5 underline">{{ title }}</h3>

                    <div class="flex mb-3 mt-2 text-sm font-mono">
                        <span class="mr-2">{{ released }} |</span>
                        <span class="mr-2">{{ type }} |</span>
                        <span>{{ runtime }}</span>
                    </div>

                    <p class="text-sm" v-html="synopsis"></p>
                </div>


            </div>

        </div>
    </transition>

</template>

<script>
    export default {
        props: ['title', 'image', 'type', 'runtime', 'released', 'synopsis'],
        mounted() {
            //
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s ease-out;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
