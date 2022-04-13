<template>
  <div id="Footer">
    <div class="w">
      <h4>{{address.tips}}</h4>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        <img :src="address.img" :title="address.beian">{{address.beian}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      address: {
        tips: '本宿舍管理系统 简体中文版提供的内容仅用于学校日常，Copyright © 2022 - 至今 LELEKAIFA.TOP. All Rights Reserved !',
        img: 'https://dcdn.it120.cc/2022/01/23/d53533de-8bde-4e43-9575-ebcafdb0efe7.png',
        beian: '粤ICP备2021155124号-2'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 #Footer{
   width: 100%;
   height: 150px;
   overflow: hidden;
   opacity: .8;
   background-color: var(--white);
   .w{
     width: 80%;
     margin: 0 auto;
     text-align: center;
     h4{
       margin: 3% 0;
       font-size: 18px;
       font-weight: 400;
       color: var(--black);
     }
     a{
       color: var(--grey);
       img{
         vertical-align: top;
       }
       &:hover{
         color: var(--blue);
       }
     }
   }
 }
 @media screen and (max-width: 750px){
   #Footer{
     .w{
       width: 90%;
       h4{
         margin: 8% 0;
         font-size: 15px;
       }
     }
   }
 }
</style>
