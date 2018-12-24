<template>
  <v-dialog max-width="600px" v-model="dialog">
    <v-btn flat slot="activator" class="success">投保</v-btn>
    <v-card>
      <v-card-title>
        <h2>网上下单</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
           <v-layout row wrap>
          <v-text-field v-model="appuser" label="投保人" prepend-icon="account_box" :rules="inputRules"></v-text-field>
          <v-text-field v-model="insured" label="被投保人" prepend-icon="how_to_reg" :rules="inputRules"></v-text-field>
           </v-layout>
      <v-layout row wrap>
          <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="goodsname"
            label="货物名称"
            :rules="inputRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="packages"
            type="number"
            label="包装及件数"
            :rules="numberRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-select
          v-model="packaging"
          placeholder="无包装"
          :items="packagetype"
          label="包装"
        ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
         <v-select
          v-model="goodsclass1"
          :items="goodstype1"
          label="货物大类"
        ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md6>
           <v-select
           v-model="goodsclass2"
          :items="goodstype2"
          label="货物小类"
        ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
          <v-flex xs12 sm6 md4>
          <v-select
          v-model="transmodel"
          :items="['公路']"
          label="运输方式"
        ></v-select>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-text-field
            v-model="transtool"
            label="车牌号"
            :rules="inputRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-menu
        :close-on-content-click="false"
        v-model="datemenu"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="transdate"
          label="发车时间"
          prepend-icon="event"
        ></v-text-field>
        <v-date-picker v-model="transdate" @input="datemenu = false"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
          <v-flex xs12 sm6 md4>
         <v-text-field
            v-model="beginloc"
            prepend-icon="place"
            label="始发地"
            :rules="inputRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field
            v-model="routerloc"
            label="途径地"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field
         prepend-icon="place"
            v-model="endloc"
            label="目的地"
            :rules="inputRules"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
          <v-flex xs12 sm6 md4>
         <v-text-field
            v-model="amount"
            prepend-icon="attach_money"
            type="number"
            label="投保金额"
            :rules="amountRules"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field
            v-model="rate"
            label="费率‰"
            type="number"
            readonly="readonly"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4>
         <v-text-field
            v-model="premium"
            type="number"
            label="保费"
            readonly="readonly"
          ></v-text-field>
        </v-flex>
      </v-layout>
       <v-layout row wrap>
          <v-textarea rows="3" v-model="content" label="附加险条款内容" prepend-icon="edit" ></v-textarea>

           
 
  </v-layout>
          <v-btn flat @click="submit" class="success mx-0 mt-3" :loading="loading">保存</v-btn>
         
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from 'date-fns/format'
import db from '@/fb'
import moment from 'moment'
import chance from 'chance'

export default {
  data() {
    return {
      datemenu:false,
      packagetype:['箱','纸箱','木箱','板条箱','大立箱','包','袋','篓','托盘','桶','听','瓶','罐','盒',''],
      goodstype1:['轻纺、文体、日用品、工艺品',
      '木、木浆及木制品；纸、纸浆、纸板及其制品',
      '金属原料、矿产及建材类、玻璃及其制品',
      '粮食、食品、果蔬、饮料、烟草及饲料',
      '石油、化工原料及其制品',
      '电器、机械、运输工具、设备类',
      '其它'
      ],
      goodstype2:['日用杂货及行李货物',
      '文具用品',
      '其他纺织制成品'
      ],
      appuser:'苏州市xxx管理咨询有限公司',
      insured:'苏州市xxx管理咨询有限公司',
      goodsname:'',
      packages:'',
      packaging:null,
      goodsclass1:'轻纺、文体、日用品、工艺品',
      goodsclass2:'日用杂货及行李货物',
      transmodel:'公路',
      transtool:'',
      transdate:moment().format('YYYY/MM/DD hh:00'),
      beginloc:'',
      routerloc:'',
      endloc:'',
      amount:null,
      rate:0.15,
      premium:0.00,
      content:'',
      inputRules: [
        v => !!v || 'This field is required',
        v => v.length >= 2 || 'Minimum length is 2 characters'
      ],
      amountRules: [
        v => !!v || 'This field is required',
        v => v>0 || '投保金额必须大于0'
      ],
      numberRules: [
        v => !!v || 'This field is required',
        v => v>0 || '必须大于0'
      ],
      loading: false,
      dialog: false
    }
  },
  watch: {
    amount:function(val){
      this.premium = (val*this.rate*0.001).toFixed(2);
    }
  },
  methods: {
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true
        const project = { 
          title:new Chance().fbid(),
         appuser:this.appuser,
      insured:this.insured,
      goodsname:this.goodsname,
      packages:this.packages,
      packaging:this.packaging,
      goodsclass1:this.goodsclass1,
      goodsclass2:this.goodsclass2,
      transmodel:this.transmodel,
      transtool:this.transtool,
      transdate:this.transdate,
      beginloc:this.beginloc,
      routerloc:this.routerloc,
      endloc:this.endloc,
      amount:this.amount,
      rate:this.rate,
      premium:this.premium,
      content:this.content,
      due:moment().format('YYYY/MM/DD hh:mm'),
          person: 'PICC',
          status: '暂存'
        }
        db.collection('projects').add(project).then(() => {
          this.loading = false
          this.dialog = false
          this.$emit('projectAdded')
        })
      }
    }
  },
  computed: {
    formattedDate () {
      console.log(this.due)
      return this.due ? format(this.due, 'Do MMM YYYY') : ''
    }
  }
}
</script>
