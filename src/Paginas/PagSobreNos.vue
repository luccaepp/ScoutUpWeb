<script>
export default {

}
</script>

<template>
    <div class="container container-main">
        <div class="row">
            <h1 class="text-center sobre-nos-titulo">Sobre Nós</h1>
        </div>
        <div class="row">
            <ul class="list-group text-center">
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-xs-3">
                            <img class="img-circle" src="../assets/nos/patrick.jpg" alt="Foto do Patrick">
                            <p>Patrick Stival Chaerke</p>
                        </div>
                        <div class="col-xs-9">
                            <div class="well">
                                Sou responsável por boa parte da programação da parte web e do
                                back-end do software. :D
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-xs-9">
                            <div class="well">
                                Minha responsabilidade foi principal na parte web, em que fiz a troca
                                de mensagens e soluções de problemas em geral.
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <img src="../assets/nos/heitor.jpg" alt="Foto do Heitor" class="img-circle">
                            <p>Heitor Ventura</p>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-xs-3">
                            <img class="img-circle" src="../assets/nos/mamede.jpg" alt="Foto do Mamede">
                            <p>Gustavo Mamede</p>
                        </div>
                        <div class="col-xs-9">
                            <div class="well">
                                Minha responsabilidade foi de administrar o andamento projeto e criar o guia do usuário.
                            </div>
                        </div>
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="row">
                        <div class="col-xs-9">
                            <div class="well">
                                Fui Idealizador do projeto e programador da plataforma Android.
                            </div>
                        </div>
                        <div class="col-xs-3">
                            <img src="../assets/nos/lucca.jpg" alt="Foto do Lucca" class="img-circle">
                            <p>Lucca Eppinger</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
h1{
    font-family: claire;
    color: #EACF9B;
    font-size: 100px;
}
img{
    width: 200px;
    height: 215px;
}
.list-group-item{
    padding: 30px;
}
</style>

<style>
body{
    background-image: url(../assets/paisagem-background.png);
}
.sobre-nos-titulo{
    border-bottom-style: dotted;
    border-bottom-width: 1px;
}
</style>
