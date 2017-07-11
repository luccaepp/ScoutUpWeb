<template>
    <div class="panel panel-primary painel-progressao col-lg-5 col-lg-offset-1 painel-fix-padding">
        <div class="panel-heading">
            <i class="fa fa-trophy" aria-hidden="true"></i> Mural da Progressão
        </div>
        <div class="panel-body">
            <ul class="list-group list-inline list-progressao text-center">
                <li class="list-group-item list-group-item-success col-lg-12">
                    <p><i class="fa fa-certificate" aria-hidden="true"></i> Progressão 1</p>
                </li>
                <li class="list-group-item list-group-item-success col-lg-12">
                    <p>Progressão 2</p>
                </li>
            </ul>
            <div class="form-group botoes-progressao">
                <button class="btn btn-success form-control">
                    Adicionar
                </button>
            </div>

        </div>
    </div>
</template>

<style>
    .fa-certificate{
        color: gold;
    }
    .botoes-progressao{
        position: relative;
        top: 10px;
    }
</style>