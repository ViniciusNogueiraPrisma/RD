$(document).ready(function () {

    // Paginação
    $('div[class*=paglist] > a').wrap('<li class="page-item"></li>');
    $('div[class*=paglist]').wrapInner('<ul class="pagination pagerX"></ul>');
    $('ul.pagerX li a').addClass('page-link rounded text-dark access-light-color');
    $('li a.navMarcada').parent().addClass('active'); 


});
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

//Configuração do Addthis para retirar o ícone de impressão
var addthis_config =
{
    services_exclude: 'print'
}

function imprimirClick() {
    imprimir("", "", "");
}

//Método para imprimir o conteúdo de uma página.
function executaImpressao(id) {
    printPage('./Impressao.aspx?idMateria=' + id);
}

function setPrint() {
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
}

function printPage(sURL) {
    var oHiddFrame = document.createElement("iframe");
    oHiddFrame.onload = setPrint;
    oHiddFrame.style.visibility = "hidden";
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.right = "0";
    oHiddFrame.style.bottom = "0";
    oHiddFrame.src = sURL;
    document.body.appendChild(oHiddFrame);
}

function imprimir(txTitulo, txSubTitulo, txConteudo, txtituloRI) {
    CallServer("impressao;" + txTitulo + ";" + txSubTitulo + ";" + txConteudo + ";" + txtituloRI);
}

function filtrarAno() {
    var ano = $('select[id$=ddlAnoFiltro]').val();
    ano = parseInt(ano);
    if (!isNaN(ano)) {
        efetuarFiltroPorAno(ano);
    }
    else {
        limpaFiltroPorAno();
    }
}


