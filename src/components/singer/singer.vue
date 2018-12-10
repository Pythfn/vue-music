<template>
  <div class="singer">
    geshou
  </div>
</template>
<script>
import { getSingerList } from 'api/singer.js'
import Singer from 'common/js/singer.js'
export default {
  data() {
    return {
      list: [],
      tempList: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === 0) {
          console.log(res.data.list)
          this.list = this.formatList(res.data.list)
          console.log(this.list)

        }
      })
    },
    formatList(list) {
      let new_list = []
      let hot_list = [{
        title: 'Hot Singer',
        items: []
      }]
      let alpha_list = []
      list.forEach((item) => {
        hot_list.items.push(new Singer(Fsinger_id, Fsinger_name))
      })
      return hot_list
    }
  }
}

</script>
