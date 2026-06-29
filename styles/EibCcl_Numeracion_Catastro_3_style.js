
function obtenerColorTextoDesdeRGBA(colorStr) {
    // Esta expresi�n regular captura los 3 primeros grupos de n�meros ignorando los espacios y el Alpha
    const coincidencias = colorStr.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    
    if (!coincidencias) {
        return '#000000'; // Color de seguridad por si el string viene corrupto
    }

    // Convertimos las capturas a n�meros enteros
    const r = parseInt(coincidencias[1], 10);
    const g = parseInt(coincidencias[2], 10);
    const b = parseInt(coincidencias[3], 10);

    // Aplicamos la f�rmula YIQ
    const luminosidad = (r * 299 + g * 587 + b * 114) / 1000;

    // Si la puntuaci�n es alta (borde claro) -> texto negro. Si es baja (borde oscuro) -> texto blanco.
    return luminosidad >= 128 ? '#000000' : '#FFFFFF';
}

// =========================================================================
// ESTILO 1: PARA EL GRUPO DE ESTADO DE CONSERVACI�N
// =========================================================================
function estiloGrupoConservacion(feature, resolution) {
    var valueNUM = feature.get('ENA_N1_00') || '';
        var valueLETRA = feature.get("ENA_L1_00") || '';
    var estado = feature.get('ESTADOS_CONS_Estado_Conservacion');
    var numero = valueNUM + valueLETRA;
/*    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }    */
    // Asignamos un color de reborde seg�n el estado de conservaci�n
    var colorBorde = "rgba(0,0,0,1.000)"; // Por defecto negro
    if (estado === 'Bueno')   colorBorde = "rgba(44, 160, 44,1.000)";  
    if (estado === 'Regular') colorBorde = "rgba(255, 127, 0,1.000)";  
    if (estado === 'Malo')    colorBorde = "rgba(227, 26, 28,1.000)";  
    if (estado === 'Ruina')   colorBorde = "rgba(152, 78, 163,1.000)"; 

    // Calculamos el color del interior (blanco o negro) seg�n la claridad del borde
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde); 

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}

// =========================================================================
// ESTILO 2: PARA EL GRUPO DE TIPO DE NUMERACI�N
// =========================================================================
function estiloGrupoTipo(feature, resolution) {
    var valueNUM = feature.get('ENA_N1_00') || '';
    var valueLETRA = feature.get("ENA_L1_00") || '';
    var valueCODVIA = feature.get('ENA_CV_00');
    var numero = valueNUM + valueLETRA;

    // Aquí usamos otra paleta de colores completamente distinta para el reborde

    var colorBorde = obtenerColorPorVia(valueCODVIA);
    var colorInterior = obtenerColorTextoDesdeRGBA(colorBorde);

    return [new ol.style.Style({
        text: new ol.style.Text({
            text: String(numero),
            font: "bold 13px sans-serif",
            fill: new ol.style.Fill({ color: colorInterior }),
            stroke: new ol.style.Stroke({ color: colorBorde, width: 3 })
        })
    })];
}



