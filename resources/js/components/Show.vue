<template>
    <transition name="fade">

        <div>

            <div class="flex flex-wrap justify-center items-start p-4 sm:p-8">
                <img :src="image" alt="" class="w-1/3 md:w-auto">

                <div class="pl-4 text-white w-2/3">
                    <h3 class="text-xl sm:text-2xl md:mt-5 underline">{{ title }}</h3>

                    <div class="flex mb-3 mt-2 text-xs sm:text-sm font-mono">
                        <span class="mr-2">{{ released }} |</span>
                        <span class="mr-2">{{ type }}</span>
                    </div>


                    <p class="text-sm sm:text-base" v-html="synopsis"></p>
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
