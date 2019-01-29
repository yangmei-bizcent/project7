<template>
    <div class="flex-alignstart-justifystart-column experience-tab-content marginbottom40">
        <div 
            :id="'experItem'+tabIndex+index"
            v-for="(item, index) in experienceList" 
            :key="index" 
            class="flex-alignstart-justify-column width-percent-60 marginleft60 height110 cursorPointer borderRadius8 marginbottom10 experience-list-item"
            @mouseover="expericeHover(tabIndex, index, item.imgUrl)">
            <p class="fontsize2 color-333 lineheight22 marginbottom12">{{ item.title }}</p>
            <p class="fontsize0 color-666 lineheight20">{{ item.desc }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: ['tabIndex', 'experienceList'],
    methods: {
        expericeHover(tabIndex, index, url) {
            for(let i=0; i<this.experienceList.length; i++) {
                if(i != index) {
                    let _hoverItem = document.getElementById('experItem'+tabIndex+i)
                    _hoverItem.style.animation = '';
                    _hoverItem.style.borderLeftColor = 'transparent';
                    _hoverItem.style.backgroundColor = 'transparent';
                    _hoverItem.style.boxShadow = 'none';
                }
            }
            let _hoverItem = document.getElementById('experItem'+tabIndex+index)
            _hoverItem.style.animation = 'experhover 0.4s ease';
            _hoverItem.style.borderLeft = '6px solid #00b240';
            _hoverItem.style.backgroundColor = '#fff';
            _hoverItem.style.boxShadow = '0 4px 60px rgba(0,0,0,0.17)';
            this.$emit('expericeHover', {imgUrl: url});
        },
    },
}
</script>

<style lang="scss">
    .experience-tab-content {
        min-height: 600px;
        margin-top: 27px;
        .width-percent-60 {
            width: 60%;
        }
        .lineheight22 {
            line-height: 22px;
        }
        .marginbottom12 {
            margin-bottom: 12px;
        }
        .experience-list-item {
            padding-left: 24px;
            padding-right: 40px;
            background-color: transparent;
            box-shadow: none;
            border-left: 6px solid transparent;
            &:first-child {
                border-left: 6px solid #00b240;
                background-color: #fff;
                box-shadow: 0 4px 60px rgba(0,0,0,0.17);
            }
            // &:hover {
            //     animation: experhover 0.4s ease;
            //     border-left: 6px solid #00b240;
            //     background-color: #fff;
            //     box-shadow: 0 4px 60px rgba(0,0,0,0.17);
            // }
        }
        @-webkit-keyframes experhover{
            0%{
                border-left-color: transparent;
                background-color: transparent;
                box-shadow: none;
            }
            100%{
                border-left: 6px solid #00b240;
                background-color: #fff;
                box-shadow: 0 4px 60px rgba(0,0,0,0.17);
            }
        }
        @keyframes experhover{
            0%{
                border-left-color: transparent;
                background-color: transparent;
                box-shadow: none;
            }
            100%{
                border-left: 6px solid #00b240;
                background-color: #fff;
                box-shadow: 0 4px 60px rgba(0,0,0,0.17);
            }
        }
    }
</style>


