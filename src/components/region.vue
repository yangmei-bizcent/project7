<template>
  <div>
    <el-col :span='8'>
      <el-form-item prop="province" label="机构地址">
        <el-select :value="provinceCode" placeholder="省" @change='provinceChanged'>
          <el-option v-for="item in provinceList" :key="item.provinceCode" :label="item.provinceName" :value="item.provinceCode"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span='8'>
      <el-form-item prop="city">
        <el-select :value="cityCode" placeholder="市" @change='cityChanged'>
          <el-option v-for="item in cityList" :key="item.cityCode" :label="item.cityName" :value="item.cityCode"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span='8'>
      <el-form-item prop="area">
        <el-select :value="areaCode" placeholder="区" @change='areaChanged'>
          <el-option v-for="item in areaList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode"></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </div>
</template>

<script>
import {
  getProvincesApi,
  getCitysApi,
  getAreasApi
} from "../service/application";

export default {
  props: ["provinceCode", "cityCode", "areaCode"],
  data() {
    return {
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  watch: {
    provinceCode: function(newCode, oldCode) {
      this.loadCity(newCode)

      if (oldCode) {
        this.$emit("update:cityCode", "");
      }
    },
    cityCode: function(newCode, oldCode) {
      this.loadArea(newCode)

      if (oldCode) {
        this.$emit("update:areaCode", "");
      }
    }
  },
  created() {
    this.loadProvince();
  },
  methods: {
    async loadProvince() {
      let res = await getProvincesApi();
      this.provinceList = res.data;
    },
    async loadCity(provinceCode) {
      if (provinceCode) {
        let res = await getCitysApi(provinceCode);
        this.cityList = res.data;
      }else{
        this.cityList = []
      }
    },
    async loadArea(cityCode) {
      if(cityCode){
        let res = await getAreasApi(cityCode);
        this.areaList = res.data;
      }else{
        this.areaList = []
      }
    },
    provinceChanged(e) {
      this.$emit("update:provinceCode", e);
    },
    cityChanged(e) {
      this.$emit("update:cityCode", e);
    },
    areaChanged(e) {
      this.$emit("update:areaCode", e);
    }
  }
};
</script>


