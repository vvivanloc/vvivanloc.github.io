// umpirsky, list of all countries with names and ISO 3166-1 codes in all languages and all data formats.
// from https://github.com/umpirsky/country-list/blob/master/data/fr/country.json
let lFrenchCountryNames: { [key: string]: string } =
     {
     "AF": "Afghanistan",
     "ZA": "Afrique du Sud",
     "AL": "Albanie",
     "DZ": "Alg\u00e9rie",
     "DE": "Allemagne",
     "AD": "Andorre",
     "AO": "Angola",
     "AI": "Anguilla",
     "AQ": "Antarctique",
     "AG": "Antigua-et-Barbuda",
     "SA": "Arabie saoudite",
     "AR": "Argentine",
     "AM": "Arm\u00e9nie",
     "AW": "Aruba",
     "AU": "Australie",
     "AT": "Autriche",
     "AZ": "Azerba\u00efdjan",
     "BS": "Bahamas",
     "BH": "Bahre\u00efn",
     "BD": "Bangladesh",
     "BB": "Barbade",
     "BE": "Belgique",
     "BZ": "Belize",
     "BJ": "B\u00e9nin",
     "BM": "Bermudes",
     "BT": "Bhoutan",
     "BY": "Bi\u00e9lorussie",
     "BO": "Bolivie",
     "BA": "Bosnie-Herz\u00e9govine",
     "BW": "Botswana",
     "BR": "Br\u00e9sil",
     "BN": "Brun\u00e9i Darussalam",
     "BG": "Bulgarie",
     "BF": "Burkina Faso",
     "BI": "Burundi",
     "KH": "Cambodge",
     "CM": "Cameroun",
     "CA": "Canada",
     "CV": "Cap-Vert",
     "EA": "Ceuta et Melilla",
     "CL": "Chili",
     "CN": "Chine",
     "CY": "Chypre",
     "CO": "Colombie",
     "KM": "Comores",
     "CG": "Congo-Brazzaville",
     "CD": "Congo-Kinshasa",
     "KP": "Cor\u00e9e du Nord",
     "KR": "Cor\u00e9e du Sud",
     "CR": "Costa Rica",
     "CI": "C\u00f4te d\u2019Ivoire",
     "HR": "Croatie",
     "CU": "Cuba",
     "CW": "Cura\u00e7ao",
     "DK": "Danemark",
     "DG": "Diego Garcia",
     "DJ": "Djibouti",
     "DM": "Dominique",
     "EG": "\u00c9gypte",
     "SV": "El Salvador",
     "AE": "\u00c9mirats arabes unis",
     "EC": "\u00c9quateur",
     "ER": "\u00c9rythr\u00e9e",
     "ES": "Espagne",
     "EE": "Estonie",
     "VA": "\u00c9tat de la Cit\u00e9 du Vatican",
     "FM": "\u00c9tats f\u00e9d\u00e9r\u00e9s de Micron\u00e9sie",
     "US": "\u00c9tats-Unis",
     "ET": "\u00c9thiopie",
     "FJ": "Fidji",
     "FI": "Finlande",
     "FR": "France",
     "GA": "Gabon",
     "GM": "Gambie",
     "GE": "G\u00e9orgie",
     "GH": "Ghana",
     "GI": "Gibraltar",
     "GR": "Gr\u00e8ce",
     "GD": "Grenade",
     "GL": "Groenland",
     "GP": "Guadeloupe",
     "GU": "Guam",
     "GT": "Guatemala",
     "GG": "Guernesey",
     "GN": "Guin\u00e9e",
     "GQ": "Guin\u00e9e \u00e9quatoriale",
     "GW": "Guin\u00e9e-Bissau",
     "GY": "Guyana",
     "GF": "Guyane fran\u00e7aise",
     "HT": "Ha\u00efti",
     "HN": "Honduras",
     "HU": "Hongrie",
     "CX": "\u00cele Christmas",
     "AC": "\u00cele de l\u2019Ascension",
     "IM": "\u00cele de Man",
     "NF": "\u00cele Norfolk",
     "AX": "\u00celes \u00c5land",
     "KY": "\u00celes Ca\u00efmans",
     "IC": "\u00celes Canaries",
     "CC": "\u00celes Cocos",
     "CK": "\u00celes Cook",
     "FO": "\u00celes F\u00e9ro\u00e9",
     "GS": "\u00celes G\u00e9orgie du Sud et Sandwich du Sud",
     "FK": "\u00celes Malouines",
     "MP": "\u00celes Mariannes du Nord",
     "MH": "\u00celes Marshall",
     "UM": "\u00celes mineures \u00e9loign\u00e9es des \u00c9tats-Unis",
     "SB": "\u00celes Salomon",
     "TC": "\u00celes Turques-et-Ca\u00efques",
     "VG": "\u00celes Vierges britanniques",
     "VI": "\u00celes Vierges des \u00c9tats-Unis",
     "IN": "Inde",
     "ID": "Indon\u00e9sie",
     "IQ": "Irak",
     "IR": "Iran",
     "IE": "Irlande",
     "IS": "Islande",
     "IL": "Isra\u00ebl",
     "IT": "Italie",
     "JM": "Jama\u00efque",
     "JP": "Japon",
     "JE": "Jersey",
     "JO": "Jordanie",
     "KZ": "Kazakhstan",
     "KE": "Kenya",
     "KG": "Kirghizistan",
     "KI": "Kiribati",
     "XK": "Kosovo",
     "KW": "Kowe\u00eft",
     "RE": "La R\u00e9union",
     "LA": "Laos",
     "LS": "Lesotho",
     "LV": "Lettonie",
     "LB": "Liban",
     "LR": "Lib\u00e9ria",
     "LY": "Libye",
     "LI": "Liechtenstein",
     "LT": "Lituanie",
     "LU": "Luxembourg",
     "MK": "Mac\u00e9doine",
     "MG": "Madagascar",
     "MY": "Malaisie",
     "MW": "Malawi",
     "MV": "Maldives",
     "ML": "Mali",
     "MT": "Malte",
     "MA": "Maroc",
     "MQ": "Martinique",
     "MU": "Maurice",
     "MR": "Mauritanie",
     "YT": "Mayotte",
     "MX": "Mexique",
     "MD": "Moldavie",
     "MC": "Monaco",
     "MN": "Mongolie",
     "ME": "Mont\u00e9n\u00e9gro",
     "MS": "Montserrat",
     "MZ": "Mozambique",
     "MM": "Myanmar",
     "NA": "Namibie",
     "NR": "Nauru",
     "NP": "N\u00e9pal",
     "NI": "Nicaragua",
     "NE": "Niger",
     "NG": "Nig\u00e9ria",
     "NU": "Niue",
     "NO": "Norv\u00e8ge",
     "NC": "Nouvelle-Cal\u00e9donie",
     "NZ": "Nouvelle-Z\u00e9lande",
     "OM": "Oman",
     "UG": "Ouganda",
     "UZ": "Ouzb\u00e9kistan",
     "PK": "Pakistan",
     "PW": "Palaos",
     "PA": "Panama",
     "PG": "Papouasie-Nouvelle-Guin\u00e9e",
     "PY": "Paraguay",
     "NL": "Pays-Bas",
     "BQ": "Pays-Bas carib\u00e9ens",
     "PE": "P\u00e9rou",
     "PH": "Philippines",
     "PN": "Pitcairn",
     "PL": "Pologne",
     "PF": "Polyn\u00e9sie fran\u00e7aise",
     "PR": "Porto Rico",
     "PT": "Portugal",
     "QA": "Qatar",
     "HK": "R.A.S. chinoise de Hong Kong",
     "MO": "R.A.S. chinoise de Macao",
     "CF": "R\u00e9publique centrafricaine",
     "DO": "R\u00e9publique dominicaine",
     "CZ": "R\u00e9publique tch\u00e8que",
     "RO": "Roumanie",
     "GB": "Royaume-Uni",
     "RU": "Russie",
     "RW": "Rwanda",
     "EH": "Sahara occidental",
     "BL": "Saint-Barth\u00e9lemy",
     "KN": "Saint-Christophe-et-Ni\u00e9v\u00e8s",
     "SM": "Saint-Marin",
     "MF": "Saint-Martin (partie fran\u00e7aise)",
     "SX": "Saint-Martin (partie n\u00e9erlandaise)",
     "PM": "Saint-Pierre-et-Miquelon",
     "VC": "Saint-Vincent-et-les-Grenadines",
     "SH": "Sainte-H\u00e9l\u00e8ne",
     "LC": "Sainte-Lucie",
     "WS": "Samoa",
     "AS": "Samoa am\u00e9ricaines",
     "ST": "Sao Tom\u00e9-et-Principe",
     "SN": "S\u00e9n\u00e9gal",
     "RS": "Serbie",
     "SC": "Seychelles",
     "SL": "Sierra Leone",
     "SG": "Singapour",
     "SK": "Slovaquie",
     "SI": "Slov\u00e9nie",
     "SO": "Somalie",
     "SD": "Soudan",
     "SS": "Soudan du Sud",
     "LK": "Sri Lanka",
     "SE": "Su\u00e8de",
     "CH": "Suisse",
     "SR": "Surinam",
     "SJ": "Svalbard et Jan Mayen",
     "SZ": "Swaziland",
     "SY": "Syrie",
     "TJ": "Tadjikistan",
     "TW": "Ta\u00efwan",
     "TZ": "Tanzanie",
     "TD": "Tchad",
     "TF": "Terres australes fran\u00e7aises",
     "IO": "Territoire britannique de l\u2019oc\u00e9an Indien",
     "PS": "Territoires palestiniens",
     "TH": "Tha\u00eflande",
     "TL": "Timor oriental",
     "TG": "Togo",
     "TK": "Tokelau",
     "TO": "Tonga",
     "TT": "Trinit\u00e9-et-Tobago",
     "TA": "Tristan da Cunha",
     "TN": "Tunisie",
     "TM": "Turkm\u00e9nistan",
     "TR": "Turquie",
     "TV": "Tuvalu",
     "UA": "Ukraine",
     "UY": "Uruguay",
     "VU": "Vanuatu",
     "VE": "Venezuela",
     "VN": "Vietnam",
     "WF": "Wallis-et-Futuna",
     "YE": "Y\u00e9men",
     "ZM": "Zambie",
     "ZW": "Zimbabwe"
 }

