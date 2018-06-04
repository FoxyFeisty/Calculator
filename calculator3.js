(function() {
// Taschenrechner als JSON-Objekt erstellen
var Rechner = { "RechnerDiv" : document.querySelector("#RechnerDiv") };
// Eingabefeld belegen
Rechner.Eingabefeld = document.querySelector("#Eingabefeld");

var EinzelWert;						// Eingegebene Einzelzahl oder Komma
var Ergebnis;
var Rechenwerte = [];			// Array mit Einzelwerten
var Rechenarten = [];			// Array mit +, -, x, %

// aktuelle Eingabe aus Anzeige löschen
function wertLoeschen() {
	Rechner.Eingabefeld.innerText = '';
}

// Anzeige des eingegebenen Wertes im Eingabefeld
function Zahleingabe(EinzelZahl) {
	if (Rechner.Eingabefeld.innerHTML === "error") {
		wertLoeschen();
	}
	Rechner.Eingabefeld.innerHTML += EinzelZahl;
}
// Kommaeingabe
function Kommaeingabe(Komma) {
	if (Ergebnis != undefined) {
		Rechenwerte = [];
		Rechenarten = [];
		Rechner.Eingabefeld.innerHTML = "error";
		return
	}
	if (!Rechner.Eingabefeld.innerHTML.includes('.')) {
		Rechner.Eingabefeld.innerHTML += '.';
	}
}

// EventListener für Zahlen
var btn7 = document.querySelector("#Sieben");
btn7.addEventListener("click", function(e){ Zahleingabe(7); });
var btn8 = document.querySelector("#Acht");
btn8.addEventListener("click", function(e){ Zahleingabe(8); });
var btn9 = document.querySelector("#Neun");
btn9.addEventListener("click", function(e){ Zahleingabe(9); });
var btn4 = document.querySelector("#Vier");
btn4.addEventListener("click", function(e){ Zahleingabe(4); });
var btn5 = document.querySelector("#Fuenf");
btn5.addEventListener("click", function(e){ Zahleingabe(5); });
var btn6 = document.querySelector("#Sechs");
btn6.addEventListener("click", function(e){ Zahleingabe(6); });
var btn1 = document.querySelector("#Eins");
btn1.addEventListener("click", function(e){ Zahleingabe(1); });
var btn2 = document.querySelector("#Zwei");
btn2.addEventListener("click", function(e){ Zahleingabe(2); });
var btn3 = document.querySelector("#Drei");
btn3.addEventListener("click", function(e){ Zahleingabe(3); });
var btn0 = document.querySelector("#Null");
btn0.addEventListener("click", function(e){ Zahleingabe(0); });
// EventListener für Komma
var btnKomma = document.querySelector("#Komma");
btnKomma.addEventListener("click", function(e){ Kommaeingabe("."); });
// EventListener für Rechenarten
var btnPlus = document.querySelector("#Addition");
btnPlus.addEventListener("click", function(e){ btnPlusEvent(); });
var btnMinus = document.querySelector("#Subtraktion");
btnMinus.addEventListener("click", function(e){ btnMinusEvent(); });
var btnMal = document.querySelector("#Multiplikation");
btnMal.addEventListener("click", punktEvent);
var btnTeilen = document.querySelector("#Division");
btnTeilen.addEventListener("click", punktEvent);
// EventListener für IstGleich
var btnIstGleich = document.querySelector("#IstGleich");
btnIstGleich.addEventListener("click", function(e){ Berechnung(); });
// EventListener für Löschen
var btnLoeschen = document.querySelector("#Loeschen");
btnLoeschen.addEventListener("click", function(e) {btnLoeschenEvent(); });

// Funktion für Addition
btnPlusEvent = function() {
	EinzelWert = parseFloat(Rechner.Eingabefeld.innerText);
	Rechenwerte.push(EinzelWert);
	Rechenarten.push("+");
	wertLoeschen();
}
// Funktion für Subtraktion
btnMinusEvent = function() {
	EinzelWert = parseFloat(Rechner.Eingabefeld.innerText);
	Rechenwerte.push(EinzelWert);
	Rechenarten.push("-");
	wertLoeschen();
}
// Funktion für Mal/Geteilt
function punktEvent(evt) {
	if (Ergebnis !== undefined) {
		wertLoeschen();
		Ergebnis = undefined;
	} else {
		EinzelWert = parseFloat(Rechner.Eingabefeld.innerText);
		Rechenwerte.push(EinzelWert);
	}
	console.log(Rechenwerte);
	if (evt.target.id === "Division") {
		Rechenarten.push("/");
	} else {
		Rechenarten.push("*");
	}
	wertLoeschen();
}

// Funktion für Loeschen
btnLoeschenEvent = function() {
	Rechenwerte = [];
	Rechenarten = [];
	Rechner.Eingabefeld.innerText = '';
}
// Gesamtergebnis berechnen
function Berechnung() {
	var RechnungString = '';
	for (i = 0; i < Rechenarten.length; i++) {
		// Werte der beiden Arrays zu String zusammenfügen (wichtig: +=)
		RechnungString += Rechenwerte[i] + Rechenarten[i];
	}
	// letzten Eingabewert zu String hinzufügen (da Rechenwerte > Rechenarten)
	RechnungString += Rechner.Eingabefeld.innerText;
	// String berechnen
	Ergebnis = eval(RechnungString);
	// Ergebnis in Eingabefeld anzeigen
	Rechner.Eingabefeld.innerText = Ergebnis;
	// Arrays überschreiben; sonst Probleme bei Multiplikation/Division
	Rechenwerte = [Ergebnis];
	Rechenarten = [];

	console.log(Rechenwerte, Ergebnis);
}
})();