function obtenerColorPorVia(valueCODVIA) {
    // Diccionario de colores (más rápido y limpio que un switch gigante)
    const mapaColores = {

'10':'rgba(208,95,93,0.494)',
'12':'rgba(157,224,33,0.494)',
'16':'rgba(28,236,31,0.494)',
'17':'rgba(64,214,166,0.494)',
'2':'rgba(208,113,176,0.494)',
'4':'rgba(41,164,230,0.494)',
'7':'rgba(160,65,208,0.494)',
'9':'rgba(219,184,110,0.494)',

'50': 'rgba(155,44,239,1.0)',
'5001': 'rgba(214,56,67,1.0)',
'5002': 'rgba(127,124,223,1.0)',
'5003': 'rgba(181,216,78,1.0)',
'5004': 'rgba(33,87,204,1.0)',
'5005': 'rgba(14,115,229,1.0)',
'5006': 'rgba(143,116,212,1.0)',
'5007': 'rgba(153,71,204,1.0)',
'5008': 'rgba(93,226,135,1.0)',
'5009': 'rgba(210,68,70,1.0)',
'5010': 'rgba(100,205,211,1.0)',
'5011': 'rgba(35,206,132,1.0)',
'5012': 'rgba(226,52,36,1.0)',
'5013': 'rgba(211,122,162,1.0)',
'5014': 'rgba(73,201,101,1.0)',
'5015': 'rgba(170,75,217,1.0)',
'5016': 'rgba(19,210,25,1.0)',
'5017': 'rgba(209,47,215,1.0)',
'5018': 'rgba(50,214,159,1.0)',
'5019': 'rgba(233,207,38,1.0)',
'5020': 'rgba(22,220,210,1.0)',
'5021': 'rgba(214,141,236,1.0)',
'5022': 'rgba(44,203,142,1.0)',
'5023': 'rgba(193,209,103,1.0)',
'5024': 'rgba(109,228,216,1.0)',
'5025': 'rgba(198,121,215,1.0)',
'5026': 'rgba(127,218,62,1.0)',
'5027': 'rgba(162,237,119,1.0)',
'5028': 'rgba(91,145,238,1.0)',
'5029': 'rgba(233,52,212,1.0)',
'5030': 'rgba(99,64,214,1.0)',
'5031': 'rgba(150,214,31,1.0)',
'5032': 'rgba(208,129,25,1.0)',
'5033': 'rgba(226,33,110,1.0)',
'5034': 'rgba(60,36,213,1.0)',
'5035': 'rgba(81,223,188,1.0)',
'5036': 'rgba(94,187,234,1.0)',
'5037': 'rgba(210,96,165,1.0)',
'5038': 'rgba(116,213,194,1.0)',
'5039': 'rgba(76,201,141,1.0)',
'5040': 'rgba(232,48,229,1.0)',
'5041': 'rgba(227,235,66,1.0)',
'5042': 'rgba(227,50,103,1.0)',
'5043': 'rgba(224,161,105,1.0)',
'5044': 'rgba(111,215,20,1.0)',
'5045': 'rgba(144,46,235,1.0)',
'5046': 'rgba(205,165,85,1.0)',
'5047': 'rgba(110,234,197,1.0)',
'5048': 'rgba(104,162,217,1.0)',
'5049': 'rgba(124,58,210,1.0)',
'5050': 'rgba(193,42,216,1.0)',
'5051': 'rgba(227,77,152,1.0)',
'5052': 'rgba(204,73,22,1.0)',
'5053': 'rgba(221,178,36,1.0)',
'5054': 'rgba(121,221,163,1.0)',
'5055': 'rgba(185,70,231,1.0)',
'5056': 'rgba(238,113,76,1.0)',
'5057': 'rgba(97,38,214,1.0)',
'5058': 'rgba(225,109,91,1.0)',
'5059': 'rgba(40,112,212,1.0)',
'5060': 'rgba(92,223,44,1.0)',
'5061': 'rgba(228,103,239,1.0)',
'5062': 'rgba(220,30,52,1.0)',
'5063': 'rgba(204,117,136,1.0)',
'5064': 'rgba(204,58,109,1.0)',
'5065': 'rgba(218,151,121,1.0)',
'5066': 'rgba(27,201,201,1.0)',
'5067': 'rgba(221,179,111,1.0)',
'5068': 'rgba(15,218,89,1.0)',
'5069': 'rgba(26,217,115,1.0)',
'5070': 'rgba(107,136,238,1.0)',
'5071': 'rgba(59,168,215,1.0)',
'5072': 'rgba(90,63,212,1.0)',
'5073': 'rgba(212,92,204,1.0)',
'5074': 'rgba(22,198,217,1.0)',
'5075': 'rgba(67,227,80,1.0)',
'5076': 'rgba(221,102,185,1.0)',
'5077': 'rgba(211,220,126,1.0)',
'5078': 'rgba(230,172,110,1.0)',
'5079': 'rgba(64,109,235,1.0)',
'5080': 'rgba(64,67,222,1.0)',
'5081': 'rgba(123,203,191,1.0)',
'5082': 'rgba(157,107,238,1.0)',
'5083': 'rgba(210,161,36,1.0)',
'5084': 'rgba(237,237,72,1.0)',
'5085': 'rgba(145,75,221,1.0)',
'5086': 'rgba(204,74,159,1.0)',
'5087': 'rgba(130,137,226,1.0)',
'5088': 'rgba(60,201,76,1.0)',
'5089': 'rgba(234,128,124,1.0)',
'5090': 'rgba(46,228,33,1.0)',
'5091': 'rgba(230,106,17,1.0)',
'5092': 'rgba(121,239,119,1.0)',
'5093': 'rgba(134,204,49,1.0)',
'5094': 'rgba(107,198,221,1.0)',
'5095': 'rgba(149,228,113,1.0)',
'5096': 'rgba(201,51,76,1.0)',
'5097': 'rgba(202,73,183,1.0)',
'52': 'rgba(147,215,46,1.0)',
'55': 'rgba(202,107,159,1.0)',
'56': 'rgba(201,16,155,1.0)',
'58': 'rgba(57,239,87,1.0)',
'59': 'rgba(83,164,226,1.0)',
'6': 'rgba(161,215,36,1.0)',
'64': 'rgba(206,131,114,1.0)',
'65': 'rgba(201,116,67,1.0)',
'68': 'rgba(46,191,217,1.0)',
'71': 'rgba(232,44,194,1.0)',
'76': 'rgba(150,214,86,1.0)',
'81': 'rgba(20,168,217,1.0)',
'83': 'rgba(218,198,19,1.0)',
'84': 'rgba(122,131,212,1.0)',
'85': 'rgba(215,23,74,1.0)',
'86': 'rgba(140,234,114,1.0)',
'87': 'rgba(181,206,82,1.0)',
'91': 'rgba(233,204,76,1.0)',
'93': 'rgba(125,231,104,1.0)',
'94': 'rgba(222,214,57,1.0)',
'95': 'rgba(83,238,124,1.0)',
'96': 'rgba(78,63,240,1.0)',
'97': 'rgba(43,150,216,1.0)',
'98': 'rgba(42,202,21,1.0)'


    };

    // Forzamos conversión a String para asegurar coincidencia exacta de la propiedad
    const clave = String(valueCODVIA);

    // Retorna el color del mapa. Si no se encuentra, aplica el default (negro)
    return mapaColores[clave] || 'rgba(255,255,255,1.000)';
}




