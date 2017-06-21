$(function () {

    GetTornei();

    //$("#Votanti").click(function () {

    //    GetVotanti();

    //});

    //$(".aggiornaVotanti").click(function () {

    //    GetVotanti();

    //});

    $(".linkHome").click(function () {
        GetTornei();
    });

    $("#categorieTorneo").change(function () {        
        var idTorneo = $("#TorneoScelto").attr("idtorneo");
        var idCategoria = $("option:checked").val()
        GetDettaglioCategoria(idTorneo, idCategoria);
    });
       
});

function GetTornei() {
    //$("#footerRisultati").loader({ html: "<span class='ui-icon ui-icon-loading'><img src='jquery-logo.png' /><h2>is loading for you ...</h2></span>" });
    var risultati;
   
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
//        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlTornei,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({}),
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
            var immagineTorneo = '';
            for (var i = 0; i < risultati.length; i++) {
                if (risultati[i].TipoTorneo == 'green') {
                    immagineTorneo = 'themes/images/green-volley-64.png';
                } else {
                    immagineTorneo = 'themes/images/volleyball_64.png';
                }
                    dettaglio = dettaglio + '<li>' +
                                    '<a href="javascript:GetDettaglioTorneo(' + risultati[i].idTorneo + ')" class="dettTorneo" idtorneo="' + risultati[i].idTorneo + '">' +
                                    '<img src="' + immagineTorneo + '" alt="' + risultati[i].Nometorneo + '" />' +
                                    '<h2>' + risultati[i].Nometorneo + '</h2>' +
                                    '<p>' + risultati[i].Inizio + ' - ' + risultati[i].Luogo + '</p>' +
                                    '</a>' +
                                   
                                '</li>';                                
            }

            $('#elencoTornei').empty();
            $('#elencoTornei').append($(dettaglio));
            $('#elencoTornei').trigger('create');
            $('#elencoTornei').listview('refresh');
            $('#elencoTornei ul').listview('refresh');
            //$('#elencoTornei').html(dettaglio);
            //$('#tabellaRisultatiResidenti').DataTable();

        }

    })
}

function GetDettaglioTorneo(idTorneo) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlDettTorneo,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idTorneo: idTorneo }),
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

            for (var i = 0; i < risultati.length; i++) {
                $('#TorneoScelto').html(risultati[i].Nometorneo);
                $('#TorneoScelto').attr("idtorneo", idTorneo);
                var descCategoria = '';
                var descPagamento = '';
                for (var z = 0; z < risultati[i].Categorie.length; z++) {
                    dettaglio = dettaglio + '<option value="' + risultati[i].Categorie[z].idCategoria + '">' +
                                risultati[i].Categorie[z].Categoria +
                                '</option>';
                    descCategoria = risultati[i].Categorie[0].DescCategoria;
                    descPagamento = risultati[i].Categorie[0].DescPagamento;
                }

                GetDettaglioCategoria(idTorneo, risultati[i].Categorie[0].idCategoria);
            }

            $("#categorieTorneo").html(dettaglio);
            $("#DescCategoriaTorneo").html(descCategoria);
            $("#DescPagamentoCategoria").html(descPagamento);
            
            $.mobile.changePage("#dettTorneo", { transition: "slideup", changeHash: false });
            //$('#elencoTornei').empty();
            //$('#elencoTornei').append($(dettaglio));
            //$('#elencoTornei').trigger('create');
            //$('#elencoTornei').listview('refresh');
            //$('#elencoTornei ul').listview('refresh');
            //$('#elencoTornei').html(dettaglio);
            //$('#tabellaRisultatiResidenti').DataTable();

        }

    })

}

