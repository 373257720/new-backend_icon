<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    action
    :http-request="function(params){return uploadFile(params)}"
    :on-preview="handlePictureCardPreview"
    :on-remove="remove"
    :limit="1"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
<!--  <el-dialog :visible.sync="dialogVisible">-->
<!--    <img width="100%" :src="dialogImageUrl" alt="">-->
<!--  </el-dialog>-->

</template>


<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        imageUrl: ''
      };
    },
    methods: {
      remove(){

      },
      uploadFile(params) {
        console.log(params)
        // console.log(params,index);formData
        const _file = params.file;
        // const isLt2M = _file.size / 1024 / 1024 < 2;
        this.formData = new FormData();
        this.formData.append("file", _file);
        this.formData.append('picture_input', 'file')
        this.formData.append('attach_dir', 'machine')
        this.$axios({
          method: "post",
          url: `${this.$baseurl}/home/common.picture/upload.html`,
          data: this.formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            this.imageUrl=this.$baseurl+ res.data.data.picture_list.original;
            console.log(this.imageUrl)
            // this.form.pic.push(res.data.data.urlBase + res.data.data.url);
            // this.form.pic.push(res.data.data.urlBase + res.data.data.url);
            // this.form.pic = res.data.data.url;
            // this.form.pic=JSON.stringify(arr)
          })
          .catch(err => {
            console.log(err);
          });
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        console.log(123)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>
