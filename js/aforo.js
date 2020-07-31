function parametroURL(_par) {

	var _p = null;
	if (location.search) location.search.substr(1).split("&").forEach(function(pllv) {
	  var s = pllv.split("="), //separamos llave/valor
		ll = s[0],
		v = s[1] && decodeURIComponent(s[1]); //valor hacemos encode para prevenir url encode
	  if (ll == _par) { //solo nos interesa si es el nombre del parametro a buscar
		if(_p==null){
		_p=v; //si es nula, quiere decir que no tiene valor, solo textual
		}else if(Array.isArray(_p)){
		_p.push(v); //si ya es arreglo, agregamos este valor
		}else{
		_p=[_p,v]; //si no es arreglo, lo convertimos y agregamos este valor
		}
	  }
	});
	return _p;
  }
var config = {
	apiKey: "AIzaSyDKgBnv_HtIygPxYmMNLi2xMOBFnkvORnk",
	authDomain: "aforo-2bad9.firebaseapp.com",
	databaseURL: "https://aforo-2bad9.firebaseio.com",
	projectId: "aforo-2bad9",
	storageBucket: "aforo-2bad9.appspot.com",
	messagingSenderId: "616346485951",
	appId: "1:192133283425:android:ea28b2484e3fac392a3420"
};


window.onload = function() { 

	$("#fecha").append(fechayhora);
	$("#coordenadas").hide();
	//$("#coordenadas").addClass("ui-disabled");
	$("#nombre").show();
	//$("#nombre").addClass("ui-disabled");
	$("#provincia").show();
	//$("#provincia").addClass("ui-disabled");
	$("#municipio").show();
	//$("#municipio").addClass("ui-disabled");
	$("#plazas").show();
	//$("#municipio").addClass("ui-disabled");
	$("#ocupacion_actual").show();
	$("#buscar").hide();



	$("#buscar").on("click", function(e) {
		var municipio=$("#municipio").val();
		window.location.href=("mobincube://action/set/{var.municipio}="+municipio);
		setTimeout(vista_municipio,000);
	})


}

      if(!firebase.apps.length){
		firebase.initializeApp(config);
		
		autenticar();
	
	     }

var provider="";

	

var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
var fechayhora;
var timestamp;
var offset;


var offsetRef = firebase.database().ref(".info/serverTimeOffset");
offsetRef.on("value", damefechayhora, errorfecha);

function damefechayhora(snap) {

	offset = snap.val();
	timestamp = new Date().getTime() + offset;
	//	timestamp=db.Timestamp;
	
	
	var d = new Date(timestamp);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();

	var curr_hour = d.getHours();
	var curr_min = d.getMinutes();
	var curr_sec = d.getSeconds();


	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}

	fechayhora = day + "/" + month + "/" + year + " " + curr_hour + ":" + curr_min + ":" + curr_sec;

	$("#fecha").append(" "+fechayhora);


	
}




function formateofecha(fecha) {

	var day = fecha.getDate();
	var month = fecha.getMonth() + 1;
	var year = fecha.getFullYear();

	var curr_hour = fecha.getHours();
	var curr_min = fecha.getMinutes();
	var curr_sec = fecha.getSeconds();


	if (day < 10) {
		day = "0" + day;
	}
	if (month < 10) {
		month = "0" + month;
	}

	return day + "/" + month + "/" + year + " " + curr_hour + ":" + curr_min + ":" + curr_sec;

}

function errorfecha(e) {

	console.log("error" + e);
}



var email = "";
var coordenadas = "";


function autenticar(){
email = "aforo@prueba.com";
var autor = firebase.auth();
var password = "aforo2020";

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function () {
	
						var operacion = parametroURL('operacion');
				
			if(operacion=="alta"){
				
				alta();
			}


			if(operacion=="consulta"){
		
				
			
				window.location.href="mobincube://javascript/variblesConsulta('{location}','{var.coordenadas}')";
		
			}



			if(operacion=="buscar"){

				$("#municipio").show();
				$("#buscar").show();

			}


			if(operacion=="actualizo"){
				window.location.href="mobincube://javascript/variblesActualizo('{location}','{var.coordenadas}')";
				
			
				
			}


		})
		.catch(function (error) {
		
			alertify.error(error);
		});

}
function variblesConsulta(corcon,varicon){
	alertify.success(corcon);
	alertify.success(varicon);
	
	consulta(corcon);
	
}
function variblesActualizo(coractu,variactu){
	alertify.success(coractu);
	alertify.success(variactu);
	
	actualizo(vari);
	
}


