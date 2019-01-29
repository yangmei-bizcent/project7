<template>
    <div class="serviceNumIndex">
        <div class="page-title">数据视图</div>
        <div class="content-wrap bg-white">
            <el-row :gutter="50">
                <el-col class="items-wrap" :span="8" v-for="(item, index) of items" :key="index">
                    <div
                        class="items border-gray bg-white"
                        :class="{ 'is-selected': selectedItem == index ? true : false }"
                        @mouseenter="selectItem(index)"
                        @mouseleave="cancelSelect(index)">
                        <div class="item-title flex-align-center">
                            <span>{{ item.title }}</span>
                            <img :src="item.icon" />
                        </div>
                        <div class="item-data">
                            <span v-if="item.data">{{ item.data }}</span>
                            <span>{{ item.unit }}</span>
                            <el-button
                                v-if="item.hasLink"
                                class="item-link"
                                type="text"
                                :class="{ 'item-link-selected': selectedItem == index ? true : false }"
                                @click="goToOpen">去开通</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-tabs v-model="activeName" type="border-card" class="tabs" @tab-click="tabSelect">
                <el-tab-pane label="近三天" name="day"></el-tab-pane>
                <el-tab-pane label="近七天" name="week"></el-tab-pane>
                <el-tab-pane label="近三十天" name="month"></el-tab-pane>
                <el-tab-pane label="近一年" name="year"></el-tab-pane>
            </el-tabs>
            <div class="chart-wrap border-gray">
                <el-date-picker
                    class="date-picker"
                    v-model="dateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :clearable="false"
                    :unlink-panels="true"
                    :picker-options="pickerOptions"
                    value-format="yyyy-MM-dd">
                </el-date-picker>
                <el-row>
                    <el-col :span="3">
                        <div class="data-wrap">
                            <div class="data-inner">
                                <div class="data-detail color333">{{ newUser }}<span>人</span></div>
                                <div class="data-title color333">新增用户</div>
                            </div>
                            <div class="data-inner">
                                <div class="data-detail color333">{{ cumulateUser }}<span>人</span></div>
                                <div class="data-title color333">累计用户</div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <ve-line
                            :data="chartData"
                            :settings="chartSettings"
                            :theme="theme"
                            height="285px">
                        </ve-line>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters,mapActions} from 'vuex'
import VeLine from 'v-charts/lib/line.common'
import focusNumDef from '@/assets/img/publicServiceNum/focusNumDef.png'
import focusNum from '@/assets/img/publicServiceNum/focusNum.png'
import messageNumDef from '@/assets/img/publicServiceNum/messageNumDef.png'
import messageNum from '@/assets/img/publicServiceNum/messageNum.png'
import applicationNumDef from '@/assets/img/publicServiceNum/applicationNumDef.png'
import applicationNum from '@/assets/img/publicServiceNum/applicationNum.png'
import registerNumDef from '@/assets/img/publicServiceNum/registerNumDef.png'
import registerNum from '@/assets/img/publicServiceNum/registerNum.png'
import paymentNumDef from '@/assets/img/publicServiceNum/paymentNumDef.png'
import paymentNum from '@/assets/img/publicServiceNum/paymentNum.png'
import searchNumDef from '@/assets/img/publicServiceNum/searchNumDef.png'
import searchNum from '@/assets/img/publicServiceNum/searchNum.png'
import {statisticalDataApi} from  '../../service/application'
export default {
    data () {
        //v-charts配置
        this.chartSettings = {
            area: true,
            xAxisType: 'time'
        };
        this.theme = {
            "color": 'rgba(85,178,84,0.5)',
            "lineSmooth": false
        }
        return {
            activeName: 'day',
            dateNow: null,//当前日期
            dateRange: '',
            cumulateUser: 0,//累计用户
            newUser: 0,//今日新增
            pickerOptions: {
                disabledDate: dates => {
                    if (dates > this.getDaysAgo(1)) {
                        return true;
                    }
                    return false;
                }
            },
            //v-charts数据
            chartData: {
                columns: ['日期', '新关注人数'],
                rows: []
            },
            statisticsData:{},
            selectedItem: -1,
            items: [
                {
                    title: '公众号关注数',
                    icon: focusNumDef,
                    data: '?',
                    unit: '人'
                }, {
                    title: '公众号消息数目',
                    icon: messageNumDef,
                    data: '52',
                    unit: '条'
                }, {
                    title: '已添加的应用',
                    icon: applicationNumDef,
                    data: '?',
                    unit: '套'
                }, {
                    title: '挂号',
                    icon: registerNumDef,
                    data: '',
                    unit: '暂无',
                    hasLink: true
                }, {
                    title: '缴费',
                    icon: paymentNumDef,
                    data: '暂无',
                    unit: ''
                }, {
                    title: '查询',
                    icon: searchNumDef,
                    data: '',
                    unit: '暂无',
                    hasLink: true
                }
            ],
            icons: [
                focusNumDef,
                focusNum,
                messageNumDef,
                messageNum,
                applicationNumDef,
                applicationNum,
                registerNumDef,
                registerNum,
                paymentNumDef,
                paymentNum,
                searchNumDef,
                searchNum
            ]
        }
    },
    computed: {
        ...mapGetters({moduleper:'moduleper'})
    },
    methods: {
        selectItem (index) {
            this.items[index].icon = this.icons[index * 2 + 1];
            this.selectedItem = index;
            // for (let i = 0; i < this.items.length; i++) {
            //     if (i == index) {
            //         continue;
            //     } else {
            //         this.items[i].icon = this.icons[2 * i];
            //     }
            // }
        },
        cancelSelect (index) {
            this.items[index].icon = this.icons[index * 2];
            this.selectedItem = -1;
        },
        //Date转'yyyy-MM-dd'格式字符串
        getStringDate (date) {
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return `${date.getFullYear()}-${month.toString().length == 2 ? month : `0${month}`}-${day.toString().length == 2 ? day : `0${day}`}`;
        },
        //获取当前日期的前num天
        getDaysAgo (num) {
            let tempDate = this.dateNow.toString();
            let temp = new Date(tempDate);
            temp.setDate(this.dateNow.getDate() - num);
            return temp;
        },
        tabSelect (e) {
            let tempDate = this.dateNow.toString();
            let temp = null;
            let dateNow = this.getStringDate(this.dateNow);
            switch (e.name) {
                case 'day':
                    temp = new Date(tempDate);
                    temp.setDate(this.dateNow.getDate() - 2);
                    this.dateRange = [this.getStringDate(temp), dateNow];
                    break;
                case 'week':
                    temp = new Date(tempDate);
                    temp.setDate(this.dateNow.getDate() - 6);
                    this.dateRange = [this.getStringDate(temp), dateNow];
                    break;
                case 'month':
                    temp = new Date(tempDate);
                    temp.setMonth(this.dateNow.getMonth() - 1);
                    temp.setDate(temp.getDate() - 1);
                    this.dateRange = [this.getStringDate(temp), dateNow];
                    break;
                case 'year':
                    temp = new Date(tempDate);
                    temp.setFullYear(this.dateNow.getFullYear() - 1);
                    temp.setDate(temp.getDate() - 1);
                    this.dateRange = [this.getStringDate(temp), dateNow];
                    break;
                default:
                    break;
            }
        },
        goToOpen () {
            this.$router.push({ name: 'serCenIndex' });
            
        },
        async getStaticData () {
            let platformHospitalId = JSON.parse(sessionStorage.getItem("chooseOrgInfo")).platformHospitalId;
            let res = await statisticalDataApi(platformHospitalId);
            this.items[0].data = res.data.publicServiceUserNum;
            this.items[2].data = res.data.openApplicationNum;
            await this.$store.dispatch({
                type: 'getWxUserStaticData',
                params: {
                    type: 'other',
                    beginTime: this.dateRange[0].toString(),
                    endTime: this.dateRange[1].toString()
                }
            }).then(res => {
                let data = res.data;
                this.cumulateUser = data.statisticsData ? data.statisticsData.cumulateUser : 0;
                this.newUser = data.statisticsData ? data.statisticsData.newUser : 0;
                let tempArray = [];
                if (data.list) {
                    for (let item of data.list) {
                        tempArray.push({
                            '日期': item.refDate,
                            '新关注人数': item.newUser
                        });
                    }
                }
                this.chartData.rows = tempArray;
            });
            
        }
    },
    created () {
        this.dateNow = new Date();
        this.dateNow.setDate(this.dateNow.getDate() - 1);
        this.dateRange = [this.getStringDate(this.getDaysAgo(2)), this.getStringDate(this.dateNow)];
    },
    watch: {
        dateRange () {
            this.getStaticData();
        }
    },
    components: { 
        VeLine 
    },
}
</script>

