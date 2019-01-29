<template>
  <div class="hospInfoDeploy">
    <!-- <div class="cover" v-show="isLoading">
      <img src="../../assets/img/loading.gif" />
    </div> -->
    <div class="pageTitle">
      <p v-show="!hospId">新增医院信息</p>
      <p v-show="hospId">修改医院信息</p>
    </div>
    <div class="deployContain">
      <el-form v-loading="isLoading" class="hidWidth" :model="hospInfoList" :rules="rules" ref="hospInfoList" label-width="130px">
        <el-form-item label="医院名称" prop="name">
          <el-input v-model="hospInfoList.name" placeholder="请输入4-20字医院名称" class="width300"></el-input>
        </el-form-item>
        <el-form-item label="医院logo" class="uploadImg" :rules="[{required: true, message: '图片必传'}]">
          <el-upload action="" :file-list="hospLogo" :limit="1" :on-exceed="limitFile" :on-remove="handleRemove"
            list-type="picture" :http-request="imgurlRequest" :before-upload="beforeAvatarUpload">
            <el-button size="mini" plain>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              上传图片尺寸建议500*500，大小需要500kb以内，图片格式需为png，jpg，jpeg
            </div>
          </el-upload>
          <a @click="hospLogoVisible = true">点击了解”医院logo”示例。</a>
        </el-form-item>
        <el-form-item label="医院风采图" class="uploadImg" :rules="[{required: true, message: '图片必传'}]">
          <el-upload action="" :file-list="hospBanner" :limit="1" :on-exceed="limitFile" :on-remove="handleRemoveB" list-type="picture" :http-request="imgurlRequestB"
            :before-upload="beforeAvatarUpload">
            <el-button size="mini" plain>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              上传图片尺寸建议750*270，大小需要500kb以内，图片格式需为png，jpg，jpeg
            </div>
          </el-upload>
          <a @click="hospImgVisible = true">点击了解什么是“医院风采图”。</a>
        </el-form-item>
        <el-form-item label="医院等级" prop="level">
          <el-select v-model="hospInfoList.level" placeholder="请选择" class="width300">
            <el-option v-for="item in hosTypeList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院介绍" prop="description">
          <el-input type="textarea" :rows="2" :maxlength="800" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入医院相关介绍，可从医院经历的历史时间节点、医院基本情况、医院科室、医生资源等方面介绍"
            v-model="hospInfoList.description"></el-input>
          <p style="text-align:right;">{{hospInfoList.description?hospInfoList.description.length:0}}/800</p>
        </el-form-item>
        <el-form-item label="特色科室" prop="specialDiagnose">
          <el-input type="textarea" :rows="2" :maxlength="600" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入特色科室名称，科室名称之间需有间隔符间隔"
            v-model="hospInfoList.specialDiagnose"></el-input>
          <p style="text-align:right;">{{hospInfoList.specialDiagnose?hospInfoList.specialDiagnose.length:0}}/600</p>
        </el-form-item>
        <el-form-item label="医院地址" prop="address">
          <el-input type="textarea" :rows="2" :maxlength="50" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入医院提供的官方地址，若不填则界面不显示"
            v-model="hospInfoList.address"></el-input>
          <p style="text-align:right;">{{hospInfoList.address?hospInfoList.address.length:0}}/50</p>
        </el-form-item>
        <el-form-item label="联系电话" prop="deptPhoneNum">
          <div class="phoneNum" v-for="(n,index) in hospInfoList.tels" :key="index">
            <el-input 
              v-model="n.phone"  
              placeholder="请输入带区号联系电话"
              @change="deptNum(index)"></el-input>
            <el-input 
              v-model="n.description" 
              maxlength="10" 
              placeholder="请输入10字内中文描述，若不填则界面不显示"
              @change="deptIns(index)"></el-input>
            <u class="deletePhone" @click="deletePhone(index)" v-show="hospInfoList.tels.length > 1"></u>
          </div>
          <u class="addPhone" v-show="hospInfoList.tels.length < 10" @click="addPhone()"></u>
        </el-form-item>
        <el-form-item label="官网地址" prop="webSite">
          <el-input v-model="hospInfoList.webSite" @blur="validateWeb()" placeholder="请输入有效官网链接，以http://或者https://开头，若不填则界面不显示"></el-input>
        </el-form-item>
        <el-form-item label="医院经纬度" :rules="[{ required: true, message: '医院经纬度必填'}]">
          <div class="flex-align-justifystart">
            <el-input 
              v-model="hospInfoList.longitude" 
              class="max-width200"
              placeholder="请输入经度"></el-input>
            <div class="marginleft5 marginright5">，</div>
            <el-input 
              v-model="hospInfoList.latitude" 
              class="max-width200"
              placeholder="请输入纬度"></el-input>
            <p 
              class="tdu fontsize-2 marginleft10 color-3c9ef8 cursorPointer" 
              @click="toGetLongitudeLatitude">如何获取经纬度？</p>
          </div>
        </el-form-item>
        <el-form-item label="来院交通" prop="traffic">
          <el-input type="textarea" :rows="2" :maxlength="1000" :autosize="{ minRows: 3, maxRows: 10}" placeholder="请输入常规车站来院公交指引，若医院有不同大门请分开编写"
            v-model="hospInfoList.traffic"></el-input>
          <p style="text-align:right;">{{hospInfoList.traffic?hospInfoList.traffic.length:0}}/1000</p>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="saveHospInfo('hospInfoList')" v-show="ediBtnShow">保存</el-button>
          <el-button type="success" plain @click="saveHospInfo('cancel')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="600px">
      <span>请上传医院图标及风采图图片</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog custom-class="checkImg" title="范例" :visible.sync="hospLogoVisible" width="400px">
      <img src="../../assets/img/hospLogo.png" />
    </el-dialog>
    <el-dialog custom-class="checkImg" title="范例" :visible.sync="hospImgVisible" width="800px">
      <img src="../../assets/img/hospBanner.png" />
    </el-dialog>
  </div>
