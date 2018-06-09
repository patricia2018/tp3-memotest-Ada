var array=[0,1,2,3,4,5,0,1,2,3,4,5];
var arrayModificado = shuffle(array);
var primerClick=null;
var segundoClick=null;
var intentos =0;
var cantFichasSeccionadas=0;
var matches=0; //Cuento las coincidencias
var nombre = document.getElementById("name");
var botonEnviar= document.getElementById("jugar");
const nameInput = $('.name');
const nameIntro = $('.name--intro');
var paralocalS=$("#variedadNiveles option:selected").val();
var name;//nombre del jugados id name en el ejmeplo     partidas
var nivel;

//Obtener el nombre del jugador y generar la bienvenida
$('.name--input').on('click', function () {
  const name = nameInput.val();
  const nameWelcome = `¡Hola, ${name}, ya podes jugar!`
  nameIntro.append(nameWelcome);
})


/* Shuffle del array */
function shuffle(a) {
    var j, x ;
    for (var i =0 ; i< a.length ; i++) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
     return a;
 }

/* Crea la cara de carta que varia*/
for ( var i=0 ;i<arrayModificado.length ;i++){
	  var imagen= `<img class="cartaOculta" src="img/carta${arrayModificado [i]}.jpg">`;//arrayModificado[i] , contenido.
	
      arrayModificado 
      $("#ficha"+i).append(imagen);
}
/*localStorage*/
var puntajes;//array vacio para ir pusheando el nombre y puntaje de cada jugador
function guardatosDelJugador(){
/*uso de localStorage*/
var PuntosGuardados =localStorage.getItem('movimientos');//va entre comillas como las clases. 

if (PuntosGuardados!=null){
     puntajes = JSON.parse(PuntosGuardados).movimientos;//.movimientos me trae todo el arreglo.
    }
else{
     puntajes =[];
    }
    console.log(guardatosDelJugador);
    console.log(name)
var jugada={nombre: name, nivel: nivel, clicksused: intentos};
  
puntajes.push(jugada);

jsonMovimientos={
    'movimientos':puntajes,
    'total':puntajes.length
}

var data=JSON.stringify(jsonMovimientos);
localStorage.setItem('movimientos', data);//GUARDADO*************
//\localStorage.clear();
console.log(localStorage.getItem('movimientos'))
};

/*movimientos*/
function darVuelta(primerClick,segundoClick){
         primerClick.children().toggleClass("cartaOculta cartaMostrada")
     	   segundoClick.children().toggleClass("cartaOculta cartaMostrada")
         console.log( primerClick.children())
};
 
$("td").on("click", function(e){ //EVENTO

//com esto me traigo la imagen
$(this).children().toggleClass("cartaOculta cartaMostrada")//ambas clases 

/*guarde en la variable creada, el primer click o segundo click*/
if(primerClick ==null){
          primerClick=$(this)
          $(primerClick).addClass('girar');
          //$(segundoClick).effect("pulsate" , {time:2}, "slow"); 
     }else{
         segundoClick=$(this)
         $(segundoClick).addClass('girar');
           //$(segundoClick).effect("pulsate" , {time:2}, "slow"); 
           /*Verifica si son iguales*/
           if( primerClick.children().attr("src") ==segundoClick.children().attr("src")) {
                    
                     matches++;
                     console.log("iguales");
                     console.log(matches);
                     console.log(intentos);
                     //console.log("matches.length")
     	                //console.log("Son Iguales")

            } else{
                     /*si no son iguales, se daran vuelta en 0.5 S.*/
                     setTimeout(darVuelta,500, primerClick,segundoClick)//para tiempo

                    /**/
                     intentos--;
                      conteo();
                     //console.log($('#intentosP'))
                     //$('#intentosP').text(intentos );
                        
                       console.log("Son Distintos")
                  }

                     primerClick=null;//los reseteo , asi sean igules o distintos, para la proxima ronda!
                     segundoClick=null;  
          if (matches === 6) {
                     alert('¡Ganaste!');
                      guardatosDelJugador()
                    } 
              if (intentos === 0) {
                          alert('¡Perdiste Buuuuuuuu!')
                  }     
        }
            
});

/*funcion para niveles*/
function seleccionaNiveles() {

var opcionSeleccionada = ($("#variedadNiveles option:selected").val());

    console.log('op '+ opcionSeleccionada);
    switch (opcionSeleccionada) {

        case "1" :
                   
                     intentos =18;
                     console.log('18');
                     
                     break;
        case "2":
                     
                     intentos =12;
                      console.log('12');
                     
                     break;

    
        case "3":
                     intentos =8;
                    console.log('8');
                    
                    break;

        default:        
     }
 }

function conteo (){
  console.log($('#intentosP'));
  console.log(intentos)
  //$('#intentosP').text(intentos );
  
$('#intentosP').text(/*'intentos disponibles: '*/ +intentos)
}

/*para validar nmbre, si o si tiene que ingresar el nombre*/
function  validarNombre(){

    var verificar = true;
        
    if(!nombre.value){

      //document.write("Olvidaste Ingresar tu Nombre"");
        alert("Olvidaste Ingresar tu Nombre");
        
       nombre.focus();
       verificar=false;
      }
}
window.onload = function(){
      botonEnviar.onclick = validarNombre;
    }

/*funcion para qe se seleccione un nivel*/

$('#jugar').on('click',function(){
seleccionaNiveles();
conteo();
name = document.getElementById('name').value; 
nivel = document.getElementById('variedadNiveles').value; 
console.log(nivel) ;
});/*fin para niveles*/





 