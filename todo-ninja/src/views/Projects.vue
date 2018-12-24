<template>
  <div class="projects">
    <v-snackbar v-model="snackbar1" :timeout="4000" top color="green">
      <span>上传成功.</span>
      <v-btn color="white" flat @click="snackbar1 = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar2" :timeout="4000" top color="green">
      <span>打印完成.</span>
      <v-btn color="white" flat @click="snackbar2 = false">Close</v-btn>
    </v-snackbar>
    <h1 class="subheading grey--text">我的保单</h1>

    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="project in myProjects" :key="project.title">
          <div slot="header" class="py-1">{{ project.title }}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">下单时间 {{ project.due }}</div>
              <v-list-tile-sub-title>从: {{ project.beginloc }} 到: {{ project.endloc }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>运输车辆 {{ project.transtool }}</v-list-tile-sub-title>
              <v-list-tile-sub-title>货物名称 {{ project.goodsname }}</v-list-tile-sub-title>
              <v-flex md6 sm12>
                <div class="text-xs-left">
                  <v-chip box color="primary">投保金额 {{ project.amount }}</v-chip>
                  <v-chip box color="green">保费 {{ project.premium }}</v-chip>
                </div>
              </v-flex>
              
            </v-card-text>
            <v-card-actions>
              <v-btn flat>{{project.status}}</v-btn>
              <v-btn color="purple" @click="upload(project.id)" dark>上传</v-btn>
              <v-btn color="success" @click="print(project.id)" >打印</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";

export default {
  data() {
    return {
      projects: [],
      snackbar1:false,
      snackbar2:false,
    };
  },
  computed: {
    myProjects() {
      return this.projects.filter(project => {
        return project.person === "PICC" && project.status != "完成";
      });
    }
  },
  methods:{
    upload:function(id){
      db.collection("projects").doc(id).update({
        status:'生效'
      });
      this.snackbar1=true;
      this.projects.forEach(item=>{
        if(item.id===id)
        {
          item.status='生效';
        }
      });
    },
    print:function(id){
      db.collection("projects").doc(id).update({
        status:'完成'
      });
      this.snackbar2=true;
      this.projects.forEach(item=>{
        if(item.id===id)
        {
          item.status='完成';
        }
      });
     
    }
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === "added") {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  }
};
</script>
