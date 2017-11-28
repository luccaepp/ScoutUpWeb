<script>
import { mapGetters } from 'vuex'
import StComentariosPanel from './Post/ComentariosPanel.vue'
import timeStamp from '../../../funcoesGlobais/timeStamp/timeStamp'
import StFotosPanel from './Post/FotosPanel.vue'

export default {
  props: ['ehDessaArea', 'post', 'pathParaArea', 'ehDessaArea'],
  data(){
    return {
      atividade: null,
      local: null,
      presentes: []
    }
  },
  components: {
    StComentariosPanel,
    StFotosPanel
  },
  firebase(){
    return {
      atividade: {
        source: this.database.ref(`atividade/${this.post.chaveAtividade}`),
        asObject: true
        }
    }
  },
  computed: {
    ...mapGetters({database: 'getDatabase', usuarioDatabase: 'getUsuarioDatabase'}),
    getTimeStamp(){
      return timeStamp
    },
    presencaArray(){
      if(!this.atividade.presentes) return
      return Object.keys(this.atividade.presentes).map(e => this.atividade.presentes[e])
    },
    pathParaOPost(){
      return this.pathParaArea+'/posts/'+this.post['.key']
    },
    temPermissaoFoto(){
      if(!this.atividade['.key']) return
      let participantes = this.atividade.participantes
      let temPermissao = false
      for(let i=0;i<participantes.length;i++){
        let participante = participantes[i]
        if(participante.chave == this.usuarioDatabase.grupo || participante.chave == this.usuarioDatabase.secao.chave){
          temPermissao = true
          break
        }
      }

      return temPermissao
    }
  },
  watch: {
    atividade(){
      if(this.atividade['.key']){
        console.log('carregou ativPOST', this.atividade)
        this.local = this.atividade.local
        this.presentes.length = 0
        //adicionando os membros confirmados
        if(this.atividade.presentes){
          Object.keys(this.atividade.presentes).forEach(presenteKey => {
            let valorPresente = this.atividade.presentes[presenteKey]
            console.log("valorPresente",presenteKey,  valorPresente)
            if(!valorPresente || valorPresente === 'false') return
            this.database.ref(`usuario/${presenteKey}`).once('value', snap => {
              let part = snap.val()
              console.log("part", part)
              part.chave = snap.key
              this.presentes.push(part)
            })
          })
        }
      }
    }
  }
}
</script>

<template>
    <!-- PAINEL DO POST -->
  <div class="panel panel-post panel-transparent col-xs-12" v-if="atividade">
    <div class="panel-heading">
      <div class="row">
          <!-- Foto de Perfil do Usuário que realizou o Post -->
        <div class="row">
          <div class="col-xs-12 tit">
            <i class="fa fa-star" aria-hidden="true"></i>
            Atividade -
            {{post.titulo}}
          </div>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-4 align-center">
          <h2 class="text-center">Local</h2>
          <gmap-map
            v-if="local"
            :center="local"
            :zoom="14"
            map-type-id="hybrid"
            class="mapa"
            >
            <gmap-marker v-if="local"
              :position="local">
            </gmap-marker>
          </gmap-map>
        </div>
        <div class="col-md-4 text-center">
          <h2>Data e Horário</h2>
          <h3 class="times align-center">
            <p class="time-inicial">
              <i class="fa fa-calendar" aria-hidden="true"></i>  
              {{getTimeStamp.retornaTimeStampFormatado(atividade.inicio)}}
            </p>
            <p>Até</p>
            <p class="time-final">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              {{getTimeStamp.retornaTimeStampFormatado(atividade.termino)}} 
            </p>
          </h3>
        </div>
        <div class="col-md-4 align-center">
          <h2 class="text-center">Lista de Presença</h2>
          <div class="panel panel-success lista-presenca">
            <div class="panel-heading">
            </div>
            <div class="panel-body">

              <div class="list-group">
                <template v-if="presentes.length > 0">
                  <div v-for="presente in presentes" class="list-group-item list-group-item-success">
                    <i class="fa fa-check"></i>
                    <router-link  class="text-success" :to="`/usuarios/${presente.chave}`">{{presente.nome}}</router-link>
                  </div>
                </template>
                <div v-else class="list-group-item list-group-item-success">
                  Nenhum participante confirmado...
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="row">
          <st-fotos-panel :temPermissao="temPermissaoFoto" :pathParaOPost="pathParaArea + '/posts/' + post['.key']" :post="post"></st-fotos-panel>
      </div>
      <div class="row">
        <st-comentarios-panel :ehDessaArea="ehDessaArea" :pathParaOPost="pathParaOPost" :post="post"></st-comentarios-panel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lista-presenca{
  height: 260px;
  max-height: 260px;
  overflow: scroll;
}
.fa-star{
  color: yellow;
}
.tit{
  font-size: 30px;
  font-family: claire;
}
.mapa{
  height: 260px;
  width: 290px;
  align-self: center;
}
.align-center{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.times{
  height: 18vh;
}
@media(max-width: 990px) and (min-width: 532px){
  .mapa{
    height: 400px;
    width: 430px;
  }
}
</style>
