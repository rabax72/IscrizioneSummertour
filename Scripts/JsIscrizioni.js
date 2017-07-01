$(function () {
    
    //var cfGiocatore = $("#cfGiocatore").val();

    $("#cfGiocatore").keyup(function () {
        if ($("#cfGiocatore").val().length == 16) {
            $("#chekCFAddPlayerInTeam").click();            
        } 
    });
    
    $("#chekCFAddPlayerInTeam").click(function () {

        var cf = $("#cfGiocatore").val();
        var idSquadra = $('#idSquadraIscrizione').val();
        var giocatori = $('#giocatoriNellaSquadra_' + idSquadra).val();
        if (giocatori.indexOf(cf) == -1) {
            getAnagraficaGiocatore(cf);
        } else {
            $('#messaggioCF').html('Questo giocatore è già presente in questa squadra!');
        }
        
        //console.log('cfGiocatore=' + cf );
    });

    $("#cfGiocatoreSquadra").keyup(function () {
        if ($("#cfGiocatoreSquadra").val().length == 16) {
            $("#chekCFAddNewTeam").click();
        }
    });

    $("#chekCFAddNewTeam").click(function () {

        var idTorneo = $("#idTorneoSquadra").val();
        var idCategoria = $("#idCategoriaSquadra").val();
        var CF = $("#cfGiocatoreSquadra").val();
        var nomeSquadra = $('#nomeNuovaSquadra').val();

        if (nomeSquadra.length == 0) {
            $("#messaggioCFsquadra").html('Inserire un Nome di Squadra!');
            return;
        }

        VerificaGiocatoreGiaIscritto(idTorneo, idCategoria, CF);
        //getAnagraficaGiocatoreSquadra(cf);

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

function VerificaGiocatoreGiaIscritto(idTorneo, idCategoria, CF) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlVerificaGiocatoreGiaIscritto,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idTorneo: idTorneo, idCategoria: idCategoria, CF: CF }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#idsquadra_').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;           

            //console.log(risultati);
            if (risultati > 0) {
                $('#messaggioCFsquadra').html('Risulti già iscritto a questo Torneo in questa categoria.');
                return;
            }
            getAnagraficaGiocatoreSquadra(CF);
        }

    })

}

function getAnagraficaGiocatoreSquadra(CF) {
    //$("#footerRisultati").loader({ html: "<span class='ui-icon ui-icon-loading'><img src='jquery-logo.png' /><h2>is loading for you ...</h2></span>" });
    var risultati;
    var inAttesa = $('#SquadraInAttesa').val();
    $("#messaggioCFsquadra").html('');
    if (CF.length != 16) {
        $("#messaggioCFsquadra").html('Codice Fiscale inserito nel formato sbagliato.');
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
        beforeSend: function () { $('#datiNuovoGiocatoreSquadra').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;

            //console.log(risultati);

            var idGiocatore = '0';
            var nomeGiocatore = '0';
            var idTorneo = $('#idTorneoSquadra').val();
            var idCategoria = $('#idCategoriaSquadra').val();
            var nomeSquadra = $('#nomeNuovaSquadra').val();

            var dettaglio = '<h3 class="ui-bar ui-bar-a ui-corner-all">Dati Anagrafici</h3>';

            for (var i = 0; i < risultati.length; i++) {

                idGiocatore = risultati[i].id;
                nomeGiocatore = risultati[i].Nome + ' ' + risultati[i].Cognome;

                dettaglio = dettaglio + '<table>' +
                                        '<tbody>' +
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
                                        '<td><select id="ultimoCampionatoSquadra">' +
                                        '<option></option>' +
                                        '</select></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Email</td>' +
                                        '<td><input type="text" id="emailGiocatore" data-clear-btn="true" value="' + risultati[i].Email + '" /></td>' +
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
                                        '<a href="http:////www.giacomorabaglia.com/iscrizionesummertour/adminarea/EstraiCM.aspx?nomeF=' + risultati[i].nomeFileCertificato + '" data-transition="fade" target="_blank">' +
                                        '<i class="fa fa-file-text-o" aria-hidden="true"></i>' +
                                        '</a>' +                                        
                                        '</td>' +
                                        '</tr>' +
                                        '</tbody>' +
                                        '</table>' +
                                        '<div><a href="javascript:AggiungiSquadra(' + idTorneo + ', ' + idCategoria + ', \'' + nomeSquadra + '\', \'' + inAttesa + '\');" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Completa la Registrazione</a></div>' +
                            '';
            }

            if (risultati.length == 0) {
                
                dettaglio = dettaglio + '<table>' +
                                        '<tbody>' +
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
                                        '<td><select id="ultimoCampionatoSquadra">' +
                                        '<option></option>' +
                                        '</select></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>Email</td>' +
                                        '<td><input type="text" id="emailGiocatore" data-clear-btn="true" value="" /></td>' +
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
                                        '<div><a href="javascript:AggiungiSquadra(' + idTorneo + ', ' + idCategoria + ', \'' + nomeSquadra + '\', \'' + inAttesa + '\'));" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Completa la Registrazione</a></div>' +
                            '';
            }

            $('#idGiocatoreSquadra').val(idGiocatore);

            $('#datiNuovoGiocatoreSquadra').html(dettaglio);

            GetElencoCampionati('ultimoCampionatoSquadra');

        }

    })
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
            //var idCampionato = $('#idTorneoIscrizione').val();
            
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
                                        '<td><input type="text" id="emailGiocatore" data-clear-btn="true" value="' + risultati[i].Email + '" /></td>' +
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
                                        '<a href="http:////www.giacomorabaglia.com/iscrizionesummertour/adminarea/EstraiCM.aspx?nomeF=' + risultati[i].nomeFileCertificato + '" data-transition="fade" target="_blank">' +
                                        '<i class="fa fa-file-text-o" aria-hidden="true"></i>' +
                                        '</a>' +
                                        '</td>' +
                                        '</tr>' +
                                        '</tbody>' +
                                        '</table>' +
                                        '<div><a href="javascript:AggiungiGiocatoreAllaSquadra(' + idSquadra + ', ' + idGiocatore + ');" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Completa la Registrazione</a></div>' +
                            '';
            }

            if (risultati.length == 0) {
                idGiocatore = '0';
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
                                        '<td><input type="text" id="emailGiocatore" data-clear-btn="true" value="" /></td>' +
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
                                        '<div><a href="javascript:AggiungiGiocatoreAllaSquadra(' + idSquadra + ', ' + idGiocatore + ');" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Completa la Registrazione</a></div>' +
                            '';
            }
            
            $('#idGiocatoreSquadra').val($(idGiocatore));

            $('#datiNuovoGiocatore').html($(dettaglio));
           
            GetElencoCampionati('ultimoCampionato');
                      
        }

    })
}

