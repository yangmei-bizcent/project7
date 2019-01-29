<template>
    <header 
        class="index-module-header fontsize30 color-454545 flex-align-justify paddingtop70" 
        :class="theme">
        <div class="relative">
            <div class="flex-align-justify-column bold">
                <p>{{ headerText }}</p>
                <div class="bottom-line"></div>
            </div>
            <span 
                v-if="hasMore==true?true:false"
                @click="toMore"
                class="fontsize-2 marginleft15 cursorPointer absolute sub-header">MORE&nbsp;&rarr;</span>
        </div>
        <!-- <span 
            v-if="hasMore==true?true:false"
            class="fontsize-2 marginleft15 cursorPointer">MORE&nbsp;&rarr;</span> -->
    </header>
</template>

<script>
export default {
    props: ['headerText', 'theme', 'hasMore'],
    data() {
        return {

        }
    },
    methods: {
        toMore() {
            this.$router.push('/corporateCom/corporateCom');
        },
    }
}
</script>

<style lang="scss">
    .index-module-header {

        .bottom-line {
            width: 70px;
            height: 3px;
            background-color: #00b240;
            margin-top: 17px;
        }
        &.theme-white {
            * {
                color: #fff;
            }
        }
        .sub-header {
            top: 22px;
            right: -78px;
        }
    }
</style>


