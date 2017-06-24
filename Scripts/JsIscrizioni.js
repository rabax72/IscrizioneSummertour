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
       
});

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
            var dettaglio = '<h3 class="ui-bar ui-bar-a ui-corner-all">Dati Anagrafici</h3>' +
                            '<table>';
                           
            for (var i = 0; i < risultati.length; i++) {
               
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
                                        '<td><a href="http:////www.giacomorabaglia.com/iscrizionesummertour/adminarea/EstraiCM.aspx?nomeF=' + risultati[i].nomeFileCertificato + '"><i class="fa fa-file-text-o" aria-hidden="true"></i></a></td>' +
                                        '</tr>' +
                                        '</tbody>' +
                                        '</table>' +
                                        '<div><a href="javascript:AggiungiGiocatoreAllaSquadra();" class="ui-shadow ui-btn ui-corner-all ui-btn-inline" id="salvaAddPlayerInTeam">Salva</a></div>' +
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
           
            //$('#elencoTornei').html(dettaglio);
            //$('#tabellaRisultatiResidenti').DataTable();

        }

    })
}

function AggiungiGiocatoreAllaSquadra() {
    var dataScad = $("#dataScadenzaCertifcatoGiocatore").val();
    console.log(dataScad);
}

function isoDate(dataInput) {

    var parts = dataInput.split('/');

    var dmyDate = parts[2] + '-' + parts[1] + '-' + parts[0];

    return dmyDate;
}

