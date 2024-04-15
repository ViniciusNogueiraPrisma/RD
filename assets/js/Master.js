$(document).ready(function () {
  $("a").each(function () {
    var link = $(this);
    var id = $(this).attr("id");
    var urlLink = $(this).attr("href");
    if (typeof link.attr("href") != "undefined") {
      if (id != "lnkSemLinguagem") {
        if (urlLink.toLowerCase().indexOf(".aspx") > -1) {
          if (urlLink.indexOf("linguagem") == -1) {
            if ($(".hidLinguagem").val() == "ptg") {
              link.removeAttr("href");
              if (urlLink.toLowerCase().indexOf("default.aspx") > -1) {
                link.attr("href", urlLink + "?linguagem=pt");
              } else {
                link.attr("href", urlLink + "&linguagem=pt");
              }
            } else {
              link.removeAttr("href");
              if (urlLink.toLowerCase().indexOf("default.aspx") > -1) {
                link.attr("href", urlLink + "?linguagem=en");
              } else {
                link.attr("href", urlLink + "&linguagem=en");
              }
            }
          }
        }
      }
    }
  });

  $("a").each(function () {
    var link = $(this);
    var urlLink = $(this).attr("href");
    if (typeof link.attr("href") != "undefined") {
      if (
        link.attr("href").indexOf("/Download/") > -1 ||
        link.attr("href").indexOf("download.aspx") > -1 ||
        link.attr("href").indexOf("Download.aspx") > -1
      ) {
        var descricao = link.text().trim();
        link.attr("target", "_blank");

        if (descricao == "") {
          descricao = urlLink.split("download.aspx?")[1];
        }

        var url = window.location.href;

        if (url.toLowerCase().indexOf("/listresultados.aspx") > -1) {
          var ano = $(this).parents("div[id*=divResultados]").attr("ano");
          if ($(".hidLinguagem").val() == "ptg") {
            link.attr(
              "onClick",
              "gtag('event', 'link', {'event_label': '" +
                descricao +
                "_PT_" +
                ano +
                "'});"
            );
          } else {
            link.attr(
              "onClick",
              "gtag('event', 'link', {'event_label': '" +
                descricao +
                "_EN_" +
                ano +
                "'});"
            );
          }
        } else {
          link.attr(
            "onClick",
            "gtag('event', 'link', {'event_label': '" + descricao + "'});"
          );
        }
      }
    }
  });

  // Busca
  $(".inputBusca").keypress(function (event) {
    event = event || window.event;

    if (event.keyCode == "13") {
      Buscar();

      event.preventDefault();
    }
  });

  $(".inputBuscaMobile").keypress(function (event) {
    event = event || window.event;

    if (event.keyCode == "13") {
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

  $(".arquivoCentral").each(function () {
    var titulo = $(this).text().toLowerCase();

    if (titulo.indexOf("resultados") != -1 || titulo.indexOf("results") != -1) {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-bars"></span>');
    } else if (
      titulo.indexOf("apresentação") != -1 ||
      titulo.indexOf("presentation") != -1
    ) {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-presentation"></span>');
    } else if (titulo.indexOf("itr") != -1) {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-file"></span>');
    } else if (
      titulo.indexOf("áudio") != -1 ||
      titulo.indexOf("audio") != -1 ||
      titulo.indexOf("podcast") != -1
    ) {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-audio"></span>');
    } else if (
      titulo.indexOf("demonstrações") != -1 ||
      titulo.indexOf("statements") != -1
    ) {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-file-txt"></span>');
    } else if (titulo.indexOf("vídeo") != -1 || titulo.indexOf("video") != -1) {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-video"></span>');
    } else {
      $(this)
        .find(".iconeCentral")
        .append('<span class="icomoon-file-txt"></span>');
    }
  });

  $("a[id*=LinkVideoResultadoHome]").each(function () {
    var linkVideo = $(this).attr("href");
    if (linkVideo != undefined && linkVideo != "" && linkVideo != "#") {
      $(this).removeAttr("style");
    }
  });

  $('a[href$="Mailling"]').each(function () {
    $(this).attr("data-toggle", "modal");
    $(this).attr("data-target", "#alertasModal");
    $(this).attr("href", "");
  });

  $(".liCentral").each(function () {
    $("#ulResultados").append($(this));
  });

  $(".liCentral").first().find("a").addClass("active");
  $(".divCentral").first().addClass("show active");

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

  function fixHeader() {
    if ($(this).scrollTop() > 50) {
      $("#header-page").addClass("header-page-fixed");
    } else {
      $("#header-page").removeClass("header-page-fixed");
    }
  }
  $(window).scroll(function () {
    fixHeader();
  });
  $(document).ready(function () {
    fixHeader();
  });

  if ($(".hidLinguagem").val() == "ptg") {
    $(".comboIdiomar").text("PT");
  } else {
    $(".comboIdioma").text("ENG");
  }

  if ($(".hidLinguagem").val() == "ptg") {
    $(".linkPort").addClass("active");
  } else {
    $(".linkEN").addClass("active");
  }

  var url = window.location;

  $(".linkBreadcrumb").each(function () {
    var link = $(this).attr("href");

    var textoLink = $(this).text();

    if (url == link) {
      $(this).replaceWith(
        '<span class="lay-color-dark-green">' + textoLink + "</span>"
      );
    }
  });

  if ($(".eventosHome").text().trim() === "") {
    if ($(".hidLinguagem").val() == "ptg") {
      $(".eventosHome").html("<p>Não há eventos futuros cadastrados.</p > ");
    } else {
      $(".eventosHome").html("<p>There are no future events registered.</p > ");
    }
  }

  var ultimoMenu = $(".ultimoMenu").html();

  $(".inserirMenu").append(ultimoMenu);

  $(".ultimoMenu").remove();

  if ($("#hdnDefault").val() == "1" && $("div#Lbanner").length > 0) {
    $("div.alerta").attr("style", "display:block");
    $("body").attr("style", "max-height: 100vh;overflow-y: hidden;");
  }

  $("a.btn-fechar").on("click", function (e) {
    $("div.alerta").hide();
    $("body").attr("style", "");
  });
});

function irParaTopo() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
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
  $("html, body").animate({ scrollTop: 0 }, "slow");
}

//Alertas

function enviaAlerta() {
  Validar();
}

function Validar() {
  if (
    document.getElementById("nome_modal").value == "" &&
    $(".hidLinguagem").val() == "ptg"
  ) {
    alert("É necessário um nome.");
    return false;
  } else if (document.getElementById("nome_modal").value == "") {
    alert("Insert a name.");
    return false;
  }

  if (
    document.getElementById("email_modal").value == "" &&
    $(".hidLinguagem").val() == "ptg"
  ) {
    alert("É necessário um email.");
    return false;
  } else if (document.getElementById("email_modal").value == "") {
    alert("Insert a email.");
    return false;
  }
  if (
    document.getElementById("controlMailingPort").checked != true &&
    document.getElementById("controlMailingIng").checked != true
  ) {
    if ($(".hidLinguagem").val() == "ptg")
      alert("Selecione pelo menos um marcador.");
    else alert("Select at least one marker.");
    return false;
  }

  if (document.getElementById("idCaptcha").value == "0") {
    if ($(".hidLinguagem").val() == "ptg") alert("Marque a caixa de seleção!");
    else alert("Select the checkbox!");
    return false;
  }

  cadastraContato();
}

function fechaBoxAlerta() {
  $("#fadeModal").hide();
  $("div[class*=modal-backdrop]").hide();
  $("#alertasModal").hide();
}

function limpaModal() {
  $(".modal-body").find("input:text").val("");
  $(".modal-body").find("input:radio").prop("checked", false);
  $(".modal-body").find("select").val("0");
}

function cadastraContato() {
  var mailingPort = "";
  var mailingIng = "";
  var mailingEs = "";

  var nomeAlerta = $("#nome_modal").val();
  var emailAlerta = $("#email_modal").val();
  var telefone = $("#controlTelefone").val();
  var empresa = $("#controlEmpresa").val();
  var cargo = $("#controlCargo").val();
  var perfil = $("#controlPerfil").val();
  //var txtCaptcha = $('input[id*=txtCaptcha]').val();

  var filter =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (!filter.test(emailAlerta)) {
    if ($(".hidLinguagem").val() == "ptg") {
      alert("E-mail Inválido!");
    } else if ($(".hidLinguagem").val() == "eng") {
      alert("Invalid E-mail!");
    }
    return false;
  }

  if (document.getElementById("controlMailingPort").checked == true) {
    mailingPort = $("#controlMailingPort").val();
  }
  if (document.getElementById("controlMailingIng").checked == true) {
    mailingIng = $("#controlMailingIng").val();
  }

  CallServer(
    "alerta;" +
      nomeAlerta +
      ";" +
      emailAlerta +
      ";" +
      telefone +
      ";" +
      empresa +
      ";" +
      cargo +
      ";" +
      perfil +
      ";" +
      mailingPort +
      ";" +
      mailingIng +
      ";" +
      mailingEs
  );
}
// FIM Alertas

document.addEventListener("DOMContentLoaded", function () {
  var cardHeaders = document.querySelectorAll(".card-header");

  cardHeaders.forEach(function (cardHeader) {
    var collapse = cardHeader.nextElementSibling;

    cardHeader.addEventListener("click", function () {
      $(collapse).collapse("toggle");
    });

    collapse.addEventListener("show.bs.collapse", function () {
      collapse.style.height = "auto";
      collapse.style.transition = "height 0.3s ease-out";
    });

    collapse.addEventListener("hidden.bs.collapse", function () {
      collapse.style.height = "";
      collapse.style.transition = "";
    });
  });
});

function retornoCallback(arg) {
  var args = arg.split(";");

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
      } else alert(args[2]);
      break;
    }
    case "novaDescricaoTriResponse":
      exibirNovaDescricao(args[1], args[2]);
      break;
    case "lembreteAgenda":
      var alertagenda = $("input[id$=MsgLembreteAgenda]").val();
      limparCamposAgenda();
      alert(alertagenda);
      break;
    case "paginarResponse":
      efetuarPaginacaoResponse(args[1], args[2]);
      break;
    case "alerta": {
      var alertari = $("input[id$=MsgSucessoRi]").val();
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
      $("body").removeClass();
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
      var textoAlerta = $("input[id$=MsgErroCaptcha]").val();
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
