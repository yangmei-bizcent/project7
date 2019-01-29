<template>
  <div class="message-manage">
    <div class="page-title">消息管理
      <span>可以对服务号关注者发送至服务号的消息回复、收藏等操作。</span>
    </div>
    <div class="message-wrapper">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部消息" name="allMsg">
          <div class="msg-pane">
            <el-form :inline="true" :model="filterForm" class="demo-form-inline">
              <el-form-item>
                <el-select v-model="filterForm.timeOrder" placeholder="排序方式">
                  <el-option label="时间排序" value="time"></el-option>
                  <el-option label="名称排序" value="name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="filterForm.dayNumber">
                  <el-option label="最近五天" value="fiveDays"></el-option>
                  <el-option label="最近一个月" value="month"></el-option>
                  <el-option label="最近一年" value="year"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="search-form-item">
                <el-input v-model="filterForm.keyWord" class="keyWord" placeholder="消息内容">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item>
            </el-form>

            <p class="hint">全部消息<span>(消息保存5天，多媒体消息3天后无法查看)</span></p>

            <div  class="message-item" v-for="(item, index) in msgList">
              <div class="item-content">
                <div class="first">
                  <img :src="item.img" width="60" height="60">
                  <p>{{item.content}}</p>
                </div>
                <p class="item-time">{{item.time}}</p>
                <p class="operate">
                  <img :src="item.isCollected ? collectedImg : noCollectImg" width="20" height="20" @click="toggleCollect(item.id)">
                  <img src="../../assets/img/publicServiceNum/回复-默认.png" width="22.5" height="15.2" @click="reply(index, item.id, 'all')">
                </p>
              </div>
              <div class="reply" v-if="currentMsgIndex === index">
                <el-input type="textarea" :disabled="item.over2days"></el-input>
                <el-button type="success" :disabled="item.over2days">发送（Enter）</el-button>
                <el-button class="close" @click="currentMsgIndex = ''">收起</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="已收藏的消息" name="collectedMsg">
          <div class="msg-pane">
            <el-form :inline="true" :model="filterForm" class="demo-form-inline">
              
              <el-form-item class="search-form-item">
                <el-input v-model="filterForm.keyWord" class="keyWord" placeholder="消息内容">
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </el-form-item>
            </el-form>
            <p class="hint">已收藏的消息<span>（{{collectedMsgList.length}}条）</span></p>
            <p v-if="collectedMsgList.length === 0" class="empty-collect">暂未收藏消息，已收藏的消息，会被永久保存。</p>
            <div class="message-item" v-for="(item, index) in collectedMsgList">
              <div class="item-content">
                <div class="first">
                  <img :src="item.img" width="60" height="60">
                  <p>{{item.content}}</p>
                </div>
                <p class="item-time">{{item.time}}</p>
                <p class="operate">
                  <img :src="item.isCollected ? collectedImg : noCollectImg" width="20" height="20" @click="toggleCollect(item.id)">
                  <img src="../../assets/img/publicServiceNum/回复-默认.png" width="22.5" height="15.2" @click="reply(index, item.id, 'collected')">
                </p>
              </div>
              <div class="reply" v-if="currentCollectedMsgIndex === index">
                <el-input type="textarea" :disabled="item.over2days"></el-input>
                <el-button type="success" :disabled="item.over2days">发送（Enter）</el-button>
                <el-button class="close" @click="currentCollectedMsgIndex = ''">收起</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import msgPic from '../../assets/img/publicServiceNum/msgPic.png'
