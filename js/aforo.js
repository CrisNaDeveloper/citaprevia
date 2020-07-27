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
	//aquitengo fechay hora
	
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


function autenticar(){
email = "aforo@prueba.com";
var autor = firebase.auth();
var password = "aforo2020";

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function () {
	
		//	alertify.success("autenticada");
		})
		.catch(function (error) {
		
			alertify.error(errorMessage);
		});

}



var operacion = parametroURL('operacion');
if(operacion=="alta"){
	alta();
}







function alta() {

	nombre = parametroURL('nombre');
	provincia = parametroURL('nombre');
	municipio = parametroURL('nombre');
	coordenadas = parametroURL('coordenadas');
	ocupacion_actual = parametroURL('ocupacion_actual');
	plazas = parametroURL('plazas');
	fecha = parametroURL('fecha');

							db.collection("aforo").add({
							nombre:nombre,
							provincia: provincia,
							municipio: municipio,
							coordenadas: coordenadas,
							ocupacion_actual:ocupacion_actual,
							plazas:plazas,
							fecha:""

						})
							.then(function (docRef) {


								alertify.success("añadido");


							})
							.catch(function (error) {

								console.error("Error adding document: ", error);
							});
				
}



function borrar(coordenadas){
var preguntas_borrar = db.collection('preguntas').where('coordenadas', '==', coordenadas);
					preguntas_borrar.get()
						.then(function (querySnapshot) {
							querySnapshot.forEach(function (doc) {
								doc.ref.delete();
							});
						}).catch(function (error) {
							console.error("Error borrando preguntas: ", error);
						});
					}		
		
function consultar(coordenadas) {

	db.collection("aforo").where("coordenadas", "==", coordenadas).get()
		.then((querySnapshot) => {

			querySnapshot.forEach((doc) => {


				test = doc.data();

				cargarListaTest(doc.id, test.nombre, test.numrespaprobar, test.premio);


			});
		});




}


function cargarcategorias() {
	// db.collection("tests").get().then((querySnapshot) => {

	let categoria = "";


	$("#listacategorias").empty();
	$("#listacategorias").select('refresh');
	$("#listacategorias").append("<option value='--' selected >Seleccione una categoría...</option>");
	db.collection("categorias").get()
		.then((querySnapshot) => {

			querySnapshot.forEach((doc) => {


				categoria = doc.data();

				$("#listacategorias").append(" <option value='" + categoria.id_categoria + "'>" + categoria.nombre + "</option>")



			});
		});
			
}

function cargaredades() {
	// db.collection("tests").get().then((querySnapshot) => {

	let edad = "";
	$("#listaedades").empty();
	$("#listaedades").select('refresh');
	$("#listaedades").append("<option value='--'  selected >Seleccione una edad...</option>");

	db.collection("edades").get()
		.then((querySnapshot) => {

			querySnapshot.forEach((doc) => {


				edad = doc.data();

				$("#listaedades").append(" <option value='" + edad.id_edad + "'>" + edad.nombre + "</option>")



			});
		});

}
