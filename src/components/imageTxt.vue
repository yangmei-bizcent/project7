<template>
    <div class="imageTxt">
        <!-- <el-button @click="select">选择素材库图文消息</el-button> -->
        <el-dialog 
            title="选择素材库图文消息" 
            :visible.sync="isShowImageText" 
            v-if="isShowImageText" 
            width="612px"
            @close="closeImageTextDlg">
            <div class="line"></div>
            <div class="container">
                <div class="uploadMaterial">
                    <el-button type="primary" @click="syncMaterial">同步图文素材</el-button>
                </div>
                <!-- 瀑布流布局 -->
                <vue-waterfall-easy
                    :imgsArr="imgContainer" style="height:330px;"
                    :loadingDotCount="Number('0')"
                    :imgWidth="Number('250')"
                    :maxCols="Number('2')"
                    srcKey="title">
                    <div class="img-info" slot-scope="props" @click="checkImgtxt(props.index,props.value)">
                        
                        <!-- 图文消息head部分 -->
                        <div class="checkImgtxt" v-show="confirm == props.index"> 
                                <img src="../assets/img/selectAlready.png"> 
                        </div>
                        <div class="imgHead" v-for="(item2,index2) in (props.value.list ? props.value.list.slice(0,1) : [])" :key="index2" >
                            <img :src="item2.thumbUrl">
                            <div class="imgTitle">{{item2.title}}</div>
                        </div>
                        <div class="content" v-for="(item3,index3) in (props.value.list ? props.value.list.slice(1,props.value.list.length) : [])" :key="index3">
                            <span class="contentTitle paddingright10">{{item3.title}}</span>
                            <span class="imgBody"><img :src="item3.thumbUrl"></span>
                        </div>
                    </div>
                </vue-waterfall-easy>
            </div>
            <div class="line"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeImageTextDlg" class="cancel">取 消</el-button>
                <el-button type="primary" @click="confirmImageText">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios';
import {axiosConfig} from '@/service/config.js';
export default {
     data() {
      return {
        //   imageTxt:false,
        selectedImageText: {},
        imgContainer:[],
        confirm:-1,
      };
    },
    props: ['isShowImageText'],
    components: {
        vueWaterfallEasy
    },    
    created(){
        this.getImgTxt();
    },
    methods: {
        // 关闭弹框
        closeImageTextDlg() {
            this.$emit('closeImageTextDlg');
        },
        // 确认图文消息
        confirmImageText() {
            this.$emit('confirmImageText', { imageTextData: this.selectedImageText });
        },
        //同步图文素材
        syncMaterial(){
            axios.get('wechat/material/sync?type=news',axiosConfig)
            .then( res => {
                if(res.data == "同步数据成功"){
                    this.getImgTxt();
                    this.$message.success("同步数据成功")
                }
                else{
                    this.$message.error("同步数据失败")
                }
            })
            .catch( error => {
                //console.error(err);
            })
        },
        //打开弹框
        // select(){
        //     this.imageTxt = true;
        // },
        //获取选中图文消息信息
        checkImgtxt(index,value) {
            this.confirm = index;
            this.selectedImageText = value;
            // console.log('选中的图文：', value)
        },
        //获取图文消息列表
         getImgTxt(){
             axios.get('wechat/material/getAllMaterials?type=news',axiosConfig)
            .then( res => {
                // console.log('所有图文', res.data)
                this.imgContainer = res.data
            })
            .catch( error => {
                //console.error(err);
            })
        }
    }
}
</script>
<style lang="scss">
    .imageTxt{
        .line{
            width:100%;
            height:1px;
            background: #E7E7E7;
        }
        .el-dialog__title{
            font-size: 16px;
            color: #333333;
            font-weight:bold;
        }
        .el-dialog__body{
            padding: 0;
        }
        .uploadMaterial{
            padding:20px 32px;
            .el-button--primary{
               float:left;
               margin-left:400px;
            }
        }
        .container{
            // min-height:400px;
            // max-height:410px;
            // overflow-y:auto;
            height:400px;
        }
        .uploadContent{
            width:100%;
        }
        .cancel{
           border: 1px solid #35B53F;
           color:#35B53F;
        }
        .uploadContent{
            width:100%;
        }
        .GraphicMessage{
            width:250px;
            height:auto;
            border: 1px solid #CCCCCC;
            margin:36px 0 10px  32px;
            float:left;
        }
    }
    .alink.img-wraper{
        height:0 !important;
    }
    .imgHead{
                width:222px;
                height:110px;
                margin:14px auto ;
                position:relative;
                img{
                    width:100%;
                    height:100%;
                }
                .imgTitle{
                padding:2px 13px;
                position:absolute;
                left:0;
                bottom: 0;
                width:222px;
                height:28px;
                background: rgba(0,0,0,0.40);
                font-size: 14px;
                color: #FFFFFF;
                line-height: 28px;
            }
            }
     .content{
                height:45px;
                width:100%;
                font-size: 14px;
                color: #333333;
                padding:0px 27px;
                margin-top:10px;
                line-height: 45px;
               border-top:1px solid #E7E7E7;
                .contentTitle{
                    width:150px;
                    height:45px;
                    display: block;
                    float:left;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .imgBody{
                    display:block;
                    float:right;
                    width:37px;
                    height:45px;
                    margin-top:4px;
                    img{
                        width:37px;
                        height:37px;
                    }
                }
            }
            .checkImgtxt{
                   position:absolute;
                   top:10px;
                   left:10px;
                   width:250px;
                   height:100%;
                   z-index:999;
                    img{
                        width:100%;
                        height:100%;
                    }
               }
</style>