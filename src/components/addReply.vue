<template>
    <section class="addReply">
       <el-form ref="form" :model="form" label-width="80px" >
           <el-form-item label="规则名称" prop="rulesName" :rules="[{ required: true, message: '规则名不能为空且最多10个字', trigger: 'blur'},{max:10,message:'规则名不能为空且最多10个字', trigger: 'blur'}]">
                <el-input v-model="form.rulesName" placeholder="请输入规则名称"></el-input>
                <span style="color: #999999;font-size:12px;">字数不能超过10个字</span>
            </el-form-item>
             <el-form-item v-for="(item,index) in form.keyword" :label="index==0 ?'关键词':''" :prop="'keyword.'+index+'.value'" :key="item.key" 
             :rules="[{ required: true, message: '关键词不能为空且最多30个字', trigger: 'blur'},{max:30,message:'关键词不能为空且最多30个字', trigger: 'blur'}]">
                <el-input  v-model="item.value" class="input-with-select"  placeholder="输入关键词">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="半匹配" value="1"></el-option>
                        <el-option label="全匹配" value="2"></el-option>
                    </el-select>
                </el-input>
                <i v-show="index!=0 ?false:true" class="el-icon-circle-plus-outline" style="font-size:20px;color:#ccc;cursor: pointer;" @click="addlist"></i>
                <i v-show="index==0 ?false:true" class="el-icon-remove-outline" style="font-size:20px;color:#ccc;cursor: pointer;" @click="remove(item)"></i>
            </el-form-item>
             <el-form-item label="回复内容">
                 
                    <ul class="addReply_content">
                        <li v-for="(item,index) in saveDatalist" class="clearfix">
                            <div class="addReply_textImg">
                                <p v-show="item.type==1">{{item.content}}</p>
                                <img v-show="item.type==2" :src="item.imgUrl">
                            </div>
                            <div class="addReply_operation"><span @click="removeBtn(index)">删除</span><span @click="ediBtn(index)" v-show="item.type!=2">编辑</span></div>
                        </li>
                    </ul>
                <el-popover
                placement="right"
                width="567"
                trigger="hover"
                v-model="visible2">
                    <ul>
                        <li v-for="(item,index) in listData" @click="addContent(index+1)" style=" float: left;font-size: 14px; cursor: pointer; margin-right: 40px;"><i :class="item.icon" style="font-size: 16px; margin-right: 8px;"></i><span style=" display: inline-block; color: #333333;">{{item.text}}</span></li>
                    </ul>
                     <i style="font-size:34px;color:#ccc;cursor: pointer;" class="el-icon-circle-plus-outline" slot="reference"></i>
                </el-popover>
               
            </el-form-item>
            <el-form-item>
                 <el-dialog title="添加回复文字" :visible.sync="dialogTableVisible">
                   <div style="padding:0 20px;">
                        <el-input type="textarea" v-model="form.text" rows="10" resize="none" placeholder="不能超过300个字"></el-input>
                        <div style="text-align:right;color:#9A9A9A;">
                           还可以输入<span>{{fontNum}}</span>字，按下Enter键换行
                        </div>
                   </div>
                    <div class="dialog_btn">
                        <el-button @click="dialogTableVisible = false">取消</el-button>
                        <el-button type="primary" style="margin-right:20px;" @click="Determine">确定</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
             <el-form-item>
                <el-button @click="cancelFun">取消</el-button>
                <el-button type="primary" @click="submitForm('form')">确定</el-button>
            </el-form-item>
        </el-form>
       

    </section>
</template>

<script>
export default {
    data() {
        return {
           form:{
               rulesName:"",
               keyword:[{value:""}],
               text:""
           } ,
           select:"1",
           visible2:false,
           listData:[{
               icon:'el-icon-edit',
               text:'文字'
           },
           {
              icon:'el-icon-picture-outline',
               text:'图片'  
           }
           ],
           dialogTableVisible:false,
           saveDatalist:[
               {content:'中国',type:1},
               {imgUrl:'./src/assets/img/el-icon-upload-success-green.png',type:2}
           ],
           fontNum:300
          
        }
    },
    mounted() {
        
    },
    methods: {
        cancelFun(){//取消
            this.$emit('cancelFun',true);
        },
        Determine(){//添加文字回复弹窗按钮确定
            this.dialogTableVisible=false;
        },
        addContent(type){//添加文字/图片
            this.form.text="";
            if(type==1){
               this.dialogTableVisible=true;
            }else if(type==2){
                
            }
        },
        submitForm(formName){//最后提交
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    ////console.log('error submit!!');
                    return false;
                }
            });
        },
        remove(data){//关键词删除
            var index = this.form.keyword.indexOf(data);
            if (index !== -1) {
                this.form.keyword.splice(index, 1)
            }
        },
      addlist(){
          this.form.keyword.push({
            value: '',
            key: Date.now()
        });
      },
      limitNum(content){
        if(content.length>300){
            setTimeout(()=>{
                this.form.text=content.substr(0,300);
            },100)
        }else{
            this.form.text=content;
        }
    },
    },
    watch:{
        form:{
            handler(curVal,oldVal){
                this.limitNum(curVal.text);
                if(300-curVal.text.length<0){
                    return;
                }
　　　　　　　　　this.fontNum=300-curVal.text.length;
　　　　　　　},
            deep:true
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/css/var.scss';
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .addReply .el-input__inner{
    margin:0;
}
.addReply .page-container .el-input__inner{
    margin:0;
}
.addReply .el-input-group{
    width:88%;
}
.addReply .dialog_btn{
    border-top:1px solid #E7E7E7;
    margin-top:24px;
    padding-top:16px;
    text-align:right;
}
.addReply .el-dialog__body{
    padding:30px 0;
}
.addReply .addReply_content{
    li{
        padding:0 0 10px 0;
        border-bottom:1px solid #e7e7e7;
        margin-bottom:10px;
        .addReply_textImg{
            float: left;
            img{
                width:230px;
                height: 150px;
                padding: 4px;
                border:1px solid #ccc;
            }
        }
        .addReply_operation{
             float: left;
            display: none;
            margin-left:20px;
            span{
                cursor: pointer;
                color: #40A94A;
                margin-right: 10px;
            }
        }
    }
    li:hover .addReply_operation{
        display: block;
    }
}
</style>


