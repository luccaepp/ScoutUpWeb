<script>
export default {
    props: ['itemAtivo']
}
</script>

<template>
  <div id="modalProgressao" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">
                    <template v-if="itemAtivo">{{itemAtivo}}</template>
                    <template v-else>
                        <i class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                    </template>
                </h4>
              </div>
              <div class="modal-body">
                  Aqui será mostrada a progressão do usuário no item {{itemAtivo}}
              </div>
          </div>
      </div>
  </div>
</template>

<style scoped>

</style>

