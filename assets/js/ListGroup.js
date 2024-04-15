

function efetuarFiltroPorAno(ano) {

    var idCanal = $('input[id*=hdCanal]').val();
    var linguagem = $('input[class*=hidLinguagem]').val();

    $('div[class*=recebeAno]').text(ano);
    $('input[id*=currentAno]').val(ano);


    $('div[class*=owl-carousel]').attr('style', 'display:none;');
    $('#anoSelecionadoList').attr('style', 'display:none;');
    //$('div[id*=totalContent]').attr('style', 'display:none;');
    $('div[class*=loader]').attr('style', 'display:block;');

    PageMethods.RefreshContent(ano, idCanal, linguagem, onSuccess, onError);
}

function onSuccess(result) {
    //alert(result);
    $('div.divGlobal').empty();


    var i;
    var c;
    var text = "";
    var conteudos = "";
    for (i = 0; i < result.length; i++) {
        if (!(typeof result[i].Titulo === "undefined")) {

            var corpoHtmlBase = '<div class="item divItem"> <div class="w-100 py-4 rounded-bottom"> <div class="row justify-content-center my-sm-5 my-2"> <div class="col-md-9 col-11 mb-2 divEnvolveTitulo"> <div class="col-md-9 col-11 mb-2 divTitulo "> <h3 class="font-montserrat font-weight-light access-light-color">#TituloCanal </h3> </div> <div class="col-md-9 col-11 mb-4 divArquivos">#RecebeConteudos </div> </div> </div> </div>'
            corpoHtmlBase = corpoHtmlBase.replaceAll('#TituloCanal', result[i].Titulo);
            var corpoConteudos = "";

            if ($(".hidLinguagem").val() == "ptg") {
                for (c = 0; c < result[i].Materia.length; c++) {
                    if (!(typeof result[i].Materia[c].Titulo === "undefined")) {
                        corpoConteudos = '<div class="divRemove"><a id="ajusteData" href="#trocaLink" class="lay-bg-hover-gray transition-01 d-flex justify-content-start text-decoration-none rounded mb-2"><div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div>#Dia</div><div class="small mesAgenda">#Mes</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">#trocaTitulo</p></div></a> </div> ';
                        corpoConteudos = corpoConteudos.replaceAll('#Dia', result[i].Materia[c].Dia);
                        corpoConteudos = corpoConteudos.replaceAll('#Mes', result[i].Materia[c].Mes);
                        corpoConteudos = corpoConteudos.replaceAll('#trocaTitulo', result[i].Materia[c].Titulo);
                        corpoConteudos = corpoConteudos.replaceAll('#trocaLink', result[i].Materia[c].Link);
                        conteudos += corpoConteudos;
                    }
                }
            } else {

                for (c = 0; c < result[i].Materia.length; c++) {
                    if (!(typeof result[i].Materia[c].Titulo === "undefined")) {
                        corpoConteudos = '<div class="divRemove"><a id="ajusteData" href="#trocaLink" class="lay-bg-hover-gray transition-01 d-flex justify-content-start text-decoration-none rounded mb-2"><div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div class="small mesAgenda">#Mes</div><div> #Dia </div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">#trocaTitulo</p></div></a> </div> ';
                        corpoConteudos = corpoConteudos.replaceAll('#Dia', result[i].Materia[c].Dia);
                        corpoConteudos = corpoConteudos.replaceAll('#Mes', result[i].Materia[c].Mes);
                        corpoConteudos = corpoConteudos.replaceAll('#trocaTitulo', result[i].Materia[c].Titulo);
                        corpoConteudos = corpoConteudos.replaceAll('#trocaLink', result[i].Materia[c].Link);
                        conteudos += corpoConteudos;
                    }
                }

            }

          
            corpoHtmlBase = corpoHtmlBase.replaceAll('#RecebeConteudos', conteudos);
            conteudos = "";

        }
        text += corpoHtmlBase;
    }

    $('div[class*=owl-carousel]').removeAttr('style');
    $('#anoSelecionadoList').removeAttr('style');
    $('div[class*=loader]').attr('style', 'display:none;');

    $('div.divGlobal').append(text);

    $('.divArquivos').each(function () {
        if ($(this).text().trim() === '') {
            $(this).parents('.divEnvolveTitulo').find('.divTitulo').remove();
            $(this).remove();
        }
    });

    //$('a[id*=ajusteData]').each(function () {
    //    var data = $(this).parents('.divRemove').find('.dataList').text();
    //    var dia = data.split("/")[0];
    //    var mes = data.split("/")[1];

    //    var textoLink = $(this).text();

    //    if ($(".hidLinguagem").val() == "ptg") {
    //        $(this).html('<div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div>' + dia + '</div><div class="small mesAgenda">' + mes + '</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">' + textoLink + '</p></div>');
    //    } else {
    //        $(this).html('<div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div class="small mesAgenda">' + mes + '</div><div>' + dia + '</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">' + textoLink + '</p></div>');
    //    }


    //});

    //$('.dataList').remove();


    $('a').each(function () {
        var link = $(this);
        var urlLink = $(this).attr('href');
        if (typeof link.attr('href') != 'undefined') {
            if ((link.attr('href').indexOf('/Download/') > -1) || (link.attr('href').indexOf('download.aspx') > -1) || (link.attr('href').indexOf('Download.aspx') > -1)) {
                var descricao = link.text().trim();
                link.attr('target', '_blank');

                if (descricao == '') {
                    descricao = urlLink.split('download.aspx?')[1];
                }

                var url = window.location.href;

                if (url.toLowerCase().indexOf('/listresultados.aspx') > -1) {
                    var ano = $(this).parents('div[id*=divResultados]').attr('ano');

                    if ($(".hidLinguagem").val() == "ptg") {
                        link.attr("onClick", "gtag('event', 'link', {'event_label': '" + descricao + "_PT_" + ano + "'});");
                    } else {
                        link.attr("onClick", "gtag('event', 'link', {'event_label': '" + descricao + "_EN_" + ano + "'});");
                    }

                } else {
                    link.attr("onClick", "gtag('event', 'link', {'event_label': '" + descricao + "'});");
                }
            }
        }
    });


    var $carousel = $('.owl-calendar');
    $carousel.trigger('refresh.owl.carousel');

}