// Stathis Goudoulakis, Hello In All Languages
// from https://github.com/stathisg/hello-in-all-languages/blob/master/hello-in-all-languages.php

// much more compact in this form
let lGreetingsArray = [
    ["A2", "Satellite Provider", "Hello"],
    ["AD", "Andorra", "Hola"],
    ["AE", "United Arab Emirates", "Marhaba"],
    ["AF", "Afghanistan", "Senga yai"],
    ["AG", "Antigua and Barbuda", "Hello"],
    ["AI", "Anguilla", "Hello"],
    ["AL", "Albania", "Tungjatjeta"],
    ["AM", "Armenia", "Barev"],
    ["AN", "Netherlands Antilles", "Kon ta bai"],
    ["AO", "Angola", "Olá"],
    ["AP", "Asia/Pacific Region", "Hello"],
    ["AQ", "Antarctica", "Hello"],
    ["AR", "Argentina", "Hola"],
    ["AS", "American Samoa", "Hello"],
    ["AT", "Austria", "Hallo"],
    ["AU", "Australia", "Hello"],
    ["AW", "Aruba", "Kon ta bai"],
    ["AX", "Aland Islands", "Hello"],
    ["AZ", "Azerbaijan", "Salam"],
    ["BA", "Bosnia and Herzegovina", "Zdravo"],
    ["BB", "Barbados", "Hello"],
    ["BD", "Bangladesh", "Namaskar"],
    ["BE", "Belgium", "Hallo"],
    ["BF", "Burkina Faso", "Bonjour"],
    ["BG", "Bulgaria", "Zdravei"],
    ["BH", "Bahrain", "Marhaba"],
    ["BI", "Burundi", "Bonjour"],
    ["BJ", "Benin", "Bonjour"],
    ["BM", "Bermuda", "Hello"],
    ["BN", "Brunei Darussalam", "Selamat"],
    ["BO", "Bolivia", "Hola"],
    ["BR", "Brazil", "Olá"],
    ["BS", "Bahamas", "Hello"],
    ["BT", "Bhutan", "Kuzu zangpo"],
    ["BV", "Bouvet Island", "Hello"],
    ["BW", "Botswana", "Dumela"],
    ["BY", "Belarus", "Вітаю"],
    ["BZ", "Belize", "Hello"],
    ["CA", "Canada", "Hello"],
    ["CD", "Congo  The Democratic Republic of the", "Bonjour"],
    ["CF", "Central African Republic", "Bonjour"],
    ["CG", "Congo", "Bonjour"],
    ["CH", "Switzerland", "Hallo"],
    ["CI", "Cote d'Ivoire", "Bonjour"],
    ["CK", "Cook Islands", "Kia orana"],
    ["CL", "Chile", "Hola"],
    ["CM", "Cameroon", "Hello"],
    ["CN", "China", "&#20320;&#22909; (nǐhǎo)"],
    ["CO", "Colombia", "Hola"],
    ["CR", "Costa Rica", "Hola"],
    ["CU", "Cuba", "Hola"],
    ["CV", "Cape Verde", "Olá"],
    ["CY", "Cyprus", "&#915;&#949;&#953;&#945; &#963;&#959;&#965;"],
    ["CZ", "Czech Republic", "Dobrý den"],
    ["DE", "Germany", "Hallo"],
    ["DJ", "Djibouti", "Marhaba"],
    ["DK", "Denmark", "Hej"],
    ["DM", "Dominica", "Hello"],
    ["DO", "Dominican Republic", "Hola"],
    ["DZ", "Algeria", "Marhaba"],
    ["EC", "Ecuador", "Hola"],
    ["EE", "Estonia", "Tervist"],
    ["EG", "Egypt", "Marhaba"],
    ["ER", "Eritrea", "Marhaba"],
    ["ES", "Spain", "Hola"],
    ["ET", "Ethiopia", "Teanastëllën"],
    ["EU", "Europe", "Hello"],
    ["FI", "Finland", "Moi"],
    ["FJ", "Fiji", "Hello"],
    ["FK", "Falkland Islands (Malvinas)", "Hello"],
    ["FM", "Micronesia  Federated States of", "Hello"],
    ["FO", "Faroe Islands", "Hallo"],
    ["FR", "France", "Bonjour"],
    ["GA", "Gabon", "Bonjour"],
    ["GB", "Great Britain", "Hello"],
    ["GD", "Grenada", "Hello"],
    ["GE", "Georgia", "Gamardjobat"],
    ["GF", "French Guiana", "Bonjour"],
    ["GG", "Guernsey", "Hello"],
    ["GH", "Ghana", "Hello"],
    ["GI", "Gibraltar", "Hello"],
    ["GL", "Greenland", "Aluu"],
    ["GM", "Gambia", "Hello"],
    ["GN", "Guinea", "Bonjour"],
    ["GP", "Guadeloupe", "Hello"],
    ["GQ", "Equatorial Guinea", "Hola"],
    ["GR", "Greece", "&#915;&#949;&#953;&#945; &#963;&#959;&#965; (geia sou)"],
    ["GT", "Guatemala", "Hola"],
    ["GU", "Guam", "Hello"],
    ["GW", "Guinea-Bissau", "Olá"],
    ["GY", "Guyana", "Hello"],
    ["HK", "Hong Kong", "&#20320;&#22909; (nei5 hou2)"],
    ["HN", "Honduras", "Hola"],
    ["HR", "Croatia", "Bok"],
    ["HT", "Haiti", "Bonjour"],
    ["HU", "Hungary", "Jó napot"],
    ["ID", "Indonesia", "Selamat"],
    ["IE", "Ireland", "Haileo"],
    ["IL", "Israel", "שָׁלוֹם (Shalom)"],
    ["IM", "Isle of Man", "Hello"],
    ["IN", "India", "&#2344;&#2350;&#2360;&#2381;&#2340;&#2375; (namaste)"],
    ["IO", "British Indian Ocean Territory", "Hello"],
    ["IQ", "Iraq", "Marhaba"],
    ["IR", "Iran  Islamic Republic of", "Salâm"],
    ["IS", "Iceland", "Góðan daginn"],
    ["IT", "Italy", "Buon giorno"],
    ["JE", "Jersey", "Hello"],
    ["JM", "Jamaica", "Hello"],
    ["JO", "Jordan", "Marhaba"],
    ["JP", "Japan", "&#12371;&#12435;&#12395;&#12385;&#12399; (konnichi wa)"],
    ["KE", "Kenya", "Habari"],
    ["KG", "Kyrgyzstan", "Kandisiz"],
    ["KH", "Cambodia", "Sua s'dei"],
    ["KI", "Kiribati", "Mauri"],
    ["KM", "Comoros", "Bariza djioni"],
    ["KN", "Saint Kitts and Nevis", "Hello"],
    ["KP", "Korea  Democratic People's Republic of", "&#50504;&#45397;&#54616;&#49464;&#50836; (annyeonghaseyo)"],
    ["KR", "Korea  Republic of", "&#50504;&#45397;&#54616;&#49464;&#50836; (annyeonghaseyo)"],
    ["KW", "Kuwait", "Marhaba"],
    ["KY", "Cayman Islands", "Hello"],
    ["KZ", "Kazakhstan", "Salam"],
    ["LA", "Lao People's Democratic Republic", "Sabaidee"],
    ["LB", "Lebanon", "Marhaba"],
    ["LC", "Saint Lucia", "Hello"],
    ["LI", "Liechtenstein", "Hallo"],
    ["LK", "Sri Lanka", "A`yubowan"],
    ["LR", "Liberia", "Hello"],
    ["LS", "Lesotho", "Hello"],
    ["LT", "Lithuania", "Laba diena"],
    ["LU", "Luxembourg", "Moïen"],
    ["LV", "Latvia", "Sveiki"],
    ["LY", "Libyan Arab Jamahiriya", "Marhaba"],
    ["MA", "Morocco", "Marhaba"],
    ["MC", "Monaco", "Bonjour"],
    ["MD", "Moldova  Republic of", "Salut"],
    ["ME", "Montenegro", "Zdravo"],
    ["MG", "Madagascar", "Manao ahoana"],
    ["MH", "Marshall Islands", "Yokwe"],
    ["MK", "Macedonia", "&#1047;&#1076;&#1088;&#1072;&#1074;&#1086;"],
    ["ML", "Mali", "Bonjour"],
    ["MM", "Myanmar", "Mingalarba"],
    ["MN", "Mongolia", "Sain baina uu"],
    ["MO", "Macao", "&#20320;&#22909; (nei5 hou2)"],
    ["MP", "Northern Mariana Islands", "Hello"],
    ["MQ", "Martinique", "Hello"],
    ["MR", "Mauritania", "Marhaba"],
    ["MS", "Montserrat", "Hello"],
    ["MT", "Malta", "Bongu"],
    ["MU", "Mauritius", "Hello"],
    ["MV", "Maldives", "Kihineth"],
    ["MW", "Malawi", "Muribwanji"],
    ["MX", "Mexico", "Hola"],
    ["MY", "Malaysia", "Selamat"],
    ["MZ", "Mozambique", "Olá"],
    ["NA", "Namibia", "Hello"],
    ["NC", "New Caledonia", "Bozo"],
    ["NE", "Niger", "Bonjour"],
    ["NF", "Norfolk Island", "Whataway"],
    ["NG", "Nigeria", "Hello"],
    ["NI", "Nicaragua", "Hola"],
    ["NL", "Netherlands", "Hallo"],
    ["NO", "Norway", "Hallo"],
    ["NP", "Nepal", "Namaste"],
    ["NR", "Nauru", "Hello"],
    ["NU", "Niue", "Faka lofa lahi atu"],
    ["NZ", "New Zealand", "Hello"],
    ["OM", "Oman", "Marhaba"],
    ["PA", "Panama", "Hola"],
    ["PE", "Peru", "Hola"],
    ["PF", "French Polynesia", "Bonjour"],
    ["PG", "Papua New Guinea", "Hello"],
    ["PH", "Philippines", "Halo"],
    ["PK", "Pakistan", "Adaab"],
    ["PL", "Poland", "Dzień dobry"],
    ["PM", "Saint Pierre and Miquelon", "Hello"],
    ["PR", "Puerto Rico", "Hola"],
    ["PS", "Palestinian Territory", "Marhaba"],
    ["PT", "Portugal", "Olá"],
    ["PW", "Palau", "Alii"],
    ["PY", "Paraguay", "Hola"],
    ["QA", "Qatar", "Marhaba"],
    ["RE", "Reunion", "Hello"],
    ["RO", "Romania", "Salut"],
    ["RS", "Serbia", "Zdravo"],
    ["RU", "Russian Federation", "&#1047;&#1076;&#1088;&#1072;&#1074;&#1089;&#1090;&#1074;&#1091;&#1081;&#1090;&#1077; (zdrávstvujte)"],
    ["RW", "Rwanda", "Hello"],
    ["SA", "Saudi Arabia", "Marhaba"],
    ["SB", "Solomon Islands", "Hello"],
    ["SC", "Seychelles", "Hello"],
    ["SD", "Sudan", "Marhaba"],
    ["SE", "Sweden", "God dag"],
    ["SG", "Singapore", "Selamat"],
    ["SI", "Slovenia", "Živijo"],
    ["SK", "Slovakia", "Dobrý deň"],
    ["SL", "Sierra Leone", "Hello"],
    ["SM", "San Marino", "Buon giorno"],
    ["SN", "Senegal", "Bonjour"],
    ["SO", "Somalia", "Maalim wanaqsan"],
    ["SR", "Suriname", "Hallo"],
    ["ST", "Sao Tome and Principe", "Hello"],
    ["SV", "El Salvador", "Hola"],
    ["SY", "Syrian Arab Republic", "Marhaba"],
    ["SZ", "Swaziland", "Hello"],
    ["TC", "Turks and Caicos Islands", "Hello"],
    ["TD", "Chad", "Marhaba"],
    ["TG", "Togo", "Bonjour"],
    ["TH", "Thailand", "Sawatdi"],
    ["TJ", "Tajikistan", "Salom"],
    ["TK", "Tokelau", "Taloha"],
    ["TM", "Turkmenistan", "Salam"],
    ["TN", "Tunisia", "Marhaba"],
    ["TO", "Tonga", "Malo e lelei"],
    ["TR", "Turkey", "Merhaba"],
    ["TT", "Trinidad and Tobago", "Hello"],
    ["TV", "Tuvalu", "Talofa"],
    ["TW", "Taiwan", "&#20320;&#22909; (lí hó)"],
    ["TZ", "Tanzania  United Republic of", "Habari"],
    ["UA", "Ukraine", "Pryvit"],
    ["UG", "Uganda", "Habari"],
    ["UK", "United Kingdom", "Hello"],
    ["UM", "United States Minor Outlying Islands", "Hello"],
    ["US", "United States", "Hello"],
    ["UY", "Uruguay", "Hola"],
    ["UZ", "Uzbekistan", "Salom"],
    ["VA", "Holy See [Vatican City State]", "Buon giorno"],
    ["VC", "Saint Vincent and the Grenadines", "Hello"],
    ["VE", "Venezuela", "Hola"],
    ["VG", "Virgin Islands  British", "Hello"],
    ["VI", "Virgin Islands  U.S.", "Hello"],
    ["VN", "Vietnam", "Xin Chào"],
    ["VU", "Vanuatu", "Halo"],
    ["WF", "Wallis and Futuna", "Malo le kataki"],
    ["WS", "Samoa", "Talofa"],
    ["YE", "Yemen", "Marhaba"],
    ["YT", "Mayotte", "Hello"],
    ["ZA", "South Africa", "Hello"],
    ["ZM", "Zambia", "Hello"],
    ["ZW", "Zimbabwe", "Hello"],
    ["RD", "Reserved", "Hello"]
];