function GetElencoCampionati(nomeSelect) {

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
        beforeSend: function () { $('#' + nomeSelect).html(''); $.mobile.loading('show'); }, //Show spinner
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

            $("#" + nomeSelect).html(dettaglio);
        }

    })

}

function AggiungiSquadra(idTorneo, idCategoria, nomeSquadra) {
    var idCampionato = $("#ultimoCampionatoSquadra").val();
    var inAttesa = $('#SquadraInAttesa').val();
    //var dataScad = $("#dataScadenzaCertifcatoSquadra").val();
    //console.log(dataScad);

    //salvo la Squadra
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlSalvaSquadra,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idTorneo: idTorneo, idCategoria: idCategoria, nomeSquadra: nomeSquadra, inAttesa: inAttesa }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#elencoTornei').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            idSquadra = response.d;
            //corsiGlobal = response.d;           
            var dettaglio = '';
            //console.log(risultati);

            //aggiungo il CF in memoria per i prossimi accessi
            var profili = localStorage.CF;
            var cfCorrente = $('#cfGiocatoreSquadra').val().toUpperCase();
            if (profili == null) {
                localStorage.CF = cfCorrente;
            } else {
                //console.log(profili.indexOf(cfCorrente));
                if (profili.indexOf(cfCorrente) == -1) {
                    localStorage.CF = localStorage.CF + '_' + cfCorrente;
                }
            }

            salvaCurriculum(idSquadra);
                        
        }

    })

}

