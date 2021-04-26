<template>
  <special-detail :is-edit="true" />
</template>

<script>
import SpecialDetail from './components/SpecialDetail'

export default {
  name: 'EditSpecial',
  components: { SpecialDetail }
}
</script>