// transform the array into a map
let lGreetingMap: { [key: string]: { countryName: string, greeting: string } } = {};
lGreetingsArray.forEach((value: string[], index: number, array: string[][]) => { lGreetingMap[value[0]] = { countryName: value[1], greeting: value[2] } });
lGreetingsArray = [];

let lCountryCodes: string[] = Object.keys(lGreetingMap);
const lNbCountries: number = lCountryCodes.length;

//random function
function randomTo(pMaxValue: number): number {
    return Math.floor(Math.random() * pMaxValue);
}

// prepend French definite article on the country name
function buildFrenchArticleDéfini(pLabel: string): string {
    // is it plural ?
    const lSplitLabels = pLabel.split(/[\s-]+/);
    const lFirstWord = lSplitLabels[0];

    //exceptions

    // sans article
    if (["Brunéi Darussalam", "Cuba", "Mayotte", "Guam", "Chypre", "Djibouti", "Haïti", "Isra\u00ebl", "Niue", "Gibraltar", "Maurice", "Saint-Pierre-et-Miquelon", "Porto Rico", "Singapour", "El Salvador", "Trinité-et-Tobago", "Saint-Vincent-et-les-Grenadines", "Wallis-et-Futuna", "Saint-Christophe-et-Niévès"].indexOf(pLabel) > -1) {
        return " ";
    }
    // les iles
    if (["Tonga", "Samoa"].indexOf(pLabel) > -1) {
        return "les ";
    }
    // abréviations
    if (lFirstWord === "R.A.S.") {
        return "la ";
    }

    // masculin
    if (["Belize", "Chili", "Royaume", "Territoire", "Laos", "Cambodge", "Mexique", "Mozambique", "Pérou"].indexOf(lFirstWord) > -1) {
        return "le ";
    }

    // pluriel
    if (lSplitLabels.some(value => { return (["s"].indexOf(value.charAt(value.length - 1)) > -1); })) {
        return "les ";
    }

    // le retour des îles 
    if (lSplitLabels.length === 1 && ["u", "i"].indexOf(pLabel.charAt(pLabel.length - 1)) > -1) {
        return "les ";
    }

    // déja un article ?
    if (["le", "la", "les"].indexOf(lFirstWord.toLowerCase()) > -1) {
        return " ";
    }

    // commence par une voyelle
    if (["a", "e", "i", "o", "u", "é", "î"].indexOf(lFirstWord.charAt(0).toLowerCase()) > -1) {
        return "l'";
    }

    // au féminin
    if (lFirstWord.charAt(lSplitLabels[0].length - 1) === "e") {
        return "la ";
    }

    // ouf !
    return "le ";
}

