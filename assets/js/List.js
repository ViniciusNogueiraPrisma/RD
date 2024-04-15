$(document).ready(function () {

    
    //$('div[id*=ddlAnoLink]').attr('style', 'display:none;');

    $('select[id*=ddlAnoFiltro] option').each(function () {

        var value = $(this).attr('value');
        var li = ('<li><div><a href="javascript:" onclick="efetuarFiltroPorAno(' + value +')" class="anosList" data-ano="' + value + '">' + value + '</a></div></li>');

        $('#anoSelecionadoList').append(li);
    });

    $('div[id*=ddlAnoLink]').remove();

    $('.anosList').first().addClass('active');


    $('.dataList').each(function () {
        var data = $(this).text();

        var ano = data.split("/")[2];

        $('.recebeAno').text(ano);
    });


    //var i = 0;
    //var anos = new Array();

    //$('div.item').each(function () {
    //    var divList = $('.recebeAno');
    //    var ano = $('.recebeAno').text();

    //    if ($.inArray(ano, anos) == -1) {
    //        anos.push(ano);
    //        $(this).find('.recebeConteudo').attr('id', 'div' + i);
    //        i++;
    //        return;
    //    }
    //    else {
    //        divList.remove();
    //        var div = $(this).find('.divConteudo');
    //        var mainDiv = $("#div" + (i - 1));
    //        mainDiv.append(div);
    //        $(this).remove();
    //    }
    //});

    $('a[id*=linkListaTituloChamada]').each(function () {
        var data = $(this).parents('.divConteudo').find('.dataList').text();
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


    
  

    $('.anosList').click(function () {
        $('.anosList').removeClass('active');
        $(this).addClass('active');
    });

});

//function efetuarFiltroPorAno(ano) {
//    window.location = "List.aspx?idCanal=" + getIdCanal() + "&ano=" + ano;
//}

function habilitarNavegacao()
{

    $("select[id*=ddlAnoFiltro] option:eq(0)").remove();

    var contItensCombo = $('select[id*=ddlAnoFiltro]').children().length;

    if (contItensCombo > 1)
    {
        $('div[class*=owl-nav]').removeClass('disabled');

        var nextAno = parseInt($("select[id*=ddlAnoFiltro] option:eq(1)").val().trim());
        $('button[class*=owl-next]').removeClass('disabled');
        $('button[class*=owl-next]').attr('onclick', "efetuarFiltroPorAnoNext('" + nextAno + "')");

    }  
}



function efetuarFiltroPorAno(ano) {

    var idCanal = $('input[id*=hdCanal]').val();
    var linguagem = $('input[class*=hidLinguagem]').val();

    $('div[class*=recebeAno]').text(ano);
    $('input[id*=currentAno]').val(ano);

   
    

    $('div[class*=owl-carousel]').attr('style', 'display:none;');
    //$('div[id*=totalContent]').attr('style', 'display:none;');
    $('div[class*=loader]').attr('style', 'display:block;');

    PageMethods.RefreshContent(ano, idCanal, linguagem, onSuccess, onError);
}




function limpaFiltroPorAno() {
    window.location = "List.aspx?idCanal=" + getIdCanal();
}

function getIdCanal() {
    var strReturn = "";
    var strHref = window.location.href;
    var strQueryString = strHref.substr(strHref.indexOf("=") + 1);
    var aQueryString = strQueryString.split("&");
    return aQueryString[0];
}


function onSuccess(result) {
    //alert(result);
    $('div[class*=recebeConteudo]').empty();
    var i;
    var text = "";
    for (i = 0; i < result.length; i++) {
        if (!(typeof result[i].Titulo === "undefined")) {

            var diaItem = result[i].Data.split("/")[0];
            var mesItem = result[i].Data.split("/")[1];
            var corpoHtml = "";
            if ($(".hidLinguagem").val() == "ptg")
            {
                corpoHtml = '<div class="divConteudo"><a href="#linkItem" class="lay-bg-hover-gray transition-01 d-flex justify-content-start text-decoration-none rounded mb-2" title="#tituloItem" target="_blank"><div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div>#diaItem</div><div class="small mesAgenda">#mesItem</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">#tituloItem</p></div></a></div>';
            }
            else
            {
                corpoHtml = '<div class="divConteudo"><a href="#linkItem" class="lay-bg-hover-gray transition-01 d-flex justify-content-start text-decoration-none rounded mb-2" title="#tituloItem" target="_blank"><div class="rounded lay-bg-dark-green text-white font-montserrat text-center px-3 py-2 d-flex justify-content-center flex-column"><div class="small mesAgenda">#mesItem</div><div>#diaItem</div></div><div class="px-3 py-2 text-dark access-light-color"><p class="m-0">#tituloItem</p></div></a></div>';
            }

            corpoHtml = corpoHtml.replaceAll('#diaItem', diaItem);
            corpoHtml = corpoHtml.replaceAll('#mesItem', mesItem);
            corpoHtml = corpoHtml.replaceAll('#tituloItem', result[i].Titulo);

            var url = window.location.href;

            corpoHtml = corpoHtml.replaceAll('#linkItem', result[i].Link);
            text += corpoHtml;
        }

    }






    $('div[class*=owl-carousel]').removeAttr('style');
    $('div[class*=loader]').attr('style', 'display:none;');


    $('div[class*=recebeConteudo]').append(text);


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

                link.attr("onClick", "gtag('event', 'link', {'event_label': '" + descricao + "'});");
            }
        }
    });

    //$('div[id*=totalContent]').removeAttr('style');
    var $carousel = $('.owl-calendar');
    $carousel.trigger('refresh.owl.carousel');


}

function onError(result) {
    alert(result._message);
}




