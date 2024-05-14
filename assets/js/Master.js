$(document).ready(function () {   

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

                if ((url.toLowerCase().indexOf('/central') > -1) || (url.toLowerCase().indexOf('/center') > -1)) {
                    var ano = $(this).parents('div[id*=divResultados]').attr('ano');
                    if (ano != undefined) {
                        var idLink = $(this).attr('id');
                        descricao = idLink.split('_')[4];

                        if ($(".hidLinguagem").val() == "ptg") {
                            link.attr("onClick", "gtag('event', 'file_download', {'link_text' : '" + descricao + "_PT_" + ano + "','file_name' : '" + descricao + "_PT_" + ano + "'});");

                        } else {
                            link.attr("onClick", "gtag('event', 'file_download', {'link_text': '" + descricao + "_EN_" + ano + "','file_name' : '" + descricao + "_EN_" + ano + "'});");
                        }
                    }


                } else {
                    link.attr("onClick", "gtag('event', 'file_download', {'link_text' : '" + descricao + "','file_name' : '" + descricao + "'});");
                }
            }
        }
    });

    if ($("#hdnDefault").val() == "1") {
        $('div.divCentral a').each(function () {
            if (($(this).attr('href').indexOf('/Download/') > -1) || ($(this).attr('href').indexOf('download.aspx') > -1) || ($(this).attr('href').indexOf('Download.aspx') > -1)) {
                var descricao = $(this).text().trim();
                var trimestre = $(this).parents('div.divCentral').attr('data-titulo');
                $(this).attr("onClick", "gtag('event', 'file_download', {'link_text' : '" + descricao + "_" + trimestre + "','file_name' : '" + descricao + "_" + trimestre + "'});");
            }

        });
    }

    // Busca
    $(".inputBusca").keypress(function (event) {
        event = event || window.event;

        if (event.keyCode == '13') {
            Buscar();

            event.preventDefault();
        }
    });

    $(".inputBuscaMobile").keypress(function (event) {
        event = event || window.event;

        if (event.keyCode == '13') {
            BuscarMobile();

            event.preventDefault();
        }
    });

    $(".inputOk").click(function () {
        Buscar();
        event.preventDefault();
    });

    $(".inputOkMobile").click(function () {
        BuscarMobile();
        event.preventDefault();
    });


    var access_font_size = 0;
    var access_theme = "light";

    if (localStorage.getItem("access_font_size")) {
        access_font_size = Number(localStorage.getItem("access_font_size"));
        accessApplyFont(access_font_size);
    }
    if (localStorage.getItem("access_theme")) {
        access_theme = localStorage.getItem("access_theme");
        accessApplyTheme(access_theme);
    }

    $("#accessFontUp").on("click", function (e) {
        e.preventDefault();
        if (access_font_size < 4) {
            access_font_size += 1;
            accessApplyFont(access_font_size);
        }
    });

    $("#accessFontDown").on("click", function (e) {
        e.preventDefault();
        if (access_font_size > 0) {
            access_font_size -= 1;
            accessApplyFont(access_font_size);
        }
    });

    $("#accessThemeColor").on("click", function (e) {
        e.preventDefault();

        if (access_theme == "light") {
            access_theme = "dark";
        } else {
            access_theme = "light";
        }
        accessApplyTheme(access_theme);
    });

    if ($(".hidLinguagem").val() == "ptg") {
        $(".comboIdioma").text("PT");
    } else {
        $(".comboIdioma").text("ENG");
    }

    if ($(".hidLinguagem").val() == "ptg") {
        $("#btnPt").addClass("active");
    } else {
        $("#btnEn").addClass("active");
    }

  


    var cookiePoliticas = localStorage.getItem('cookiePoliticas');

    if (cookiePoliticas == null) {
        $(".box-cookies").attr("style", "display:block");

    }

   

    $(".liCentral").each(function () {
        $("#ulResultados").append($(this));
    });

    $(".arquivoCentral").each(function () {
        var titulo = $(this).text().toLowerCase();

        if (titulo.indexOf("resultados") != -1 || titulo.indexOf("results") != -1) {
            $(this).find(".iconeCentral").append('<span class="icomoon-bars"></span>');
        } else if ( titulo.indexOf("apresentação") != -1 || titulo.indexOf("presentation") != -1) {
            $(this).find(".iconeCentral").append('<span class="icomoon-presentation"></span>');
        } else if (titulo.indexOf("itr") != -1) {
            $(this).find(".iconeCentral").append('<span class="icomoon-file"></span>');
        } else if ( titulo.indexOf("áudio") != -1 || titulo.indexOf("audio") != -1 ||  titulo.indexOf("podcast") != -1 ) {
            $(this).find(".iconeCentral").append('<span class="icomoon-audio"></span>');
        } else if ( titulo.indexOf("demonstrações") != -1 || titulo.indexOf("statements") != -1 ) {
            $(this).find(".iconeCentral").append('<span class="icomoon-file-txt"></span>');
        } else if (titulo.indexOf("vídeo") != -1 || titulo.indexOf("video") != -1) {
            $(this).find(".iconeCentral").append('<span class="icomoon-video"></span>');
        } else {
            $(this).find(".iconeCentral").append('<span class="icomoon-file-txt"></span>');
        }
    });

    $("a[id*=LinkVideoResultadoHome]").each(function () {
        var linkVideo = $(this).attr("href");
        if (linkVideo != undefined && linkVideo != "" && linkVideo != "#") {
            $(this).removeAttr("style");
        }
    });

    $(".liCentral").first().find("a").addClass("active");
    $('#_tab1t').attr('aria-selected', 'true');
    $(".divCentral").first().addClass("show active");

    if ($("#hdnDefault").val() == "1" && $("div#Lbanner").length > 0) {
        $("div.alerta").attr('style', 'display:block');
        $("body").attr('style', 'max-height: 100vh;overflow-y: hidden;');
    }

    $("a.btn-fechar").on('click', function (e) {
        $("div.alerta").hide();
        $("body").attr('style', '');
    });

    if ($("#hdnDefault").val() == "1" ) {
        $("div.storiesHome").attr('style', 'display:block');
    }

    $(".inside-footer a").each(function () {

        if ($(this).attr('href') === '#') {
            $(this).remove();
        }

    });

    $('#menuInterno a').each(function () {
        if (location.href.toUpperCase().indexOf(this.href.toUpperCase()) >= 0) {
            $(this).addClass('active');
        }
    });

 
});