var size = 0;
var placement = 'point';

var style_EibCcl_Numeracion_Catastro_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var valueCODVIA = feature.get("ENA_CV_00");
    var valueSGVIA = feature.get("EibCcl_Callejero_eibTipVia");
    var valueNOMVIA = feature.get("EibCcl_Callejero_eibNomVia");
    var nombreNUCLEO = String(valueCODVIA + " - " + valueSGVIA + " / " + valueNOMVIA)
    var valueNUM = feature.get("ENA_N1_00");
    var valueLETRA = feature.get("ENA_L1_00");
    var valueTIPO = feature.get("EN1_TIPO");
    var valueESTCONS = feature.get("ESTADOS_CONS_Estado_Conservacion");
    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }
/*    var labelFont = "bold 13px sans-serif";
    var labelFill = "#000000";
    var circleFill = "#4fc3f7";
    var bufferColor = "#aaaaaa";
    if (valueTIPO == "00_N1") {
    	circleFill = "#0d47a1";
    }
    if (valueESTCONS == "Bueno") {
    	bufferColor = "#2ca02c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Regular") {
    bufferColor = "#ff7f00";
    labelFill = "#ffffff"
    }
    if (valueESTCONS == "Malo") {
    	bufferColor = "#e31a1c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Ruina") {
    	bufferColor = "#984ea3";
    	labelFill = "#ffffff"
    }
*/
    
    var bufferWidth = 7;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String(valueNUM + valueLETRA);
    }
    var radioCirculo = 12;
    
   
    
/*        var style = [ 
        new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            displacement: [offsetX, offsetY],
            stroke: new ol.style.Stroke({
            color: circleFill,
            width: 3.5
        })
        })
    }),
    new ol.style.Style({
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];;
*/


