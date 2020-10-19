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

var url = parametroURL('url');

function recarga(){

if(url=="SEPE"){
	foo.src="https://sede.sepe.gob.es/citaprevia/solicitudCitaPrevia.do";
	
}
if(url=="POLICIA"){
	foo.src="https://www.citapreviadnie.es/citaPreviaDniExp/InicioDNINIE.action";
}
if(url=="SANITARIA_MADRID"){

	foo.src="https://www.citaprevia.sanidadmadrid.org/Forms/Acceso.aspx";
}
if(url=="INSS"){
	foo.src="https://w6.seg-social.es/ProsaInternetAnonimo/OnlineAccess?ARQ.SPM.ACTION=LOGIN&ARQ.SPM.APPTYPE=SERVICE&ARQ.IDAPP=XV106001&ORGANISMO=I";
}
if(url=="AYUNTAMIENTO_MADRID"){
	foo.src="https://www-s.munimadrid.es/CitaNet/Principal.do";
}
if(url=="AGENCIA_TRIBUTARIA"){
	foo.src="https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/Identificacion";
}
if(url=="JUSTICIA"){
	foo.src="https://citaprevia.mjusticia.gob.es/";
	}
if(url=="DGT"){
	foo.src="https://sedeapl.dgt.gob.es:7443/WEB_NCIT_CONSULTA/solicitarCita.faces";
}
}
