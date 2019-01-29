<template>
    <div class="page-container page-autoreply">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick">
            <el-tab-pane label="关键词回复" name="keyReply"></el-tab-pane>
            <el-tab-pane label="收到消息回复" name="receiveReply"></el-tab-pane>
            <el-tab-pane label="被关注回复" name="caredReply"></el-tab-pane>
        </el-tabs>
        <section class="tab-content">
            <div class="flex-align-justifybetween height143">
                <div class="fontsize0 color-999 lineheight19">
                    <p class="fontsize2 color-4a4a4a lineheight21 marginbottom20">自动回复</p>
                    <p class="marginbottom10">通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。<a @click="viewdetails" href="javascript:void(0)" style="color: #3C9EF8;text-decoration:underline;">查看详情</a></p>
                    <p>关闭自动回复之后，将立即对所有用户生效。</p>
                </div>
                <div>
                    <el-switch 
                        v-model="ifOpenReply" 
                        active-color="#35b53f">
                    </el-switch>
                </div>
            </div>
            <div class="paddingtop30 wrap-table" v-show="switchTab">
                <!-- table -->
                <div v-show="addContent">
                    <div class="flex-justify marginbottom30">
                        <el-input
                            placeholder="搜索关键词／规则名称"
                            suffix-icon="el-icon-search"
                            v-model="input4"  class="width240">
                        </el-input>
                        <el-button type="primary" @click="addContent=false">添加回复</el-button>
                    </div>
                    <el-table
                        :data="replyRulesData"
                        border
                        empty-text="未添加回复"
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column prop="rulesName" label="规则名称" align="center" width="120"></el-table-column>
                        <el-table-column prop="replyKey" label="关键词" align="center"></el-table-column>
                        <el-table-column prop="replyContent" label="回复内容" align="center"></el-table-column>
                        <el-table-column prop="oprate" label="操作" align="center">
                            <template slot-scope="scope">
                                <a class="Keyword_operation" href="javascript:void(0)" @click="toDetail(scope.row)">详情</a>
                                <a class="Keyword_operation" href="javascript:void(0)" @click="editoDetail(scope.row.applyCode)">编辑</a>
                                <a class="Keyword_operation" href="javascript:void(0)" @click="DeltoDetail(scope.row.applyCode)">删除</a>
                                
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 添加回复 -->
                <addReplyPage v-if="!addContent" @cancelFun="cancelFun"></addReplyPage>

            </div>
        </section>
            <!-- 查看详情 -->
            <el-dialog :title="dataVal.rulesName" :visible.sync="dialogDetail">
                <el-form ref="form" class="detailForm" label-width="80px">
                    <el-form-item label="关键词">
                        <span>{{dataVal.replyKey}}</span>
                        <span class="lag_span">（半匹配）</span>
                    </el-form-item>
                    <el-form-item label="关键词">
                        <span>{{dataVal.replyContent}}</span>
                    </el-form-item>
                </el-form>
            </el-dialog>


        <DialogInfo :dialogTableVisible="dialogTableVisible" @click="closeX"></DialogInfo>
    </div>
</template>

<script>
import axios from 'axios';
import DialogInfo from '../../components/Viewdetails.vue';
import addReplyPage from '../../components/addReply.vue';
export default {
    data() {
        return {
            activeTab: 'keyReply',
            ifOpenReply: true,
            switchTab:true,
            dialogDetail:false,
            replyRulesData: [{
          "rulesName": "规则1",
          "replyKey": "注册",
          "replyContent": "欢迎注册注册"
        },{
            "rulesName": "规则2",
            "replyKey": "注册",
            "replyContent": "欢迎注册注册"
          }],
            input4:"",
            dialogTableVisible:false,
            dataVal:"",
            addContent:true,

        }
    },
    components: {
        DialogInfo,
       addReplyPage
    },
    mounted() {
        // this.getReplyRulesData();
    },
    methods: {
        editoDetail(){//编辑

        },
        cancelFun(bool){
            this.addContent=bool;
        },
        toDetail(data){//查看详情
            this.dialogDetail=true;
            this.dataVal=data;
        },
        DeltoDetail(){//删除
            this.$alert('确定要删除规则吗？', '', {
                confirmButtonText: '确定',
                callback: action => {
                    if(action!='cancel'){
                        this.$message({
                            type: 'success',
                            message: "删除成功"
                        });
                    }
                    
                }
            });
        },
        closeX(val){
            this.dialogTableVisible=val;
        },
        viewdetails(){//开发文档查看详情
            this.dialogTableVisible=true;
        },
        handleTabClick(tab, event) {
            //console.log(tab, event);
        },
        getReplyRulesData() {
            var self = this;
            axios.get('./static/data/replyRules.json')
            .then(function (response) {
                if(response.status == 200) {
                    self.replyRulesData = response.data.replyRulesData;
                    self.total = response.data.total;
                }
                else {
                    self.$alert(response.data.msg, '提示', );
                }
            })
            .catch(function (error) {
                //console.log(error);
            });
        },
    },
    watch:{
        ifOpenReply(newVal,oldVal){
            this.switchTab=newVal;
             this.addContent=true;
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
    .page-autoreply {
        
        .height143 {
            height: 143px;
        }
        .el-tabs__item {
            font-size: 16px;
            color: #999;
        }
        .el-tabs__item.is-active {
            color: #333;
            font-weight: bold;
        }
        .el-tabs__active-bar {
            background-color: $color-42a84b;
        }
        .el-tabs__nav-wrap::after {
            height: 1px;
            background-color: $color-d8d8d8;
        }
        .wrap-table {
            border-top: 1px solid $color-d8d8d8;
        }
        .width240 {
            width: 240px;
        }
        .Keyword_operation{
            font-size: 14px;
            color: #3C9EF8;
            margin-right: 30px;
        }

        .el-dialog__header{
            border-bottom: 1px solid #E7E7E7;
        }
        .detailForm{
            .el-form-item__label{
                font-size: 16px;
                color: #666666;
            }
           
            span{
                display: inline-block;
                font-size: 16px;
                color: #333333;
                line-height: 22px;
            }
            .lag_span{
                color: #999;
            }
            
        }
         
    }
    .page-container .detailForm .el-form-item__label,.page-container .detailForm .el-form-item__content{
        line-height: 22px;
    }
</style>