/*
switch(String(valueCODVIA)) {

case '60': circleFill = 'rgba(255,96,17,1.0)'; break;
case '85': circleFill = 'rgba(221,237,127,1.0)'; break;
case '94': circleFill = 'rgba(136,111,225,1.0)'; break;
case '95': circleFill = 'rgba(203,199,80,1.0)'; break;
case '98': circleFill = 'rgba(109,230,48,1.0)'; break;
case '101': circleFill = 'rgba(135,211,55,1.0)'; break;
case '103': circleFill = 'rgba(236,178,79,1.0)'; break;
case '105': circleFill = 'rgba(215,62,41,1.0)'; break;
case '107': circleFill = 'rgba(224,25,171,1.0)'; break;
case '108': circleFill = 'rgba(71,153,200,1.0)'; break;
case '109': circleFill = 'rgba(182,114,207,1.0)'; break;
case '111': circleFill = 'rgba(77,123,239,1.0)'; break;
case '112': circleFill = 'rgba(205,171,35,1.0)'; break;
case '114': circleFill = 'rgba(102,213,79,1.0)'; break;
case '115': circleFill = 'rgba(18,200,18,1.0)'; break;
case '120': circleFill = 'rgba(102,202,227,1.0)'; break;
case '121': circleFill = 'rgba(18,116,228,1.0)'; break;
case '5002': circleFill = 'rgba(240,125,80,1.0)'; break;
case '5003': circleFill = 'rgba(231,121,24,1.0)'; break;
case '5004': circleFill = 'rgba(78,70,214,1.0)'; break;
case '5005': circleFill = 'rgba(237,122,225,1.0)'; break;
case '5006': circleFill = 'rgba(14,223,87,1.0)'; break;
case '5007': circleFill = 'rgba(33,220,161,1.0)'; break;
case '5008': circleFill = 'rgba(208,118,123,1.0)'; break;
case '5009': circleFill = 'rgba(129,141,233,1.0)'; break;
case '5010': circleFill = 'rgba(125,72,203,1.0)'; break;
case '5011': circleFill = 'rgba(216,81,135,1.0)'; break;
case '5016': circleFill = 'rgba(107,234,173,1.0)'; break;
case '5017': circleFill = 'rgba(134,18,222,1.0)'; break;
case '5018': circleFill = 'rgba(233,92,172,1.0)'; break;
case '5019': circleFill = 'rgba(156,215,28,1.0)'; break;
case '5020': circleFill = 'rgba(67,237,95,1.0)'; break;
case '5021': circleFill = 'rgba(212,44,227,1.0)'; break;
case '5022': circleFill = 'rgba(87,200,204,1.0)'; break;

    case '123': circleFill = 'rgba(179,48,240,1.000)'; break;
    case '24': circleFill = 'rgba(239,81,94,1.000)'; break;
    case '26': circleFill = 'rgba(168,237,31,1.000)'; break;
    case '49': circleFill = 'rgba(37,40,211,1.000)'; break;
    case '50': circleFill = 'rgba(61,204,166,1.000)'; break;
    case '5001': circleFill = 'rgba(127,200,54,1.000)'; break;
    case '5021': circleFill = 'rgba(93,234,222,1.000)'; break;
    case '51': circleFill = 'rgba(191,216,51,1.000)'; break;
    case '53': circleFill = 'rgba(38,226,145,1.000)'; break;
    case '55': circleFill = 'rgba(121,232,145,1.000)'; break;
    case '57': circleFill = 'rgba(219,29,143,1.000)'; break;
    case '58': circleFill = 'rgba(96,27,234,1.000)'; break;
    case '59': circleFill = 'rgba(110,175,229,1.000)'; break;
    case '60': circleFill = 'rgba(198,72,217,1.000)'; break;
    case '62': circleFill = 'rgba(133,119,202,1.000)'; break;
    case '64': circleFill = 'rgba(106,215,87,1.000)'; break;
    case '65': circleFill = 'rgba(232,68,197,1.000)'; break;
    case '67': circleFill = 'rgba(210,65,128,1.000)'; break;
    case '69': circleFill = 'rgba(201,109,75,1.000)'; break;
    case '7': circleFill = 'rgba(115,229,159,1.000)'; break;
    case '71': circleFill = 'rgba(202,84,71,1.000)'; break;
    case '76': circleFill = 'rgba(224,222,79,1.000)'; break;
    case '78': circleFill = 'rgba(25,152,202,1.000)'; break;
    case '79': circleFill = 'rgba(122,159,223,1.000)'; break;
    case '80': circleFill = 'rgba(236,200,58,1.000)'; break;
    case '83': circleFill = 'rgba(45,199,216,1.000)'; break;
    case '85': circleFill = 'rgba(212,23,70,1.000)'; break;
    case '86': circleFill = 'rgba(227,160,53,1.000)'; break;
    case '87': circleFill = 'rgba(231,129,228,1.000)'; break;
    case '88': circleFill = 'rgba(154,95,209,1.000)'; break;
    case '89': circleFill = 'rgba(51,234,57,1.000)'; break;
    case '90': circleFill = 'rgba(83,106,207,1.000)'; break;
    case '91': circleFill = 'rgba(88,233,20,1.000)'; break;
    default: circleFill = 'rgba(0,0,0,1.000)'; break;
}
*/


var style = [ 

/*
            // 1. EL C�RCULO
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radioCirculo,
                    displacement: [offsetX, offsetY], // Tu desplazamiento original del c�rculo
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: 3.5
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 0, 0)' // Centro totalmente transparente para ver el texto
                    })
                })
            }),
*/
            
            // 2. EL TEXTO PERFECTAMENTE CENTRADO
            new ol.style.Style({
                text: new ol.style.Text({
                    text: labelText,
                    font: labelFont,
                    fill: new ol.style.Fill({
                        color: obtenerColorTextoDesdeRGBA(circleFill)
                    }),
                    stroke: new ol.style.Stroke({
                        color: circleFill,
                        width: bufferWidth
                    }),
                    
                    // =========================================================
                    // LAS 4 PROPIEDADES CLAVE PARA EL CENTRADO ABSOLUTO
                    // =========================================================
                    textAlign: 'center',     // Fuerza el centro horizontal del texto
                    textBaseline: 'middle',  // Fuerza el centro vertical del texto
                    offsetX: offsetX,        // Sigue al c�rculo en el eje X
                    offsetY: -offsetY,       // Sigue al c�rculo en el eje Y (OpenLayers invierte el signo Y en el texto respecto a displacement)
                    // =========================================================
                    
                    placement: placement
                })
            })
        ];
    

    return style;
};