function onError(result) {
    alert(result._message);
}

function limpaFiltroPorAno() {
    window.location = "ListGroup.aspx?idCanal=" + getIdCanal();
}

function getIdCanal() {
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}

$(document).ready(function () {

    var combo = $('div[id*=ddlAnoLink]');
    $('div[class*=recebeCombo]').append(combo);

    if ($(".hidLinguagem").val() == "ptg") {
        $("select[id*=ddlAnoFiltro] option[value='Selecione o ano']").remove();
    } else {
        $("select[id*=ddlAnoFiltro] option[value='Select year']").remove();
    }

    //$('.divItem').each(function () {
    //    var value = $(this).parents('.divGlobal').find('select[id*=ddlAnoFiltro] option').attr('value');

    //    $(this).find('.recebeAno').text(value);
    //    $('select[id*=ddlAnoFiltro] option[value=' + value +']').remove();

    //});

    $('select[id*=ddlAnoFiltro] option').each(function () {

        var value = $(this).attr('value');
        var li = ('<li><div><a href="javascript:" onclick="efetuarFiltroPorAno(' + value + ')" class="anosList" data-ano="' + value + '">' + value + '</a></div></li>');

        $('#anoSelecionadoList').append(li);
    });

    $('.anosList').first().addClass('active');

    //$('.dataList').each(function () {
    //    var data = $(this).text();

    //    var anoItem = $(this).parents('.divItem').find('.recebeAno').text();

    //    if (data.indexOf(anoItem) == -1) {
    //        $(this).parents('.divRemove').remove();
    //    }
    //});

    $('.divArquivos').each(function () {
        if ($(this).text().trim() === '') {
            $(this).parents('.divEnvolveTitulo').find('.divTitulo').remove();
            $(this).remove();
        }
    });

    $('a[id*=linkListaTituloChamada]').each(function () {
        var data = $(this).parents('.divRemove').find('.dataList').text();
        var dia = data.split("/")[0];
        var mes = data.split("/")[1];

        var textoLink = $(this).text();

        if ($(".hidLinguagem").val() == "ptg") {
            $(this).html('<div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div>' + dia + '</div><div class="small mesAgenda">' + mes + '</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">' + textoLink + '</p></div>');
        } else {
            $(this).html('<div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div class="small mesAgenda">' + mes + '</div><div>' + dia + '</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">' + textoLink + '</p></div>');
        }


    });

    $('.dataList').remove();
    $('.recebeCombo').remove();

    $('.anosList').click(function () {
        $('.anosList').removeClass('active');
        $(this).addClass('active');
    });

    //var url = window.location.search;

    //if (url.indexOf('e3fhOCP0R3Oey+vyPBhxCA==') != -1 ) {
    //    $("#hlkCulturaEnUS").attr('href', '/listgroup.aspx?idCanal=e3fhOCP0R3Oey+vyPBhxCA==&linguagem=en');
    //    $("#hlkCulturaPtBR").attr('href', '/listgroup.aspx?idCanal=e3fhOCP0R3Oey+vyPBhxCA==&linguagem=pt');
    //    $(".linkEN").attr('href', '/listgroup.aspx?idCanal=e3fhOCP0R3Oey+vyPBhxCA==&linguagem=en');
    //    $(".linkPort").attr('href', '/listgroup.aspx?idCanal=e3fhOCP0R3Oey+vyPBhxCA==&linguagem=pt');
    //}
   

});


