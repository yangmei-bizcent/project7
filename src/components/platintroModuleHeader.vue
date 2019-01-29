<template>
    <header 
        class="intro-module-header fontsize10 color-333 marginbottom70 flex-align-justify paddingtop50" 
        :class="theme">
        <div class="flex-align-justify-column">
            <p>{{ headerText }}</p>
            <div class="bottom-line"></div>
        </div>
    </header>
</template>

<script>
export default {
    props: ['headerText'],
    data() {
        return {

        }
    },
}
</script>

<style lang="scss">
    .intro-module-header {
        .bottom-line {
            width: 70px;
            height: 3px;
            background-color: #00b240;
            margin-top: 17px;
        }
    }
</style>


