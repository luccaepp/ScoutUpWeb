<template>
    <div class="panel panel-warning painel-amigos col-lg-5 painel-fix-padding">
        <div class="panel-heading">
            <i class="fa fa-users" aria-hidden="true"></i> Amigos
        </div>
        <div class="panel-body">
            <ul class="list-group list-inline text-center list-amigos">
                <li class="list-group-item list-group-item-warning col-lg-3">
                    <i class="fa fa-user-circle foto-amigos" aria-hidden="true"></i>
                    <h4 class="list-group-item-heading">Michel</h4>                          
                </li>
                <li class="list-group-item list-group-item-warning col-lg-3">
                    <i class="fa fa-user-circle foto-amigos" aria-hidden="true"></i>
                    <h4 class="list-group-item-heading">Dilma</h4>                          
                </li>
                <li class="list-group-item list-group-item-warning col-lg-3">
                    <i class="fa fa-user-circle foto-amigos" aria-hidden="true"></i>
                    <h4 class="list-group-item-heading">Gilmar</h4>                          
                </li>
                <li class="list-group-item list-group-item-warning col-lg-3">
                    <i class="fa fa-user-circle foto-amigos" aria-hidden="true"></i>
                    <h4 class="list-group-item-heading">Neves</h4>                          
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
    .list-amigos::-webkit-scrollbar {
        width: 11px;
        height: 11px;
    }
    .list-amigos::-webkit-scrollbar-button {
        width: 1px;
        height: 1px;
    }
    .list-amigos::-webkit-scrollbar-thumb {
        background: #f4e7cc;
        border: 22px none #ffffff;
        border-radius: 50px;
    }
    .list-amigos::-webkit-scrollbar-thumb:hover {
        background: #eacf9b;
    }
    .list-amigos::-webkit-scrollbar-thumb:active {
        background: #dfb566;
    }
    .list-amigos::-webkit-scrollbar-corner {
        background: transparent;
    }

    .list-amigos{
        overflow: scroll;
        height: 170px;
    }
    .list-amigos > li{
       margin:10px;
    }
</style>