// Ativar o focus personalizado dos inputs

function activeInputsFocus(){
    const inputs = document.querySelectorAll('.div-input input, .div-input select, .div-input textarea');

    inputs.forEach(input => {
      input.addEventListener('focus', (e) => {
        input.parentNode.classList.add("focus")
      })
      input.addEventListener('blur', (e) => {
        if(input.value == ""){
          input.parentNode.classList.remove("focus")
        }
      })
    })
  }
  


// Contraste
function accessApplyFont(size) {
    localStorage.setItem("access_font_size", size);
    var size_px = 16 + Number(size);
    $("body").css({ "font-size": size_px });
}
function accessApplyTheme(theme) {
    localStorage.setItem("access_theme", theme);

    if (theme == "dark") {
        $("body").addClass("access_base_dark");
    } else {
        $("body").removeClass("access_base_dark");
    }
}

function setCookie() {
    localStorage.setItem('cookiePoliticas', "rdsaude");
    $(".box-cookies").attr("style", "display:none");
}

function Buscar() {
    var buscada = $(".inputBusca").val().replace(/"/g, "");
    window.location = "ListaBusca.aspx?busca=" + buscada;
}

function BuscarMobile() {
    var buscada = $(".inputBuscaMobile").val().replace(/"/g, "");
    window.location = "ListaBusca.aspx?busca=" + buscada;
}

function irParaTopo() {
    $('html, body').animate({
        scrollTop: 0
    }, 'slow');
}


function retornoCallback(arg) {
    var args = arg.split(';');

    switch (args[0]) {
        case "impressao": {
            executaImpressao(args[1]);
            break;
        }
        case "buscarShow": {
            alert(args[1]);
            break;
        }
        case "email": {
            if (args[1] == "success") {
                alert(args[2]);
                fechaBoxEmail();
            } else
                alert(args[2]);
            break;
        }
        case "novaDescricaoTriResponse":
            exibirNovaDescricao(args[1], args[2]);
            break;
        case "lembreteAgenda":
            var alertagenda = $('input[id$=MsgLembreteAgenda]').val();
            limparCamposAgenda();
            alert(alertagenda);
            break;
        case "paginarResponse":
            efetuarPaginacaoResponse(args[1], args[2]);
            break;
        case "alerta": {
            var alertari = $('input[id$=MsgSucessoRi]').val();
            alert(alertari);
            fechaBoxAlerta();
            limpaModal();
            break;
        }
        case "alertaContatoExiste": {
            var mensagem = unescape(args[1]);
            eval(mensagem);
            fechaBoxAlerta();
            limpaModal();
            $('body').removeClass();
            break;
        }
        case "EventosAnteriores": {
            carregarEventosAnteriores(args);
            break;
        }
        case "EventosProximos": {
            carregarEventosProximos(args);
            break;
        }
        case "paginarcalendarioresponsive": {
            montaEventosCalendario(args[1]);
            mostraEventosDoDiaSelecionadoPosMudancaMes();
            break;
        }
        case "captchaIvalido": {
            var textoAlerta = $('input[id$=MsgErroCaptcha]').val();
            alert(textoAlerta);
            break;
        }
        default:
            break;
    }
}

function erroCallback(err) {
    alert("erro:" + err);
}