</template>
<script>
  import {
    axiosget,
    axiospost,
    aixospatch
  } from "../../service/config.js"
  import {
    mapState,
    mapGetters
  } from "vuex";
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('医院名称不能为空！'));
        } else if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
          callback(new Error('请检查案例名称格式，限中文或字母'));
        } else if (value.length < 4 || value.length > 20) {
          callback(new Error('请检查案例名称长度，限4-20个字'));
        }
        return callback();
      };
      return {
        isLoading: true,
        hospInfoList: [],
        hosTypeList: [],
        hospLogo: [],
        hospBanner: [],
        centerDialogVisible: false,
        hospLogoVisible: false,
        hospImgVisible: false,
        hospInfoList: {
          name: '',
          level: '',
          description: '',
          specialDiagnose: '',
          address: '',
          tels: [{
            phone: '',
            description: ''
          }],
          webSite: '',
          longitude: '',
          latitude: '',
          traffic: ''
        },
        phoneValid: true,
        ifPhoneValid: true, // 手动写的验证是否都通过了的标志
        ifDescValid: true,  // 手动写的验证是否都通过了的标志
        rules: {
          name: [{
            required: true,
            validator: validateName,
            trigger: 'blur'
          }],
          traffic:[{
            required: true,
            message: '请输入来院交通',
            trigger: 'blur'
          }],
          //   logo: [{
          //     required: true,
          //     message: ' '
          //   }],
          // banner: [{
          //   required: true,
          //   message: '医院风采图必填'
          // }],
          level: [{
            required: true,
            message: '请选择医院等级',
            trigger: 'change'
          }],
          description: [{
            required: true,
            message: '请输入医院介绍',
            trigger: 'blur'
          }],
          specialDiagnose: [{
            required: true,
            message: '请输入特色科室介绍',
            trigger: 'blur'
          }],
        },
        //权限控制
        ediBtnShow:false,
      };
    },
    async created() {
      this.hospId = this.$route.query.hospId;

      this.Jurisdiction();
      if (this.hospId) {
          let res = await axiosget(`/application/branch/admin/getHospitalBranchById?branchId=${this.hospId}&date=${new Date().getTime()}`)
          this.hospInfoList = res.data;
          if (!this.hospInfoList.tels || this.hospInfoList.tels.length == 0) {
            this.hospInfoList.tels = [{
              phone: '',
              description: ''
            }];
          }
          if (!this.hospInfoList.level) {
            this.hospInfoList.level = '';
          }
          if (res.data.logoImg) {
            this.hospLogo.push(res.data.logoImg);
          };
          if (res.data.imgurls) {
            this.hospBanner = res.data.imgurls;
          };
      }
      axiosget(`/application/branch/admin/getProjectCategory?date=${new Date().getTime()}`).then(res => {
        this.hosTypeList = res.data;
        this.isLoading = false;
      }).catch((err) => {
        this.isLoading = false;
      });
    },
    computed: {
        ...mapGetters({
            moduleper:'moduleper'
        }), 
    },
    methods: {
      Jurisdiction(){//权限控制
            if((this.moduleper!=undefined || this.moduleper!=null) && this.moduleper.length>0){
              // //console.log( this.moduleper)
                this.moduleper.map(item=>{
                    item.children.map(item2=>{
                        if(item2.feature_id==351054){//"修改医院信息"
                            this.ediBtnShow=true;
                        }
                       
                    })
                })
                 
            }
        },
      // 获取经纬度
      toGetLongitudeLatitude() {
        window.open('http://api.map.baidu.com/lbsapi/getpoint/index.html');
      },
      //图片验证
      beforeAvatarUpload(file) {
        const isType = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg');
        const isLt500K = file.size / 1024 < 500;
        if (!isType) {
          this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
        }
        if (!isLt500K) {
          this.$message.error('上传图片大小不能超过 500K!');
        }
        return isType && isLt500K;
      },
      //上传图片
      async imgurlRequest(item) {
        let form = new FormData();
        form.append("file", item.file);
        await axiospost(`/application/plat/auth/images/upload`, form).then(
          res => {
            this.hospLogo.push({
              name: item.file.name,
              url: res.data.url
            });
            this.$message.success("图片上传成功");
          }).catch(err => {
          this.$message.error("图片上传失败");
        });
      },
      async imgurlRequestB(item) {
        let form = new FormData();
        form.append("file", item.file);
        await axiospost(`/application/plat/auth/images/upload`, form).then(
          res => {
            this.hospBanner.push({
              name: item.file.name,
              url: res.data.url
            });
            this.$message.success("图片上传成功");
          }).catch(err => {
          this.$message.error("图片上传失败");
        });
      },
      //超出上传图片数量限制
      limitFile(file, fileList) {
        this.$message.error("上传的图片最多一张，请删除之后再重新上传");
      },
      //删除上传图片
      handleRemove(file, fileList) {
        this.hospLogo = fileList;
      },
      handleRemoveB(file, fileList) {
        this.hospBanner = fileList;
      },
      //添加电话
      addPhone() {
        let self = this;
        if(self.hospInfoList.tels.length < 5) {
          this.hospInfoList.tels.push({
            phone: '',
            description: ''
          });
        }else {
          self.$message({
            message: '联系电话最多添加5个',
            type: 'warning'
          });
        }
        
      },
      //删除电话
      deletePhone(index) {
        this.$confirm('确定要删除该分类吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.hospInfoList.tels.splice(index, 1);
        }).catch(() => {});
      },
      //科室电话验证
      deptNum(num) {
        this.ifPhoneValid = true;
        // if (this.hospInfoList.tels[num].phone != '') {
        //   if (!((/^1[34578]\d{9}$/.test(this.hospInfoList.tels[num].phone)) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(
        //       this.hospInfoList.tels[num].phone))) {
        //     this.$message.warning("请输入正确格式的电话");
        //     // this.hospInfoList.tels[num].phone = '';
        //     this.ifPhoneValid = false;
        //   }
        // }
      },
      // 科室电话描述验证
      deptIns(num) {
        this.ifDescValid = true;
        // if (this.hospInfoList.tels[num].description != '') {
        //   if (!/^[\u4e00-\u9fa5]+$/.test(this.hospInfoList.tels[num].description)) {
        //     this.$message.warning("请输入正确中文描述");
        //     // this.hospInfoList.tels[num].description = '';
        //     this.ifDescValid = false;
        //   }
        // }
      },
      //website校验
      validateWeb() {
        if (this.hospInfoList.webSite && this.hospInfoList.webSite.substr(0, 4) != 'http') {
          this.hospInfoList.webSite = 'http://' + this.hospInfoList.webSite;
        }
      },
      //保存医院信息
      saveHospInfo(formName) {
        if (formName == 'cancel') {
          let confirmMsg = this.hospId?'修改':'新增';
          this.$confirm(`是否确定取消${confirmMsg}医院信息?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/hospInfoDeploy/hospInfoDeploy'
            })
          }).catch(() => {})
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              if(!this.hospInfoList.longitude || !this.hospInfoList.latitude) {
                this.$alert('请输入医院经纬度', '提示');
                return false;
              }
              if (this.hospBanner.length == 0||this.hospLogo.length==0) {
                this.centerDialogVisible = true;
                return false;
              }
              
              this.hospInfoList.tels.forEach((item, index) => {
                if(item.phone != '') {
                  if (!((/^1[34578]\d{9}$/.test(item.phone)) || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(
                      item.phone))) {
                      this.ifPhoneValid = false;
                      return false;
                  }
                }
                if(item.description != '') {
                  if (!/^[\u4e00-\u9fa5]+$/.test(item.description)) {
                    this.ifDescValid = false;
                    return false;
                  }
                }
              });
              
              if(!this.ifPhoneValid) {
                this.$alert('请输入正确格式的电话', '提示');
                return false;
              }
              if(!this.ifDescValid) {
                this.$alert('请输入正确中文描述', '提示');
                return false;
              }
                this.$confirm('确认保存医院信息?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  if (this.hospInfoList.webSite && this.hospInfoList.webSite.substr(0, 4) != 'http') {
                    this.hospInfoList.webSite = 'http://' + this.hospInfoList.webSite;
                  }
                  this.hospInfoList.logoImg = this.hospLogo[0];
                  this.hospInfoList.imgurls = this.hospBanner;
                  // let phoneCall = this.hospInfoList.tels;
                  this.hospInfoList.tels = this.hospInfoList.tels.filter((item, index) => {
                    return item.phone != ''
                  });
                  axiospost(`/application/branch/admin/modifyHospitalBranch`, this.hospInfoList).then(
                    res => {
                      if (res.status == 200 && res.data) {
                        this.$message.success(res.data);
                      };
                      this.$router.push({
                        path: '/hospInfoDeploy/hospInfoDeploy'
                      })
                    })
                })
            } else {
              return false;
            }
          });
        }
      }
    }
  };

</script>

<style lang="scss" rel="stylesheet/stylus">
  @import "/hospInfoDeploy.scss";

</style>
