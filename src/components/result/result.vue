<template>
  <div class="result">ssss</div>
</template>
<script>
import { search } from 'api/search'
export default {
  created() {
    search('111','sss',true,20).then((res) => {
      console.log(res)
    })
  }
}
</script>