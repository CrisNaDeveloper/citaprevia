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

if(url=="SEPE" && operacion=="alta"){
	document.location="https://sede--sepe--gob--es.insuit.net/citaprevia/solicitudCitaPrevia.do";
	
}
if(url=="POLICIA"){
	document.location="https://www.citapreviadnie.es/citaPreviaDniExp/InicioDNINIE.action";
}
if(url=="SANITARIA_MADRID"){
	document.location="https://www.citaprevia.sanidadmadrid.org/Forms/Acceso.aspx";
}
if(url=="INSS"){
document.location="https://w6.seg-social.es/ProsaInternetAnonimo/OnlineAccess;jsessionid=0001hrG4gb7nKUtqebZ47vGx50O:18jahh768?ARQ.SPM.TICKET=f51408fbd86c4483bafaac99e32f6595&SPM.CONTEXT=internet&ARQ.SPM.TMS_NAVEGACION=1602491938811";
}
if(url=="AYUNTAMIENTO_MADRID"){
document.location="https://www-s.munimadrid.es/CitaNet/Concertar.do";
}
if(url=="AGENCIA_TRIBUTARIA"){
document.location="https://www2.agenciatributaria.gob.es/wlpl/TOCP-MUTE/Identificacion";
}
