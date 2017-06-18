//var tipoDiAmbiente = 'locale';
var tipoDiAmbiente = 'prod';

if (tipoDiAmbiente == 'locale') {
    var urlImmagini = '';
    var urlTornei = 'WS_AppSummertour.asmx/GetElencoTornei';
    var urlDettTorneo = 'WS_AppSummertour.asmx/GetDettaglioTorneo';
    var urlDettCategorie = 'WS_AppSummertour.asmx/GetDettaglioCategoria';
    var urlElencoSquadre = 'WS_AppSummertour.asmx/GetElencoSquadre';
    var urlElencoGiocatori = 'WS_AppSummertour.asmx/GetGiocatoriByIdSquadra';
}


if (tipoDiAmbiente == 'prod') {
    var urlImmagini = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/';
    var urlTornei = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetElencoTornei';
    var urlDettTorneo = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetDettaglioTorneo';
    var urlDettCategorie = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetDettaglioCategoria';
    var urlElencoSquadre = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetElencoSquadre';
    var urlElencoGiocatori = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetGiocatoriByIdSquadra';
}