function GetDettaglioCategoria(idTorneo, idCategoria) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlDettCategorie,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idTorneo: idTorneo, idCategoria: idCategoria }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#DescCategoriaTorneo').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;           
            var dettaglio = '';
            //console.log(risultati);

            var descCategoria = '';
            var descPagamento = '';
            var squadreIscritte = '';
            for (var i = 0; i < risultati.length; i++) {
                $('#TorneoScelto').html(risultati[i].Nometorneo);
                
                descCategoria = risultati[i].DescCategoria;
                descPagamento = risultati[i].DescPagamento;
                squadreIscritte = risultati[i].NumeroSquadreIscritte;
            }
        
            $("#DescCategoriaTorneo").html(descCategoria);
            $("#DescPagamentoCategoria").html(descPagamento);
            $(".squadreIscritte").html(squadreIscritte);
        }

    })

    // Elenco Squadre iscritte in una data Categoria
    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlElencoSquadre,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idTorneo: idTorneo, idCategoria: idCategoria }),
        //data: { NomeOrdinanza: NomeOrdinanza, DataPubbDa: DataPubbDa, DataPubbA: DataPubbA, DataScadDa: DataScadDa, DataScadA: DataScadA },
        error: function (data) {
            console.log(data.responseText)
        },
        beforeSend: function () { $('#ElencoSquadreIscritte').html(''); $.mobile.loading('show'); }, //Show spinner
        complete: function () { $.mobile.loading('hide'); }, //Hide spinner
        success: function (response) {
            risultati = response.d;
            //corsiGlobal = response.d;           
            var dettaglio = '';
            //console.log(risultati);
            var idSquadre = [];
            var elencoSquadre = '';
            for (var i = 0; i < risultati.length; i++) {
                elencoSquadre = elencoSquadre + '<div data-role="collapsible">';
                elencoSquadre = elencoSquadre + '<h2>' + risultati[i].NomeSquadra + '</h2>';
                elencoSquadre = elencoSquadre + '<ul data-role="listview" data-inset="true" data-shadow="false">';
                elencoSquadre = elencoSquadre +'<li data-iconpos="right" data-inset="false">';
                
                elencoSquadre = elencoSquadre + '<ul data-role="listview" id="idsquadra_' + risultati[i].idSquadra + '">';
                //elencoSquadre = elencoSquadre + '<li>Giocatore 1</li>';
                elencoSquadre = elencoSquadre + '</ul>';
                elencoSquadre = elencoSquadre + '</li>';
                elencoSquadre = elencoSquadre + '</ul>';
                elencoSquadre = elencoSquadre + '</div>';
                //GetGiocatoriByIdSquadra(risultati[i].idSquadra);
                var idSquadra = risultati[i].idSquadra;
                idSquadre.push(idSquadra);

                GetGiocatoriByIdSquadra(idSquadra);
            }
            
            var squadreId = idSquadre.join();
            //GetGiocatoriByIdSquadra(squadreId);

            //$("#ElencoSquadreIscritte").html(elencoSquadre);
            $('#ElencoSquadreIscritte').empty();
            $('#ElencoSquadreIscritte').append($(elencoSquadre));
            $('#ElencoSquadreIscritte').trigger('create');
            //$('#ElencoSquadreIscritte').listview('refresh');
            //$('#ElencoSquadreIscritte ul').listview('refresh');
            //$('#ElencoSquadreIscritte').html(elencoSquadre);

            if ($('#ElencoSquadreIscritte').hasClass('ui-listview')) {
                $('#ElencoSquadreIscritte').listview('refresh');
                $('#ElencoSquadreIscritte ul').listview('refresh');
            }
            else {
                $('#ElencoSquadreIscritte').trigger('create');
            }
            //$('#ElencoSquadreIscritte').html(elencoSquadre);
        }

    })

}

function GetGiocatoriByIdSquadra(idSquadra) {

    $.ajax({
        type: "POST",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        //url: "https://webservices.comune.parma.it/APPPM/WS_ACI/GetAci",
        //        url: "Ws_AppElezioni.asmx/GetVotanti",
        url: urlElencoGiocatori,
        cache: false,
        //jsonpCallback: 'risposta',
        // jsonp: 'callback',
        // dataType: "jsonp",            
        async: true,
        //            data: "idDisciplina=" + idDisciplina,
        data: JSON.stringify({ idSquadra: idSquadra }),
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
            var giocatori = '<table>';
            var tipoCertificato = '';
            for (var i = 0; i < risultati.length; i++) {
                if (risultati[i].certificatoPresente == 'themes/images/certificato_assente.png') {
                    tipoCertificato = 'Certificato non caricato o non in regola!';
                } else {
                    tipoCertificato = 'Certificato in regola!';
                }

                var referente = '';
                if (risultati[i].pathImgReferente != '') {
                    referente = '<img src="' + risultati[i].pathImgReferente + '" alt="Referente della Squadra" title="Referente della Squadra" />';
                }

                giocatori = giocatori + '<tr>' +
                                        '<td>' + risultati[i].Cognome.toUpperCase() + ' ' + risultati[i].Nome.toUpperCase() + '</td>' +
                                        '<td><img src="' + risultati[i].certificatoPresente + '" alt="' + tipoCertificato + '" title="' + tipoCertificato + '" /></td>' +
                                        '<td>' + referente + '</td>' +
                                        '</tr>';                
            }
            giocatori = giocatori + '</table>';

            $('#idsquadra_' + idSquadra).html(giocatori);

        }

    })

}