$( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!

    $.mobile.allowCrossDomainPages = true;
});
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
var id_test = "";
var nombre = ""
var preg = "";
var res = "";
var numpreguntas = 1;

var numpregcuestion = 1;
var numpregtotaltest = 0;
var aciertos = 0;
var respanterior = "";
var acertada = 0;
var numrespaprobar = 0;
var emailadministrador = "c_navarro_martinez@hotmail.com"
var valorpremio = "";
var textoPremio=""

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

function alta() {

							db.collection("aforo").add({
							nombre:"El Carpio",
							provincia: "Ávila",
							municipio: "Cardeñosa",
							coordenadas: "",
							ocupacion_actual:"2",
							plazas:"",
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
