<template>
<div class="leader">
    <div class="leader_top">
        <el-row>
            <el-col :span="6">
                <el-input class="select"
                    placeholder="搜索领导姓名"
                    v-model="searchText">
                    <i slot="suffix" class="search" @click="filteSearch">
                      <img src="@/assets/images/1-1search.png">
                    </i>
            </el-input>
            </el-col>
            <el-col :span="18" align="right">
                <el-button @click="showaddLeaderDialog=true" class="select import" round>
                    <i class="el-icon-plus"></i>
                    <span>添加领导</span>
                </el-button>
            </el-col>
        </el-row>
    </div>
    <div class="table">
      <el-table
        :data="addLeaderData"
        style="width: 100%">
        <el-table-column
        align="center"
        type="index"
        label="编号"
        width="80">
        </el-table-column>
        <el-table-column
          align="center"
          width="200"
          label="照片">
          <template slot-scope="scope">
              <!-- <el-popover trigger="hover" placement="right" style="left: 249px;">
                  <div class="popover_box">
                    <div class="pic-box">
                      <img class="pic" :src="scope.row.displayImgUrl"/>
                    </div>
                  <div class="sepreate">
                    <div class="checkPicdiv" v-if="scope.row.auditStatus==2">
                        <span class="butt" type="primary" size="mini" round>
                          修改头像
                          <input type="file" accept="image/*" @change="amendUploadPic($event,scope.row.personId)">
                        </span>
                          <p class="tipPic">请上传正面未经ps照片</p>
                      </div>
                  </div>
                </div>
                    <div slot="reference">
                        <div class="checkPicStatus"><img style="width:100%;" :src="scope.row.displayImgUrl"/></div>
                    </div>
                </el-popover> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="personName"
          align="center"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          align="center"
          label="职位">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="公司">
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作">
          <template slot-scope="scope">
              <el-button type="text" size="small" @click="amendLeader(scope.row)">修改</el-button>
              <el-button type="text" size="small" @click="deleteLeader(scope.row.personId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 点击添加按钮出现的对话框 -->
      <el-dialog
        title="添加领导"
        :visible.sync="showaddLeaderDialog"
        width="30%"
        :before-close="handleClose">
        <el-form
              :rules="rules"
              ref="addLeaderForm"
              :model="addLeaderForm"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-row>
                      <el-col :span='24'>
                         <div class="edit_table">
                              <div class="img-wrap">
                                <img :src="headerPic">
                              </div>
                              <div class="btn-wrap">
                                <span class="btn-upload">
                                  上传头像
                                  <input type="file" accept="image/*" @change="uploadFile" class="upload">
                                </span>
                                <p class="tip">请上传正脸照用于人脸识别</p>
                                <p class="checkedPic" style="color: #f56c6c;" v-if="checkedPicture">请上传头像</p>
                              </div>
                            </div>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item prop="personName">
                          <h3 class="title">领导职位</h3>
                          <el-input v-model="addLeaderForm.personName" placeholder="请填写职位"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span="12">
                      <el-row>
                          <el-col :span="24">
                            <el-form-item prop="personalMail">
                              <h3 class="title">领导姓名</h3>
                              <el-input v-model="addLeaderForm.personalMail" placeholder="请填写姓名"></el-input>
                            </el-form-item>
                          </el-col>
                           <el-col :span="24">
                            <el-form-item prop="staffNumber">
                              <h3 class="title">领导公司</h3>
                              <el-input v-model="addLeaderForm.staffNumber" placeholder="请填写公司"></el-input>
                            </el-form-item>
                          </el-col>
                      </el-row>
                  </el-col>
                </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button class="cancle_btn" @click="cancleAction" size="mini" round>取 消</el-button>
            <el-button type="primary" size="mini" @click="addLeader" round>添 加</el-button>
        </span>
      </el-dialog>
      <!-- 点击修改按钮出现的遮罩层 -->
      <el-dialog
              title="修改领导"
              :visible.sync="editInfo"
              width="30%"
              :before-close="handleClose">
                <el-form
                      :rules="rules"
                      ref="editSpecialUserForm"
                      :model="editSpecialUserForm"
                      >
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <el-row>
                              <el-col :span="24">
                                  <div class="edit_table">
                                      <div class="passMark">
                                        <div class="img-wrap">
                                          <img :src="editheaderPic">
                                        </div>
                                        <div class="div" v-if="showPass"><img src="../../assets/images/1-4pass.png"></div>
                                      </div>
                                      <div class="btn-wrap">
                                        <span class="btn-upload">
                                            更换头像
                                          <input type="file" accept="image/*" class="upload" @change="editUploadFile">
                                        </span>
                                        <p class="tip">请上传正面未经PS照片</p>
                                        <p class="checkedPic" v-show="checkedamendPicture">更换头像</p>
                                      </div>
                                  </div>
                              </el-col>
                              <el-col :span="24">
                                  <el-form-item prop="companyMail">
                                    <h3 class="title">领导职位</h3>
                                    <el-input v-model="editSpecialUserForm.companyMail" placeholder="请填写公司邮箱"></el-input>
                                  </el-form-item>
                                </el-col>
                            </el-row>
                          </el-col>
                          <el-col :span="12">
                              <el-row>
                                  <el-col :span="24">
                                    <el-form-item>
                                      <h3 class="title">领导姓名</h3>
                                      <el-input v-model="editSpecialUserForm.staffNumber" placeholder="请填写姓名"></el-input>
                                    </el-form-item>
                                  </el-col>
                                  <el-col :span="24">
                                    <el-form-item prop="personalMail">
                                      <h3 class="title">领导公司</h3>
                                      <el-input v-model="editSpecialUserForm.personalMail" placeholder="请填写公司"></el-input>
                                    </el-form-item>
                                  </el-col>
                              </el-row>
                          </el-col>
                        </el-row>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="cancle_btn" @click="cancleEdit" size="mini" round>取 消</el-button>
                    <el-button type="primary" size="mini" @click="editSpecialPerson" round>修 改</el-button>
                </span>
      </el-dialog>
      <div class="footer">
          <el-pagination
            class="paginator"
            background
            layout="prev, pager, next"
            @current-change="getCurPage"
            :current-page.sync="curPage"
            :page-size="pageSize"
            :total="totalPage">
          </el-pagination>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        addLeaderData:[{
          personName:4
        }],
        searchText:'',
        showaddLeaderDialog:false,
        curPage:1,
        pageSize:1,
        totalPage:0,
        headerPic:'',
        checkedPicture:false,
        rules:{},
        addLeaderForm:{},
        editSpecialUserForm:{},
        showPass:false,
        editheaderPic:'',
        editInfo:false,
        checkedamendPicture: false

      }
    },
    methods: {
      editUploadFile () {

      },
      cancleEdit() {

      },
      editSpecialPerson () {

      },
      addLeader () {

      },
      cancleAction () {

      },
      uploadFile () {

      },
      filteSearch () {

      },
      amendLeader () {
         this.editInfo = true
      },
      deleteLeader () {

      },
      getCurPage () {

      },
      handleClose () {
        this.showaddLeaderDialog = false
        this.editInfo = false
      }
    },
  }
