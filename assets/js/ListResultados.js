$(document).ready(function () {  

    $("div[id*=tdiv]").find("h4").each(function () {
        a = ($(this).text().trim());
        if (a == "") {
            $(this).parent().parent().attr("style", "display: none;");
        }
    });

    $('select[id*=ddlAnoFiltro] option').each(function () {

        var value = $(this).attr('value');
        var li = ('<li><div><a href="javascript:" onclick="efetuarFiltroPorAno(' + value +')" class="anosList" data-ano="' + value + '">' + value + '</a></div></li>');

        $('#anoSelecionadoCentral').append(li);
    });

    $('div[id*=ddlAnoLink]').remove();

    $('.anosList').first().addClass('active');

    var ano = $(".anosList").first().text();
    efetuarFiltroPorAno(ano);

   


    $('.imgCentral').each(function () {
        var titulo = $(this).text().toLowerCase();

        if (titulo.indexOf('resultados') != -1 || titulo.indexOf('results') != -1) {
            $(this).find('.icoCentral').append('<span class="icomoon-bars"></span>');
        }
        else if (titulo.indexOf('apresentação') != -1 || titulo.indexOf('presentation') != -1) {
            $(this).find('.icoCentral').append('<span class="icomoon-presentation"></span>');
        }
        else if (titulo.indexOf('itr') != -1) {
            $(this).find('.icoCentral').append('<span class="icomoon-file"></span>');
        }
        else if (titulo.indexOf('áudio') != -1 || titulo.indexOf('audio') != -1 || titulo.indexOf('podcast') != -1) {
            $(this).find('.icoCentral').append('<span class="icomoon-audio"></span>');
        }
        else if (titulo.indexOf('demonstrações') != -1 || titulo.indexOf('statements') != -1) {
            $(this).find('.icoCentral').append('<span class="icomoon-file-txt"></span>');
        }
        else if (titulo.indexOf('vídeo') != -1 || titulo.indexOf('video') != -1) {
            $(this).find('.icoCentral').append('<span class="icomoon-video"></span>');
        }
        else {
            $(this).find('.icoCentral').append('<span class="icomoon-file-txt"></span>');
        }

    });

    $('div.linkVideo').each(function () {
        if ($.trim($(this).html()) == "") {
            $(this).remove();
        }
    });


    $('.anosList').click(function () {
        $('.anosList').removeClass('active');
        $(this).addClass('active');
    });
  
});

function efetuarFiltroPorAno(ano) {
    $('div[ano]').hide();
    $('div[ano=' + ano + ']').show();
}

function limpaFiltroPorAno() {
    $('div[ano]').hide();
    $('div[ano]').show();
}