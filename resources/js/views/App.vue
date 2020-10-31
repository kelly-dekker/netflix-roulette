<template>
    <div class="container mx-auto">
        <h1 class="text-center text-4xl text-white mt-10">Netflix Roulette</h1>

        <div class="mx-3 shadow-2xl flex flex-wrap justify-center  mt-10 bg-black bg-opacity-25 py-10 sm:w-2/3 xl:w-1/2 sm:mx-auto">
            <div class="w-full px-3 md:w-3/4 lg:w-2/3 xl:w-1/2">
                <form action="">
                    <div class="mb-4 flex items-center">
                        <label class="text-white block uppercase tracking-wide text-xs font-bold  mr-5" for="selectGenre">
                            Genre
                        </label>
                        <div class="relative flex-grow">
                            <select v-model="selectedGenre" id="selectGenre" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Selecteer een genre</option>
                                <template v-for="(genre, movie) in genres">
                                    <option v-for="(id, key) in genre" :value="id">{{ key }}</option>
                                </template>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 flex items-center">
                        <span class="text-white block uppercase tracking-wide text-xs font-bold mr-8">Type</span>
                        <div class="text-white">
                            <label class="inline-flex items-center">
                                <input type="radio" v-model="selectedType" class="form-radio text-pink-600 focus:shadow-none focus:border-transparent" name="type" value="Series">
                                <span class="ml-2">Serie</span>
                            </label>
                            <label class="inline-flex items-center ml-6">
                                <input type="radio" v-model="selectedType" class="form-radio text-pink-600 focus:outline-none focus:shadow-none focus:border-transparent" name="type" value="Movie">
                                <span class="ml-2">Film</span>
                            </label>
                        </div>
                    </div>

                    <div class="mt-5">
                        <button  type="button" v-on:click="searchShow" class="focus:outline-none relative rounded-full w-full transition duration-500 ease-in-out bg-gradient-to-r from-red-400 to-red-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-4 py-2 rounded">
                            <svg v-if="loading" class="animate-spin mx-auto h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>

                            <span v-else>Zoeken</span>
                        </button>
                    </div>
                </form>
            </div>


            <template v-if="show">
                <Show
                        :title="show.title"
                        :image="show.image"
                        :type="show.type"
                        :runtime="show.runtime"
                        :synopsis="show.synopsis"
                        :released="show.released"
                ></Show>
            </template>


            <p class="text-white text-center mt-5" v-if="message">
                <img class="mx-auto mb-1" src="/img/cry.svg" alt="" width="50" height="50">
                Er zijn helaas geen series of films gevonden met dit filter.
                <br> Probeer het nog een keer met andere opties.
            </p>


        </div>


        <router-view></router-view>
    </div>

</template>
<script>
    import axios from "axios";
    import Show from '../components/Show';
    import {HTTP} from '../api';


    export default {
        data () {
            return {
                show: null,
                genres: null,
                loading: false,
                showList: null,
                selectedGenre: '',
                selectedType: '',
                message: false
            }
        },
        components: {
            Show
        },
        mounted() {
            const options = {
                method: 'GET',
                url: process.env.MIX_API_URL,
                params: {t: 'genres'},
                headers: {
                    'x-rapidapi-host': process.env.MIX_RAPIDAPI_HOST,
                    'x-rapidapi-key': process.env.MIX_RAPIDAPI_KEY
                }
            };


            axios.request(options).then(result => {
                let genres =  result.data.ITEMS;
                this.genres = genres;
            }, error => {
                console.error(error);
            });
        },
        methods: {
            searchShow: function () {
                let selectedGenre = this.selectedGenre;
                let selectedType = this.selectedType;

                this.loading = true;
                this.message = false;

                // get random id if it is an array with multiple id's
                let random = Math.floor(Math.random() * selectedGenre.length);
                let genreID = selectedGenre[random]; // select genre id if there are multiple id's from genre


                const options = {
                    method: 'GET',
                    url: process.env.MIX_API_URL,
                    params: {
                        q: '-!1900,2020-!0,5-!0,10-!' + genreID + '-!' + selectedType + '-!Any-!Any-!gt100-!{downloadable}',
                        t: 'ns',
                        cl: '67',
                        st: 'adv',
                        ob: 'Relevance',
                        p: '1',
                        sa: 'and'
                    },
                    headers: {
                        'x-rapidapi-host': process.env.MIX_RAPIDAPI_HOST,
                        'x-rapidapi-key': process.env.MIX_RAPIDAPI_KEY
                    }
                };


                axios.request(options).then(result => {
                    let shows =  result.data.ITEMS;
                    let count = result.data.COUNT; // get count of response
                    if (count === '0') {
                        this.message = true;
                    } else {
                        let random = Math.floor(Math.random() * shows.length);
                        let showID = shows[random];
                        this.showList = shows;
                        this.show = showID;
                    }

                }, error => {
                    console.error(error);
                }).finally(() => {
                    this.loading = false
                });
            }
        }
    }
</script>
