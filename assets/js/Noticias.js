function efetuarFiltroPorAno() {
    window.location = "Noticias.aspx?idCanal=" + getIdCanal() + "&ano=" + $('select[id$=ddlAnoFiltro] option:selected').val();
}

function limpaFiltroPorAno() {
    window.location = "Noticias.aspx?idCanal=" + getIdCanal();
}

function getIdCanal() {
    var strReturn = "";
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}

$(document).ready(function () {
    $('a[id*=linkListaTituloChamada]').each(function () {

        var data = $(this).parents('.divNoticias').find('.dataNoticias').text();

        var textoLink = $(this).text();
        $(this).html('<h6 class="font-montserrat font-weight-normal">' + textoLink + '</h6><span class="icomoon-calendar font-montserrat font-weight-light lay-color-dark-green"></span>' + data);

       
    });

    $('.dataNoticias').remove();

    var combo = $('div[id*=ddlAnoLink]');
    $('div[class*= recebeCombo]').append(combo);
});

