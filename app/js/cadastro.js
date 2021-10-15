$(document).ready(function() {
    $("#cadastro").submit(function(event) {

        event.preventDefault();
        
        $.ajax({
            url : _UrlServer+"cadastro.php",
            type : 'post',
            data : {
                nome : "",
                salario :''
            },
            beforeSend : function(){
                $("#resultado").html("ENVIANDO...");
            }
        })
        .done(function(msg){
            $("#resultado").html(msg);
        })
        .fail(function(jqXHR, textStatus, msg){
            alert(msg);
        });

    });
});