// fetch greeting based on pCountryCode
interface Greetings {
    countryName: string;
    greeting: string;
}

function fetchGreetings(pCountryCode: string): Greetings {

    if (!(pCountryCode in lGreetingMap)) {
        return { countryName: "Salutations ", greeting: "Bonjour ! " };
    }

    let lGreeting = lGreetingMap[pCountryCode].greeting;

    let lCountryName = "depuis ";
    if (pCountryCode in lFrenchCountryNames) {
        let lCountryLabel = lFrenchCountryNames[pCountryCode];
        lCountryName += buildFrenchArticleDéfini(lCountryLabel) + lCountryLabel;
    } else {
        lCountryName += lGreetingMap[pCountryCode].countryName;
    }

    return { countryName: "Salutations " + lCountryName, greeting: lGreeting };
}

//test: display all entries
function testGreetings(): string {
    let lResult: string = "";
    for (let lKey of lCountryCodes) {
        let lGreeting = fetchGreetings(lKey);
        lResult += lGreeting.countryName + " : " + lGreeting.greeting + "<br>";
    }

    return lResult;
}

//example of usage
const lHelloDOMElement = document.getElementById("greeting");
if (lHelloDOMElement) {
    const lCountryIndx: number = randomTo(lNbCountries);
    let lCountryCode: string = lCountryCodes[lCountryIndx];
    let lGreeting = fetchGreetings(lCountryCode);
    lHelloDOMElement.title = lGreeting.countryName;
    lHelloDOMElement.innerHTML = lGreeting.greeting + " ! ";
    //lHelloDOMElement.innerHTML = testGreetings();
}