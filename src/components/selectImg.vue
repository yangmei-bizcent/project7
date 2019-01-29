<template>
    <div class="selectImg">
        <!-- <el-button @click="selectImg">选择图片</el-button> -->
        <el-dialog 
            title="选择图片" 
            :visible.sync="isShowSelectImg" 
            v-if="isShowSelectImg" 
            width="700px"
            @close="closeSelectImageDlg">
            <div class="line"></div>
            <div class="container">
                    <ul class="containerLeft">
                        <li v-for="(item,index) in imgInformation" :key="index">{{item.title}} ({{dataList.length}})</li>
                    </ul>
                <div class="containerRight">
                    <el-button type="primary" @click="syncMaterial">同步图文素材</el-button>
                    <ul v-for="(item,index) in dataList" :key="index">
                        <li>
                            <img :src="item.url" @click="confirm(index,item.url,item.title, item)">
                            <div v-show="index == imgIndex" class="selectAlready">
                                <img src="../assets/img/selectAlready.png"> 
                            </div>
                            <span :title="item.title">{{item.title.length>6 ? item.title.substring(0,6)+'...':item.title}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="lineBottom"></div>
            <span slot="footer" class="dialog-footer">
                <!-- <span class="selectAlready">已选1个，可选100个</span> -->
                <el-button @click="closeSelectImageDlg">取 消</el-button>
                <el-button type="primary" @click="confirmSelectImage">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import axios from 'axios';
import {axiosConfig} from '@/service/config.js';
export default {
    data() {
      return {
        imgIndex: -1,
        // dialogVisible: false,
        selectedImgInfo: {},
        url:'',
        title:'',
        dataList:[],
        imgInformation:[
            {
                title:"全部图片"
            }
        ]
      }
    },
    props: ['isShowSelectImg'],
    created(){
         this.selectImg();
    },
    methods: {
        // 关闭弹框
        closeSelectImageDlg() {
            this.$emit('closeSelectImageDlg');
        },
        // 确认图文消息
        confirmSelectImage() {
            this.$emit('confirmSelectImage', { selectImageData: this.selectedImgInfo });
        },
        //同步图片信息
        syncMaterial(){
            axios.get('wechat/material/sync?type=image',axiosConfig)
            .then( res => {
                if(res.data == "同步数据成功"){
                    this.selectImg();
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
        //获取图片信息
        selectImg(){
            //this.dialogVisible = true;
            axios.get('wechat/material/getAllMaterials?type=image',axiosConfig)
            .then( res => {
                console.log('所有图片', res.data)
                this.dataList = res.data

            })
            .catch( error => {
                //console.error(err);
            })
        },
        //选择图片
        confirm(index,url,title, item){
            this.imgIndex = index;
            this.url = url;
            this.title = title;
            this.selectedImgInfo = item;
            // console.log('图片：', item)
        }

    }
}
</script>
<style lang="scss">
    .selectImg{
        .el-dialog__body{
            padding:30px 0;
        }
        .line{
            width:100%;
            height:1px;
            background: #E7E7E7;
            margin-top:-10px;
        }
        .lineBottom{
            width:100%;
            height:1px;
            background: #E7E7E7;
        }
        .container{
            width:100%;
            min-height:362px;
            margin-top:15px;
             .containerLeft{
                 width:149px;
                 min-height: 362px;
                 max-height: 370px;
                 overflow-y: auto;
                 border-right:1px solid #FFFFFF;
                 box-shadow: 1px 0 0 0 #E7E7E7;
                 font-size: 14px;
                 color: #333333;
                 float:left;
                 li{
                     height:32px;
                     line-height: 32px;
                     text-align: center;
                 }
                 li:hover{
                     background: #EEF0F1;
                 }
             }
             .containerRight{
              width:550px;
              float:left;
              min-height: 362px;
              max-height: 365px;
                overflow-y: auto;
               .el-button--primary{
               float:left;
               margin-left:394px;
               margin-top:10px;
            }
            li{
               width:112px;
               height:132px;
               display: block;
               float:left; 
               margin:20px 0 0 19px;
               border: 1px solid #E7E7E7;
               position:relative;
               img{
                   display: block;
                   width:100px;
                   height:100px;
                   margin:0 auto;
               }
               .selectAlready{
                   position:absolute;
                   top:0;
                   left:0;
                   width:112px;
                   height:100px;
                    img{
                        width:100%;
                        height:100%;
                    }
               }
               span{
                   display: inline-block;
                   font-size: 12px;
                    color: #333333;
                    width:100%;
                    text-align: center;
                    padding-top:5px;
               }
            }
             }
        }
        .dialog-footer{
            clear: both;
        }
        
    }
</style>