function salvaCurriculum(idSquadra) {
    var idGiocatore = $('#idGiocatoreSquadra').val();
    var nome = $('#nomeGiocatore').val();
    var cognome = $('#cognomeGiocatore').val();
    var CF = $('#cfGiocatoreSquadra').val();
    var email = $('#emailGiocatore').val();
    var telefono = $('#telefonoGiocatore').val();

    var idTorneo = $('#idTorneoSquadra').val();
    var idCategoria = $('#idCategoriaSquadra').val();
    var nomeSquadra = $('#nomeNuovaSquadra').val();

    if (idGiocatore == 0) {
        //Inserisco una nuova Anagrafica        
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
            //        url: "Ws_AppElezioni.asmx/GetVotanti",
            url: urlSalvaAnagraficaNew,
            cache: false,
            //jsonpCallback: 'risposta',
            // jsonp: 'callback',
            // dataType: "jsonp",            
            async: true,
            //            data: "idDisciplina=" + idDisciplina,
            data: JSON.stringify({ nome: nome, cognome: cognome, CF: CF, email: email, telefono: telefono }),
            //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
            error: function (data) {
                console.log(data.responseText)
            },
            beforeSend: function () { $('#elencoTornei').html(''); $.mobile.loading('show'); }, //Show spinner
            complete: function () { $.mobile.loading('hide'); }, //Hide spinner
            success: function (response) {
                idGiocatoreNew = response.d;
                //corsiGlobal = response.d;           
                var dettaglio = '';
                //console.log(risultati);
                $('#idGiocatoreSquadra').val(idGiocatoreNew);
                salvaCurriculum(idSquadra);
            }

        })

    } else {
        //Inserisco il Curriculum e il referente
        var idAnagrafica = $('#idGiocatoreSquadra').val();
        var idCampionato = $('#ultimoCampionatoSquadra').val();
        $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/json; charset=utf-8",
            //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
            //        url: "Ws_AppElezioni.asmx/GetVotanti",
            url: urlSalvaCurriculum,
            cache: false,
            //jsonpCallback: 'risposta',
            // jsonp: 'callback',
            // dataType: "jsonp",            
            async: true,
            //            data: "idDisciplina=" + idDisciplina,
            data: JSON.stringify({ idSquadra: idSquadra, idAnagrafica: idAnagrafica, idCampionato: idCampionato, idTorneo: idTorneo, idCategoria: idCategoria, nomeSquadra: nomeSquadra, nome: nome, cognome: cognome, telefono: telefono, email: email }),
            //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
            error: function (data) {
                console.log(data.responseText)
            },
            beforeSend: function () { $('#elencoTornei').html(''); $.mobile.loading('show'); }, //Show spinner
            complete: function () { $.mobile.loading('hide'); }, //Hide spinner
            success: function (response) {
                idSquadra = response.d;
                //corsiGlobal = response.d;           
                var dettaglio = '';
                //console.log(risultati);

                $.mobile.changePage("#ConfermaIscrizione", { transition: "slideup", changeHash: false });

            }

        })
    }

    
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
            var profili = localStorage.CF;
            var cfCorrente = $('#cfGiocatore').val().toUpperCase();
            if (profili == null) {
                localStorage.CF = cfCorrente;
            } else {
                //console.log(profili.indexOf(cfCorrente));
                if (profili.indexOf(cfCorrente) == -1) {
                    localStorage.CF = localStorage.CF + '_' + cfCorrente;
                }
            }
            
            $.mobile.changePage("#ConfermaIscrizione", { transition: "slideup", changeHash: false });

            //GetDettaglioTorneo(idTorneo);

        }

    })

}

function formNewTeam(idTorneo, idCategoria) {

    $.mobile.changePage("#IscrizioneNuovaSquadra", { transition: "slideup", changeHash: false });
    $('#idTorneoSquadra').val(idTorneo);
    $('#idCategoriaSquadra').val(idCategoria);
    
    caricaProfili();
}

function caricaProfili() {

    //carico i Profili
    $('#profiloCapoSquadra').html('<option value="">< crea un nuovo profilo ></option>');
    if (localStorage.CF != null) {
        if (localStorage.CF.length > 0 && localStorage.CF.length == 16) {

            $('#cfGiocatoreSquadra').val(localStorage.CF);

            $('#profiloCapoSquadra').append('<option value="' + localStorage.CF.toUpperCase() + '" selected>' + localStorage.CF.toUpperCase() + '</option>');
        }
        if (localStorage.CF.length > 16) {

            var cf = localStorage.CF.split("_");
            var ultimo = '';
            for (var i = 0; i < cf.length; i++) {
                $('#cfGiocatoreSquadra').val(cf[i]);
                if (i == cf.length - 1) {
                    ultimo = 'selected';
                }
                $('#profiloCapoSquadra').append('<option value="' + cf[i].toUpperCase() + '" ' + ultimo + '>' + cf[i].toUpperCase() + '</option>');
            }
            //getAnagraficaGiocatore(localStorage.CF)
        }
    }
    $('#profiloCapoSquadra').selectmenu('refresh');

    $('#nomeNuovaSquadra').html('');

}

function isoDate(dataInput) {

    var parts = dataInput.split('/');

    var dmyDate = parts[2] + '-' + parts[1] + '-' + parts[0];

    return dmyDate;
}

