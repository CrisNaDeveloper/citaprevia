function parametroURL(_par) {

	var _p = null;
	if (location.search) location.search.substr(1).split("&").forEach(function (pllv) {
		var s = pllv.split("="), //separamos llave/valor
			ll = s[0],
			v = s[1] && decodeURIComponent(s[1]); //valor hacemos encode para prevenir url encode
		if (ll == _par) { //solo nos interesa si es el nombre del parametro a buscar
			if (_p == null) {
				_p = v; //si es nula, quiere decir que no tiene valor, solo textual
			} else if (Array.isArray(_p)) {
				_p.push(v); //si ya es arreglo, agregamos este valor
			} else {
				_p = [_p, v]; //si no es arreglo, lo convertimos y agregamos este valor
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


window.onload = function () {






}

if (!firebase.apps.length) {
	firebase.initializeApp(config);
	autenticar();

}

var provider = "";



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

	//$("#fecha").append(" " + fechayhora);



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


function autenticar() {
	email = "aforo@prueba.com";
	var autor = firebase.auth();
	var password = "aforo2020";

	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function () {

			var operacion = parametroURL('operacion');
			var cp = parametroURL('coordenadas');
			if (operacion == "alta") {

				alta();
			}


			if (operacion == "consulta") {

				alertify.success(cp);
				window.location.href = "mobincube://javascript/variblesConsulta('{var.coordenadas}','{coordenadas}','[coordenadas]')";

			}



			if (operacion == "buscar") {

				$("#municipio").show();
				$("#buscar").show();

			}


			if (operacion == "actualizo") {

				window.location.href = "mobincube://javascript/variblesActualizo('{location}','{var.coordenadas}')";

			}


		})
		.catch(function (error) {

			alertify.error(error);
		});

}
function variblesConsulta(corcon, varicon, loca) {
	setTimeout(alerto, 1000);


}




function alta() {

	db.collection("aforo").add({
		nombre: nombre,
		provincia: provincia,
		municipio: municipio,
		coordenadas: coordenadas,
		ocupacion_actual: ocupacion_actual,
		plazas: plazas,
		fecha: fechayhora
	})
		.then(function (docRef) {


			alertify.success("Se ha añadido correctamente");
			buscar_coordenadas();

		})
		.catch(function (error) {

			console.error("Error adding document: ", error);
		});

}



function borrar(coordenadas) {
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




function consulta(coo) {

	db.collection("aforo").where("coordenadas", "==", coo).get()
		.then((querySnapshot) => {

			querySnapshot.forEach((doc) => {


				datos_consult = doc.data();


				$("#nombre").val(datos_consult.nombre);
				$("#provincia").val(datos_consult.provincia);
				$("#municipio").val(datos_consult.provincia);
				$("#ocupacion_actual").val(datos_consult.ocupacion_actual);
				$("#plazas").val(datos_consult.plazas);
				$("#fecha").val(fechayhora);
				alertify.success("Datos en consulta");



			});
		});

}





function actualizar(coordenadas,aforo_total,aforo_actual) {

	db.collection('aforo').doc(coordenadas).set({
		
			aforo_actual: aforo_actual,
			aforo_total: aforo_total,
			actualizacion: fechayhora
		  }, { merge: true });
		  alertify.success("Dato actualizado");		
}



function alta(coordenadas2, aforo_total_valor2, aforo_actual_valor2,lugar2,direccion2) {

coordenadas2=coordenadas2.toString();

var coordenadas3=coordenadas2.replace('(','');
var coordenadas4=coordenadas3.replace(')','');
var coordenadas5=coordenadas4.replace(' ','');

	db.collection("aforo").doc(coordenadas5).set({
		
		aforo_actual: aforo_actual_valor2,
		aforo_total: aforo_total_valor2,
		coordenadas: coordenadas5,
		nombre: lugar2,
		direccion: direccion2,
		actualizacion: fechayhora
		
	})
		.then(function (docRef) {


			alertify.success("Añadido");		

		})
		.catch(function (error) {

			console.error("Error al añadir: ", error);
		});

}


//CARGA DE DATOS DE JSON
/*
const collectionKey = "aforo";
if (data && (typeof data === "object")) {
var coleccion = db.collection(collectionKey);
for(var elemento in data[0]){
coleccion.doc(elemento).set(data[0][elemento]);

}
}
*/