</script>

<style lang='less' scoped>
.special {
  // margin-left: -48px;
}
.el-form--label-top .el-form-item__label {
  // padding: 0 0 5px;
}

.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
  // margin-bottom: 2px;
}
.el-dialog__body {
  // padding: 31px 30px;
}
.el-tag {
  // color: #fff;
  // border: 0;
  // padding: 0;
  // background-color: #fff;
  // border-radius: 50%;
}
.leader {
  .leader_top {
    height: 41px;
    .select {
      width: 75%;
    }
    .search {
      cursor: pointer;
      display: inline-block;
      width: 60px;
      height: 40px;
      background-color: #4c83ff;
      position: relative;
      left: 5px;
      img {
        position: absolute;
        top: 9px;
        left: 18px;
      }
    }
    .import {
      width: 180px;
      height: 40px;
      background-color: #4c83ff;
      box-shadow: 0px 8px 20px 4px
        rgba(86, 97, 129, 0.08);
      border-radius: 20px;
      font-size: 16px;
      color: #fff;
    }
  }
  .table {
    border-radius: 10px;
    overflow: hidden;
    margin-top: 25px;
    .footer {
      height: 60px;
      background-color: #fff;
      .paginator {
        float: right;
        margin-top: 20px;
      }
    }
    .el-dialog__title {
      color: #333;
      font-size: 28px;
    }
    .el-table td {
      padding: 3px 0;
    }
  }
  .edit_table {
    display: flex;
    flex-direction: row;
    align-items: center;
    .passMark {
      position: relative;
      .div {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 36px;
        bottom: 4px;
        img {
          width: 100%;
        }
      }
    }
    .img-wrap {
      background: url("../../assets/images/background_logo.png") no-repeat center center;
      width: 100px;
      height: 100px;
      border-radius:50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right:13px;
      box-shadow:3px 3px 6px rgba(0,0,0,.2);
      img {
        width: 100%;
      }
    }
    .btn-wrap {
      position: relative;
      .btn-upload {
        display: inline-block;
        width: 130px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #4c83ff;
        position: relative;
        font-size: 16px;
        border-radius: 20px;
        color:#fff;
        margin-bottom:10px;
      }
      .tip {
        font-size: 12px;
        color: #8c94ac;
      }
      .upload{
        opacity: 0;
        filter: alpha(opacity=0);
        position: absolute;
        width:100%;
        height:100%;
        top:0;
        z-index: 88;
        left:0;
      }
    }
   }

  .cancle_btn {
    border: 0;
    color: #4f86ff;
  }
  .checkPic {
    top: 3px;
    position: relative;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: #fff;
    overflow: hidden;
    display: inline-block;
  }
  .checkPicStatus {
    top: 3px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    color: #fff;
    overflow: hidden;
    display: inline-block;
    position: relative;
  }
}
.popover_box {
  display: flex;
  align-items: center;
  .pic-box{
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f6f7;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .sepreate {
    .checkPicdiv {
      padding-left: 25px;
    }
    .butt{
      display: inline-block;
      text-align: center;
      line-height: 36px;
      border-radius: 18px;
      background-color: #409EFF;
      color: #fff;
      position: relative;
      margin-bottom:10px;
      width: 140px;
      height: 36px;
      font-size: 14px;
      input {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        filter: alpha(opacity=0);
        z-index: 99;
      }
    }
    .tipPic {
      font-size: 14px;
      color: #8c94ac;
    }
  }

}

</style>
<style lang='less'>
.leader {
 .el-input__inner {
    outline: none;
    border: 0 !important;
    box-shadow: 0px 8px 20px 4px
    rgba(86, 97, 129, 0.08);
 }
  .has-gutter {
    th:first-child {
      border-right:3px solid #f6f6f7;
    }
  }
  .el-table__fixed-header-wrapper {
    tr {
      th:first-child {
        border-right:3px solid #f6f6f7;
      }
      th:last-child {
        border-left:3px solid #f6f6f7;
      }
    }
  }
   tr{
      td:first-child {
        border-right:3px solid #f6f6f7;
      }
      td:last-child {
        border-left:3px solid #f6f6f7;
      }
    }
}
</style>
