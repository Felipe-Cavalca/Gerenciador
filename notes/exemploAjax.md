# Exemplo ajax
```
$.ajax({
     url : "cadastrar.php",
     type : 'post',
     data : {
          nome : "Maria Fernanda",
          salario :'3500'
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
```