function alta() {

	var operacion = parametroURL('nombre');
	var operacion = parametroURL('provincia');
	var operacion = parametroURL('municipio');
	var operacion = parametroURL('coordenadas');
	var operacion = parametroURL('ocupacion_actual');
	var operacion = parametroURL('plazas');




	$("#coordenadas").hide();
	//$("#coordenadas").addClass("ui-disabled");
	$("#nombre").hide();
	//$("#nombre").addClass("ui-disabled");
	$("#provincia").hide();
	//$("#provincia").addClass("ui-disabled");
	$("#municipio").hide();
	//$("#municipio").addClass("ui-disabled")

	$("#ocupacion_actual").hide();
	$("#plazas").hide();
							db.collection("aforo").add({
							nombre:nombre,
							provincia: provincia,
							municipio: municipio,
							coordenadas: coordenadas,
							ocupacion_actual:ocupacion_actual,
							plazas:plazas,
							fecha:fechayhora
						})
							.then(function (docRef) {


								alertify.success("Se ha añadido correctamente");
							buscar_coordenadas();

							})
							.catch(function (error) {

								console.error("Error adding document: ", error);
							});
				
}



function borrar(coordenadas){
var borrar = db.collection('aforo').where('coordenadas', '==', coordenadas);
					resul.get()
						.then(function (querySnapshot) {
							querySnapshot.forEach(function (doc) {
								doc.ref.delete();
							});
						}).catch(function (error) {
							console.error("Error borrando preguntas: ", error);
						});
					}		
		

var datos_consult;




function consulta(coordenadas) {

	$("#coordenadas").show();
	//$("#coordenadas").addClass("ui-disabled");
	$("#nombre").show();
	//$("#nombre").addClass("ui-disabled");
	$("#provincia").show();
	//$("#provincia").addClass("ui-disabled");
	$("#municipio").show();
	//$("#municipio").addClass("ui-disabled");
	$("#plazas").show();
	//$("#municipio").addClass("ui-disabled");
	$("#ocupacion_actual").show();
	//$("#municipio").addClass("ui-disabled");
	$("#buscar").hide();
	//$("#municipio").addClass("ui-disabled");
	db.collection("aforo").where("coordenadas", "==", coordenadas).get()
		.then((querySnapshot) => {

			querySnapshot.forEach((doc) => {


				datos_consult = doc.data();

		
				$("#nombre").val(datos_consult.nombre);
				$("#provincia").val(datos_consult.provincia);
				$("#municipio").val(datos_consult.provincia);
				$("#ocupacion_actual").val(datos_consult.ocupacion_actual);
				$("#plazas").val(datos_consult.plazas);	
				$("#fecha").val(fechayhora);
			//	window.location.href=("mobincube://action/set/{var.coordenadas}="+coordenadas);
			//setTimeout(vistamapa,1000);


			});
		});
	
}


function vista_mapa(){
	alertify.success("vistamapa");
	window.location.href=("mobincube://action/section/map_1");
	}

	function vista_municipio(){
		alertify.success("vistamunicipio");
		window.location.href=("mobincube://action/section/vista_mu");
		}
function mapa(){
	alertify.success("mapa");
window.location.href=("mobincube://action/section/mapa");
}

function actualizo(coordenadasl) {
			var nombre=$("#nombre").val();
			var provincia=$("#provincia").val();
			var municipio=$("#municipio").val();
			var ocupacion_actual=$("#ocupacion_actual").val();
			var plazas=$("#plazas").val();
				
						var acctualiz = db.collection('aforo').where('coordenadas', '==', coordenadas);
						actualiz.set({
							nombre:nombre,
							provincia: provincia,
							municipio: municipio,
							ocupacion_actual:ocupacion_actual,
							plazas:plazas,
							fecha:fechayhora
						})										
	}