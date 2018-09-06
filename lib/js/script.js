var url_base = "http://appservice20170616125148.azurewebsites.net/api/"
/*Transcripciones();
Reportes();
Recomendaciones();
Fotos();
Estadisticas();*/

function Transcripciones() {

    //Start the connection with signalR hub
    $.connection.hub.start()
        .done( function () {
            console.log("Successful connection")
        });
    //The generated client-side hub proxy
    var transcriptHub = $.connection.transcriptHub;

    //Client side method that the server will call
    transcriptHub.client.update = function (text) {
        var textArea = $("#transcript-area");
        textArea.append(text + "\n");
        textArea.scrollTop(textArea[0].scrollHeight);
    }    



    //var id = -1;
    //myTimer();
    //var myVar = setInterval(myTimer, 10000);

    //function myTimer() {
    //    var ulTranscripcion = $('#transcripciones')

    //    $.ajax({
    //        type: "GET",
    //        url: url_base + "Transcripcion",
    //        dataType: "json",
    //        success: function (data) {
    //            if (id != data.Id) {
    //                var htmlData = "<p>";
    //                htmlData += data.Texto
    //                htmlData += "</p>";
    //                ulTranscripcion.append(htmlData);
    //                id = data.Id;
    //            }
    //        }
    //    });

    //    var objDiv = document.getElementById("transcripciones");
    //    objDiv.scrollTop = objDiv.scrollHeight;
    //}
}

function Reportes() {
    var id2 = -1;
    myTimer2();
    var myVar = setInterval(myTimer2, 5000);

    function myTimer2() {
        var ulTranscripcion = $('#reportes')

        $.ajax({
            type: "GET",
            url: url_base + "REPORTE",
            dataType: "json",
            success: function (data) {
                if (id2 != data.Id) {
                    var htmlData = "<p>";
                    htmlData += data.Fecha + ": ";
                    htmlData += data.Reporte1;
                    htmlData += "</p>";
                    ulTranscripcion.append(htmlData);
                    id2 = data.Id;
                }
            }
        });

        var objDiv = document.getElementById("reportes");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}
function Recomendaciones()
{
    var id3 = -1;
    myTimer3();
    var myVar = setInterval(myTimer3, 10000);

    function myTimer3() {
        var ulTranscripcion = $('#bing')

        $.ajax({
            type: "GET",
            url: url_base + "Recomendaciones",
            dataType: "json",
            success: function (data) {
                if (id3 != data.Id) {
                    var htmlData = "<p>";
                    htmlData += "<a target='_blank' href='https://" + data.Link + "' >";
                    htmlData += data.Tema;
                    htmlData += "</a>"
                    htmlData += "</p>";
                    ulTranscripcion.append(htmlData);
                    id3 = data.Id;
                }
            }
        });

        var objDiv = document.getElementById("bing");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}
function Fotos()
{
    var ulResultados = $("#fotografias");
    var ulRostros = $("#rostros");
    $.ajax({
        type: "GET",
        url: url_base + "WebResults/8",
        dataType: "json",
        success: function (data) {
            ulResultados.empty();
            $.each(data, function (index, val) {
                var user = val.Usuario;
                var rostros = val.Rostros;
                var htmlData = "<div class='col l3 m6 s12' id='image" + index + "'>";
                htmlData += "<div class='card'>";
                  htmlData += "<div class='card-image waves-effect waves-block waves-light'>";
                    htmlData += "<img class='activator' src='data:image/jpg;base64," + val.Foto + "'/>";
                  htmlData += "</div>";
                  htmlData += "<div class='card-content'>";
                    htmlData += "<span class='card-title activator grey-text text-darken-4'>Usuario:<i class='material-icons right'>more_vert</i></span>";
                    htmlData += "<p><a>" + user + "</a></p>";
                  htmlData += "</div>";
                  htmlData += "<div class='card-reveal'>";
                    htmlData += "<span class='card-title grey-text text-darken-4'>Rostros<i class='material-icons right'>close</i></span>";
                    $.each(rostros, function (index, ros) {
                        htmlData += "<p>Rostro " + (index + 1) + ":</p>";
                        htmlData += "<p>Emoción: " + ros.Emoción + "</p>";
                        htmlData += "<p>Género: " + ros.Genero + "</p>";
                        htmlData += "<p>Edad: " + ros.Edad + "</p>";
                        htmlData += "<hr>";
                    });
                  htmlData += "</div>";
                htmlData += "</div>";
                ulResultados.append(htmlData);
            });
        }
    });
}

function Estadisticas()
{
    $.ajax({
        type: "GET",
        url: url_base + "WebResults",
        dataType: "json",
        success: function (data) {
            var ctxGenero = document.getElementById("chartGenero");
            var myChart = new Chart(ctxGenero, {
                type: 'doughnut',
                data: {
                    labels: ["Masculino", "Femenino"],
                    datasets: [{
                        label: '# de personas',
                        data: [data.Masculino, data.Femenino],
                        backgroundColor:
                        [
                            'rgba(0,166,255,1)',
                            'rgba(255,0,132,1)'
                        ],
                        borderColor:
                        [
                            'rgba(0,166,255,1)',
                            'rgba(255,0,132,1)'

                        ],
                        borderWidth: 1
                    }]
                }
            });

            var ctxAnimo = document.getElementById("chartAnimo");
            var myChart = new Chart(ctxAnimo, {
                type: 'bar',
                data: {
                    labels: data.Emociones,
                    datasets: [{
                        label: '# de personas',
                        data: data.EmocionesCant,
                        backgroundColor:
                        'rgba(214, 0, 0, 0.6)',
                        borderColor:
                        'rgba(214, 0, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });

            var ctxAnimo = document.getElementById("chartEdad");
            var myChart = new Chart(ctxAnimo, {
                type: 'line',
                data: {
                    labels: data.Edades,
                    datasets: [{
                        label: '# de personas',
                        data: data.EdadesCantidad,
                        backgroundColor:
                        'rgba(214, 0, 0, 0.6)',
                        borderColor:
                        'rgba(214, 0, 0, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    });
}
