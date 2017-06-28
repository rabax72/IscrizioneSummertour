$(function () {
    
    //var cfGiocatore = $("#cfGiocatore").val();

    $("#cfGiocatore").keyup(function () {
        if ($("#cfGiocatore").val().length == 16) {
            $("#chekCFAddPlayerInTeam").click();            
        } 
    });
    
    $("#chekCFAddPlayerInTeam").click(function () {

        var cf = $("#cfGiocatore").val();
        getAnagraficaGiocatore(cf);
        //console.log('cfGiocatore=' + cf );

    });

    $('#profiloGiocatore').change(function () {

        if ($('#profiloGiocatore').val().length > 0) {
            $('#cfGiocatore').val($('#profiloGiocatore').val());
            getAnagraficaGiocatore($('#profiloGiocatore').val());            
        } else {            
            $('#cfGiocatore').val('');
            $('#datiNuovoGiocatore').html('');
            //getAnagraficaGiocatore(0);
        }
        
    });
          
});

function chiudiPop() {
    $("#popupDialog").dialog("close")
}

function getAnagraficaGiocatore(CF) {
    //$("#footerRisultati").loader({ html: "<span class='ui-icon ui-icon-loading'><img src='jquery-logo.png' /><h2>is loading for you ...</h2></span>" });
    var risultati;
    $("#messaggioCF").html('');
    if (CF.length != 16) {
        $("#messaggioCF").html('Codice Fiscale inserito nel formato sbagliato.');
        return;
    }

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlgetAnagraficaGiocatore,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ CF: CF }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#datiNuovoGiocatore').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
          
            //console.log(risultati);
            
            var idGiocatore = '0';
            var nomeGiocatore = '0';
            var idSquadra = $('#idSquadraIscrizione').val();
            var idCampionato = $('#idSquadraIscrizione').val();
            
            var dettaglio = '<h3 class="ui-bar ui-bar-a ui-corner-all">Dati Anagrafici</h3>' +
                            '<table>';

            for (var i = 0; i < risultati.length; i++) {
                
                idGiocatore = risultati[i].id;
                nomeGiocatore = risultati[i].Nome + ' ' + risultati[i].Cognome;

                dettaglio = dettaglio + '<tbody>' +
                                        '<tr>' +
                                        '<td>Nome</td>' +
                                        '<td><input type="text" id="nomeGiocatore" data-clear-btn="true" value="' + risultati[i].Nome + '" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Cognome</td>' +
                                        '<td><input type="text" id="cognomeGiocatore" data-clear-btn="true" value="' + risultati[i].Cognome + '" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Telefono</td>' +
                                        '<td><input type="text" id="telefonoGiocatore" data-clear-btn="true" value="' + risultati[i].Telefono + '" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Ultimo campionato FIPAV disputato</td>' +
                                        '<td><select id="ultimoCampionato">' +
                                        '<option></option>' +
                                        '</select></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Email</td>' +
                                        '<td><input type="text" id="emailGiocatore" data-clear-btn="true" value="' + risultati[i].Email + '" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Data Ril.</td>' +
                                        '<td><input type="date" id="dataRilascioCertifcatoGiocatore" value="' + isoDate(risultati[i].dataRilascioCertifcato.substring(0, 10)) + '" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Data Scad.</td>' +
                                        '<td><input type="date" id="dataScadenzaCertifcatoGiocatore" value="' + isoDate(risultati[i].dataScadenzaCertifcato.substring(0, 10)) + '" class="testoMaiuscolo" /> <i class="fa fa-check-circle-o" aria-hidden="true"></i></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Certificato Medico</td>' +
                                        '<td>' +
                                        '<a href="#popup' + idGiocatore + '" data-rel="popup" data-position-to="window" data-transition="fade">' +
                                        '<i class="fa fa-file-text-o" aria-hidden="true"></i>' +                                        
                                        '</a>' +
                                        '<div data-role="popup" id="popup' + idGiocatore + '" data-overlay-theme="b" data-theme="b" data-corners="false">' +
                                        '<a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right">Close</a><img class="http:////www.giacomorabaglia.com/iscrizionesummertour/adminarea/EstraiCM.aspx?nomeF=' + risultati[i].nomeFileCertificato + '" style="max-height:512px;" alt="Certificato Medico">' +
                                        '</div>' +
                                        '</td>' +
                                        '</tr>' +
                                        '</tbody>' +
                                        '</table>' +
                                        '<div><a href="javascript:AggiungiGiocatoreAllaSquadra(' + idSquadra + ', ' + idGiocatore + ');" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Completa la Registrazione</a></div>' +
                            '';
            }

            if (risultati.length == 0) {
                dettaglio = dettaglio + '<tbody>' +
                                        '<tr>' +
                                        '<td>Nome</td>' +
                                        '<td><input type="text" id="nomeGiocatore" data-clear-btn="true" value="" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Cognome</td>' +
                                        '<td><input type="text" id="cognomeGiocatore" data-clear-btn="true" value="" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Telefono</td>' +
                                        '<td><input type="text" id="telefonoGiocatore" data-clear-btn="true" value="" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Ultimo campionato FIPAV disputato</td>' +
                                        '<td><select id="ultimoCampionato">' +
                                        '<option></option>' +
                                        '</select></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Email</td>' +
                                        '<td><input type="text" id="emailGiocatore" data-clear-btn="true" value="" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Data Ril.</td>' +
                                        '<td><input type="date" id="dataRilascioCertifcatoGiocatore" value="" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Data Scad.</td>' +
                                        '<td><input type="date" id="dataScadenzaCertifcatoGiocatore" value="" class="testoMaiuscolo" /></td>' +
                                        '</tr>' +
                                        '</tbody>' +
                                        '</table>' +
                                        '<div><a href="javascript:AggiungiGiocatoreAllaSquadra();" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Salva</a></div>' +
                            '';
            }
            
            $('#datiNuovoGiocatore').html($(dettaglio));
           
            GetElencoCampionati();
                      
        }

    })
}

function GetElencoCampionati() {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",        
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlElencoTipiCampionato,
        cache: false,
        
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#ultimoCampionato').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;           
            var dettaglio = '';
            //console.log(risultati);

            for (var i = 0; i < risultati.length; i++) {
                
                dettaglio = dettaglio + '<option value="' + risultati[i].idCampionato + '">' +
                            risultati[i].Campionato +
                            '</option>';
                                                 
            }

            $("#ultimoCampionato").html(dettaglio);           
        }

    })

}

function AggiungiGiocatoreAllaSquadra(idSquadra, idGiocatore) {
    var idCampionato = $("#ultimoCampionato").val();
    var idTorneo = $("#idTorneoIscrizione").val();
    var dataScad = $("#dataScadenzaCertifcatoGiocatore").val();
    //console.log(dataScad);

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlSalvaGiocatoreInSquadra,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idSquadra: idSquadra, idGiocatore: idGiocatore, idCampionato: idCampionato }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#elencoTornei').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;           
            var dettaglio = '';
            //console.log(risultati);

            //aggiungo il CF in memoria per i prossimi accessi
            if (localStorage.CF == "") {
                localStorage.CF = $('#cfGiocatore').val();
            } else {
                localStorage.CF = localStorage.CF + '_' +$('#cfGiocatore').val();
            }
            
            $.mobile.changePage("#ConfermaIscrizione", { transition: "slideup", changeHash: false });

            //GetDettaglioTorneo(idTorneo);

        }

    })

}

function isoDate(dataInput) {

    var parts = dataInput.split('/');

    var dmyDate = parts[2] + '-' + parts[1] + '-' + parts[0];

    return dmyDate;
}

