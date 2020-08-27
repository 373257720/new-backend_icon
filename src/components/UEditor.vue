<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>
import "../../static/UE/ueditor.config.js";
import "../../static/UE/ueditor.all.min.js";
import "../../static/UE/lang/en/en.js";
import "../../static/UE/lang/zh-cn/zh-cn.js";
export default {
  name: "UE",
  props: {
    config: {
      type: Object
    },
    id: {
      type: String
    },
    content: {
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      //每个编辑器生成不同的id,以防止冲突
      // randomId: "editor_" + Math.random() * 100000000000000000,
      //编辑器实例
      editor: null,
      ready: false
    };
  },
  watch: {
    content: function(val, oldVal) {
      if (val != null && this.ready) {
        // console.log(123);
        // this.editor = UE.getEditor(this.id, this.config);
        this.editor.setContent(val);
      }
    }
  },
  mounted() {
    this._initEditor();
  },
  methods: {
    _initEditor() {
      const _this = this;
      //dom元素已经挂载上去了
      this.$nextTick(() => {
        this.editor = UE.getEditor(this.id, this.config);
        this.editor.options.lang = this.config.lang;
        // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
        this.editor.addListener("ready", () => {
          this.ready = true;
          this.editor.setContent(this.content);
          this.$emit("ready", this.editor);
        });
      });
    }
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>