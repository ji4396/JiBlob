# vue2ts实际案例



1. 基本写法
```js
<template>
  <div>
    <h3>qrcode</h3>
    <button @click="$router.go(-1)">返回</button>
    <div id="poster" class="flex-row" style="position: relative">
      <img class="qr" id="qr-img" :src="qrCodeUrl" alt="" />
      <span>123</span>
      <span>123fff</span>
      <span>123</span>
    </div>
    <button class="btn" @click="saveImg">保存海报</button>
  </div>
</template>

<script lang='ts'>
import qrcode from 'qrcode'
/* 注意:引入qrcode ts可能提示错误，需要在项目根目录下.d.ts文件后缀中进行声
明，比如 declare module 'qrcode'。*/
import html2canvas from "html2canvas";
//从vue-property-decorator中引入Vue Component
import { Vue, Component } from "vue-property-decorator";

@Component //装饰器写了后，类中vue对应的生命周期才起作用
export default class Qrcode extends Vue {
  qrCodeUrl: string ="";
  dataUrl: string = "";
  posterDataUrl: string = "";// 对应上对应的类型
  mounted() {
    let poster: any = document.getElementById("poster");
    html2canvas(poster).then((canvas2) => {
      this.posterDataUrl = canvas2.toDataURL();
    });
  }
  saveImg(){}
}
</script>
```

2. 组件路由守卫、普通监听、深度监听、请求数据以及组件通信的写法
父组件
```js
<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <input type="text" v-model="name" @keydown.enter="send" v-show="isShow" />
    <el-button type="warn" @click="clickOne">点击</el-button>
    <come-show :list="list" @start="start"></come-show>
    <p>{{ page.userId }}</p>
    <p>{{ page.id }}</p>
    <p>{{ page.title }}</p>
    <p>{{ page.body }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import comeShow from "@/components/comeShow.vue";
import { hello } from "@/api/user/user";
import { Route } from "vue-router";
type miniObject = {
  name: {
    firstName: string;
  };
};
Component.registerHooks(['beforeRouteLeave','beforeRouteEnter'])
@Component({
  components: {
    comeShow,
  },
  beforeRouteEnter(to: Route, from: Route, next: Function) {
    // 由于写在装饰器中，钩子函数可以自动推测出to、from、next的类型，所以可以加类型也可以不加
    console.log("组件内前置守卫-------------");
    next();
  },
  
})
export default class HelloWorld extends Vue {
  //定义数据
  name: string = "1";
  isShow: boolean = false;
  list: Array<any> = [];
  page: Object = {};
  content: miniObject = {
    name: {
      firstName: "ji",
    },
  };
 
  beforeRouteLeave(to: Route, from: Route, next: Function) {
    console.log("组件内后置守卫------------");
    next();
  }
  //使用监听
  @Watch("isShow")
  isShowChange(val: boolean) {
    //代码逻辑
  }
  //深度监听
  @Watch("content.name", { deep: true })
  listChange(name: string) {
    ////代码逻辑
  }
  async mounted() {
    const res = await hello();
    if (res.status !== 200) return;
    const { data } = res;
    this.page = data;
  }
  // 定义方法
  clickOne(): void {
    this.content.name.firstName = String(Math.random() * 1);
  }
  start(): void {
    this.isShow = true;
  }
  send(): void {
    if (!this.name) return;
    this.list.push(this.name);
    this.name = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
```
子组件
```js
<template>
  <div>
      <h1>{{one.name}} <button @click="start">通知父组件开始输入</button> </h1>
      <ul v-for="(item,index) in list" :key="index">
          <li>{{item}}  <button @click="remove(index)">删除</button>  <el-button>删除</el-button>  </li>
      </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
type Ji={
    name:string
}
@Component({})
export default class comeShow extends Vue {
  //第一种写法,可以指定对应的数据类型默认值
  @Prop({
      type:Array,
      required:false,
      default:[]
  }) list!:[];
  // 第二种写法，简写形式
  // @Prop()list!:[]
  one:Ji = {name:'我是comeShow组件'}
  start():void{
      this.$emit('start')
  }
  remove(index:number):void{
      this.list.splice(index,1)
  }
}
</script>

<style>

</style>
```
