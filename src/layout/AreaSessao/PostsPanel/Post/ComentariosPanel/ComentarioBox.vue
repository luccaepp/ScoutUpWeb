<template>
    <!-- Comentário BOX -->
    <div class="col-sm-11">
        <!-- Wrapper da Caixa do Comentário -->
        <div class="col-xs-9 col-sm-11 col-sm-offset-1">
            <!-- Foto de Perfil -->
            <div class="row">
                <i class="fa fa-user-circle foto-comment col-xs-2 col-sm-1" aria-hidden="true"></i>
                <!-- Painel Comentário  -->
                <div class="panel panel-comment col-xs-9 col-xs-offset-1 col-sm-offset-1">
                    <div class="panel-heading">
                        <strong>Dilma</strong> <span class="text-muted">há 3 minutos</span>
                        <div class="pull-right">
                        <a class="text-warning" href="#">(1) Up! <i class="fa fa-level-up" aria-hidden="true"></i></a>
                        <br>
                        <a class="text-warning" href="#">(0) Down <i class="fa fa-level-down" aria-hidden="true"></i></a>
                        </div>
                    </div>
                    <div class="panel-body">
                        Nullam consequat, leo sed porta rhoncus, ante lectus molestie tellus, eu accumsan orci arcu id libero.
                    </div><!-- /panel-body -->
                </div><!-- /panel-comment -->
            </div>
        </div>
    </div>
</template>
<style>
.foto-perfil, .foto-comment{
    font-size: 60px;
    color: #eacf9b;
}
.foto-comment{
    padding: 0;
}
.panel-comment {
	position:relative;
    border:1px solid #47723E;;
    background-color:#47723E;
    padding:1px;
}
.panel-comment > .panel-body{
    border-radius:3px;
    color:#47723E;
}
/*Flecha do Comment*/
.panel-comment>.panel-heading:after,.panel>.panel-heading:before{
	position:absolute;
	top:11px;left:-16px;
	right:100%;
	width:0;
	height:0;
	display:block;
	content:" ";
	border-color:transparent;
	border-style:solid solid outset;
	pointer-events:none;
}

.panel-comment>.panel-heading:before{
	border-right-color:#47723E;
	border-width:15px;
    margin-top:-10px;
    margin-left: -10px;
}

.panel-comment > .panel-heading > strong{
    font-family: claire;
    color: #B9C159;
}

.panel-comment > .panel-heading{
    background-color:#47723E;
    height: 60px;
}

.panel-comment > .panel-heading a{
    font-family: claire!important;
    color: #B9C159!important;
    font-size: 18px;
}

.panel-comment > .panel-body{
    background-color: #B9C159;
}
</style>