import collectedImg from '../../assets/img/publicServiceNum/收藏-触发.png'
import noCollectImg from '../../assets/img/publicServiceNum/收藏-默认.png'

  export default {
    data() {
      return {
        currentMsgIndex: '',
        currentCollectedMsgIndex: '',
        collectedImg,
        noCollectImg,
        activeName: 'allMsg',
        filterForm: {
          timeOrder: 'time',
          dayNumber: 'fiveDays',
          keyWord: ''
        },
        msgList: [
          { 
            id: 1,
            img: msgPic,
            content: '消息内容1消息内容1',
            time: '2018-03-12  10:45',
            isCollected: false,
            over2days: true
          },
          {
            id: 2,
            img: msgPic,
            content: '消息内容2消息内容2',
            time: '2018-03-12  10:45',
            isCollected: true,
            over2days: false
          },
        ],
        collectedMsgList: []
      }
    },

    mounted() {
      this.filterCollectedMsg()
    },
    methods: {
      filterCollectedMsg() {
        this.collectedMsgList = this.msgList.filter(item => {
          return item.isCollected
        }) 
      },
      toggleCollect(id) {
        let collectItem = this.msgList.find(item => item.id === id)
        collectItem.isCollected = !collectItem.isCollected
        // //console.log(id);
        
        if(collectItem.isCollected) {
          this.$notify({
            message: '已收藏',
            type: 'success'
          });
        } else {
          this.$notify({
            message: '已取消收藏',
            type: 'success'
          });
        }
      },
      
      reply(index, id, status) {
        if(status === 'all') {
          this.currentMsgIndex = index
        } else if(status === 'collected') {
          this.currentCollectedMsgIndex = index
        }
        // this.currentMsgIndex = index
        let replyItem = this.msgList.find(item => item.id === id)
        if(replyItem.over2days) {
          this.$notify({
            message: '由于该用户48小时未与你互动，你不能再主动发消息给他。直到用户下次主动发消息给你才可以对其进行回复。',
            type: 'warning'
          });
        }
      },
    },
    components: {

    },
    watch: {
      msgList: {
        handler(newVal, oldVal) {
          this.filterCollectedMsg()
        },
        deep: true
      }
    }
 }
</script>

<style lang='scss' scoped>
.message-manage {
  .message-wrapper {
    background-color: #FFFFFF;
    width: 95%;
    min-width: 900px;
    padding-bottom: 74px;
    min-height: 531px;
  }

  .page-title {
    padding-left: 40px;
      span {
        font-size: 14px;
        color: #999999;
        letter-spacing: 0.2px;
        margin-left: 30px;
      }
    }

  .msg-pane {
    margin-top: 13px;
    position: relative;
    padding-left: 24px;
    .hint {
      font-size: 14px;
      letter-spacing: 0.2px;
      color: #333333;
      span {
        color: #3F3F3F;
      }
    }

    .empty-collect {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #999999;
      letter-spacing: 0;
      text-align: center;
      margin-top: 150px;
    }
    
    .message-item {
      padding: 0 24px;
      margin: 24px 0;
      border: 1px solid #D8D8D8;
      width: 92%;
    }

    .item-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100px;
      // padding: 0 94px 0 24px;

      .first {
        display: flex;
        align-items: center;
        img {
          margin-right: 20px;
        }
      }
      .item-time {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #999999;
      }

      .operate {
        margin-right: 74.5px;
        img {
          cursor: pointer;
        }
        img:first-child {
          margin-right: 20px;
        }
      } 
    }
  }

  #pane-collectedMsg {
    .hint {
      margin-bottom: 40px;
    }
  }
}
</style>

<style lang="scss">
$green-color: #42A84B;
.message-manage {
  .message-wrapper {
    .el-tabs__nav-scroll {
      padding-left: 24px;
      margin-top: 23px;
      .el-tabs__item.is-top {
        font-size: 16px;
        color: #999999;
        &.is-active {
          font-weight: bold;
          color: #333333;
        }
      }

      .el-tabs__active-bar.is-top {
        background-color: $green-color;
      }
    }

    .reply {
      border-top: 1px solid #D8D8D8;
      padding: 24px 0 20px 0;
      textarea.el-textarea__inner {
        height: 120px;
        margin-bottom: 20px;
      }
    }
  }

  .el-input {
    .el-input__inner {
      height: 34px;
    }
  }

  .el-form.el-form--inline {
    width: 92%;
    position: relative;
    .search-form-item {
      margin-right: 0;
      position: absolute;
      right: 0;
    }
    .el-input {
      width: 170px;
      &.keyWord {
        width: 240px;
      }
    }
  }
  .el-button.close {
    border-color: #35B53F;
    color: #35B53F;
    background-color: #FFFFFF;
  }

}
</style>

