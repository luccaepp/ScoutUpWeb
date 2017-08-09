<template>
    <!-- PANEL REALIZAR POST -->
    <div class="panel panel-warning">
        <div class="panel-heading">
            <i class="fa fa-align-left" aria-hidden="true"></i> Faça um Post
        </div>
        <div class="panel-body">
            <div class="form-group">
                <textarea id="txtPost" class="form-control" cols="30" rows="5"></textarea>
            </div>                       
        </div>
        <div class="panel-footer panel-footer-realizar">
            <div class="btn-toolbar pull-right">
                <button class="btn btn-primary"><i class="fa fa-picture-o" aria-hidden="true"></i></button>
                <button class="btn btn-info"><i class="fa fa-paperclip" aria-hidden="true"></i></button>
                <input class="btn btn-success" type="button" value="Publicar">
                
            </div>
        </div>
    </div>
</template>

<style>
textarea#txtPost{
    resize: vertical;
    max-height: 200px;
}
.panel-footer-realizar{
    height: 50px;
}
</style>