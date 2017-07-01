//var tipoDiAmbiente = 'locale';
var tipoDiAmbiente = 'prod';

if (tipoDiAmbiente == 'locale') {
    var urlImmagini = '';
    var urlTornei = 'WS_AppSummertour.asmx/GetElencoTornei';
    var urlDettTorneo = 'WS_AppSummertour.asmx/GetDettaglioTorneo';
    var urlDettCategorie = 'WS_AppSummertour.asmx/GetDettaglioCategoria';
    var urlElencoSquadre = 'WS_AppSummertour.asmx/GetElencoSquadre';
    var urlElencoGiocatori = 'WS_AppSummertour.asmx/GetGiocatoriByIdSquadra';
    var urlDatiInserimentoGiocatoreInSquadra = 'WS_AppSummertour.asmx/GetDatiInserimentoGiocatoreInSquadra';
    var urlgetAnagraficaGiocatore = 'WS_AppSummertour.asmx/GetAnagraficaGiocatore';
    var urlSalvaGiocatoreInSquadra = 'WS_AppSummertour.asmx/SalvaGiocatoreInSquadra';
    var urlElencoTipiCampionato = 'WS_AppSummertour.asmx/GetElencoCampionati';
    var urlSalvaSquadra = 'WS_AppSummertour.asmx/SalvaSquadra';
    var urlSalvaAnagraficaNew = 'WS_AppSummertour.asmx/SalvaAnagraficaNew';
    var urlSalvaCurriculum = 'WS_AppSummertour.asmx/SalvaCurriculum';
    var urlVerificaGiocatoreGiaIscritto = 'WS_AppSummertour.asmx/VerificaGiocatoreGiaIscritto';
}

if (tipoDiAmbiente == 'prod') {
    var urlImmagini = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/';
    var urlTornei = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetElencoTornei';
    var urlDettTorneo = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetDettaglioTorneo';
    var urlDettCategorie = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetDettaglioCategoria';
    var urlElencoSquadre = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetElencoSquadre';
    var urlElencoGiocatori = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetGiocatoriByIdSquadra';
    var urlDatiInserimentoGiocatoreInSquadra = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetDatiInserimentoGiocatoreInSquadra';
    var urlgetAnagraficaGiocatore = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetAnagraficaGiocatore';
    var urlSalvaGiocatoreInSquadra = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/SalvaGiocatoreInSquadra';
    var urlElencoTipiCampionato = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/GetElencoCampionati';
    var urlSalvaSquadra = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/SalvaSquadra';
    var urlSalvaAnagraficaNew = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/SalvaAnagraficaNew';
    var urlSalvaCurriculum = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/SalvaCurriculum';
    var urlVerificaGiocatoreGiaIscritto = 'http://www.giacomorabaglia.com/appIscrizioneSummertour/WS_AppSummertour.asmx/VerificaGiocatoreGiaIscritto';
}