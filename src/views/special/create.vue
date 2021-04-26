<template>
  <special-detail :is-edit="false" />
</template>

<script>
import SpecialDetail from './components/SpecialDetail'

export default {
  name: 'CreateSpecial',
  components: { SpecialDetail }
}
</script>

