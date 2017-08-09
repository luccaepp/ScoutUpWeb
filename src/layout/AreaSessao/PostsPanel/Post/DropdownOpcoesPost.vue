<template>
    <!-- DROPDOWN DAS OPÇÕES DO POST -->
    <div class="dropdown col-xs-1 col-xs-offset-4 col-sm-offset-6 col-lg-1 col-lg-offset-5">
        <span class="dropdown-toggle" type="button" data-toggle="dropdown">
            <span class="glyphicon glyphicon-chevron-down">
            </span>
        </span>
    <ul class="dropdown-menu dropdown-menu-right menu-opt-post" role="menu">
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a></li>
        <li role="presentation" class="divider"></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="#"><i class="fa fa-times" aria-hidden="true"></i> Excluir</a></li>
    </ul>
    </div>
</template>
<style>
.menu-opt-post{
    margin-top: 10px;
}

.menu-opt-post li :hover{
    background-color: #846246 !important;
}
.glyphicon-chevron-down{
    color:#eacf9b!important;
}
.dropdown-menu{
    border: 1px solid #eacf9b;
}
.divider{
    background-color: #eacf9b!important;
}
</style>