<style lang="scss" scoped>
.border-gray {
    border: 1px solid #E6E6E6;
}
.bg-white {
    background: #FFF;
}
.flex-align-center {
    display: flex;
    align-items: center;
}
.color333 {
    color: #333;
}
.content-wrap {
    padding: 25px 25px 40px;
}
.items-wrap {
    padding-bottom: 30px;
}
.items {
    cursor: pointer;
    height: 160px;
    border-radius: 4px;
    padding: 0 40px;
}
.is-selected {
    background: #55B254;
    border: 1px solid #55B254;
    span {
        color: #FFF !important;
    }
}
.item-title {
    height: 90px;
    span {
        flex-grow: 1;
        font-size: 20px;
        color: #333;
    }
    img {
        width: 60px;
    }
}
.item-data span {
    color: #666;
    font-weight: bold;
}
.item-data span:first-child {
    font-family: Arial-BoldMT;
    font-size: 32px;
    letter-spacing: 0.18px;
    margin-right: 15px;
}
.item-data span:last-child {
    font-family: MicrosoftYaHei-Bold;
    font-size: 24px;
}
.item-link {
    float: right;
    text-decoration: underline;
    padding: 28px 17px 0;
    min-width: 60px;
}
.item-link-selected {
    color: #FFF;
    &:hover {
        color: #FFF;
    }
}
.tabs {
    box-shadow: none;
}
.data-wrap {
    padding: 30px 0 30px 40px;
}
.data-inner {
    height: 112.5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.data-detail {
    font-size: 24px;
    letter-spacing: 0.13px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    span {
        font-size: 14px;
        margin-left: 8px;
    }
}
.data-title {
    font-size: 14px;
    margin-top: 14px;
}
.chart-wrap {
    position: relative;
}
.date-picker {
    position: absolute;
    right: 24px;
    top: -40px;
}
</style>

<style lang="scss">
.serviceNumIndex {
    margin: 0 auto;
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        color: #04730E;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item:hover {
        color: #04730E;
    }
    .el-tabs__item {
        padding: 0 55px;
    }
    .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child {
        padding-right: 55px;
    }
    .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2) {
        padding-left: 55px;
    }
    .el-tabs__content {
        padding: 0;
    }
    .el-tabs--border-card>.el-tabs__header {
        border-bottom: none;
    }
    .el-date-editor .el-range-separator {
        width: auto;
        line-height: 26px;
    }
    .el-date-editor .el-range__icon {
        line-height: 26px;
    }
}
</style>
