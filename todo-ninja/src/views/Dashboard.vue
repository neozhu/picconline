<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">

      <v-layout row justify-start class="mb-3">
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('title')" slot="activator">
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By 保单号</span>
          </v-btn>
          <span>Sort by 保单号</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn small flat color="grey" @click="sortBy('amount')" slot="activator">
            <v-icon small left>attach_money</v-icon>
            <span class="caption text-lowercase">By 金额</span>
          </v-btn>
          <span>Sort by 金额</span>
        </v-tooltip>
      </v-layout>
      
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md4>
            <div class="caption grey--text">保单号</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">投保金额</div>
            <div>{{ project.amount | currency }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">投保人</div>
            <div>{{ project.appuser }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">下单日期</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text my-2 caption`">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>
import db from '@/fb'

export default {
  data() {
    return {
      projects: []
    }
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a,b) => a[prop] < b[prop] ? -1 : 1)
    }
  },
  created() {
    db.collection('projects').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added') {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }  
      })
    })
  }
}
</script>

<style>

.project.完成{
  border-left: 4px solid #3cd1c2;
}
.project.生效{
  border-left: 4px solid #ffaa2c;
}
.project.暂存{
  border-left: 4px solid #f83e70;
}
.v-chip.完成{
  background: #3cd1c2;
}
.v-chip.生效{
  background: #ffaa2c;
}
.v-chip.暂存{
  background: #f83e70;
}

</style>
