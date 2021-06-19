// andamento generale in Italia
ApiService.getAndamentoNazionale().then(function(data){
    const COVID_NAT_DATA = data[0];
    const totCasi = document.getElementById("totale-casi")
    const totPos = document.getElementById("totale-positivi")
    const dimessiGuariti = document.getElementById("dimessi-guariti")
    const deceduti = document.getElementById("deceduti")

    getStatsDate(COVID_NAT_DATA);

    totCasi.innerHTML = `TOTALE CASI: ${COVID_NAT_DATA.totale_casi}`;
    totPos.innerHTML = `TOTALE POSITIVI: ${COVID_NAT_DATA.totale_positivi}`;
    dimessiGuariti.innerHTML = `DIMESSI GUARITI: ${COVID_NAT_DATA.dimessi_guariti}`;
    deceduti.innerHTML = `DECEDUTI: ${COVID_NAT_DATA.deceduti}`;

    getTamponi(COVID_NAT_DATA);
});


const getStatsDate = COVID_NAT_DATA => {
    // set browser title
    document.title += ' ' + convertDate(COVID_NAT_DATA.data);

    const dateDiv = document.getElementById("date");
    const currentDate = document.createElement("h3");
    currentDate.innerHTML = `<small class="text-muted font-weight-light">Aggiornato al ${convertDate(COVID_NAT_DATA.data)}</small>`;
    dateDiv.append(currentDate);
}


const getTamponi = COVID_NAT_DATA => {
        const totTamponi = document.getElementById("totale-tamponi")
        const tampMolecolari = document.getElementById("tamponi-molec")
        const tampRapido = document.getElementById("tamponi-rapido")
        const totPositiviMolec = document.getElementById("totale-pos-molec")
        const totPosRapido = document.getElementById("totale-pos-rapido")
    
        totTamponi.innerHTML = `TOTALE TAMPONI: ${COVID_NAT_DATA.tamponi}`;
        tampMolecolari.innerHTML = `TOTALE TAMPONI MOLECOLARI: ${COVID_NAT_DATA.tamponi_test_molecolare}`;
        tampRapido.innerHTML = `TOTALE TAMPONI RAPIDI: ${COVID_NAT_DATA.tamponi_test_antigenico_rapido}`;
        totPositiviMolec.innerHTML = `TOTALE POSITIVI TAMPONE MOLECOLARE: ${COVID_NAT_DATA.totale_positivi_test_molecolare}`;
        totPosRapido.innerHTML = `TOTALE POSITIVI TAMPONE RAPIDO: ${COVID_NAT_DATA.totale_positivi_test_antigenico_rapido}`;
}



// print lista regioni e print details
ApiService.getAndamentoRegioni().then(function(regioni){
    const selectRegioni = document.getElementById("sel-regioni");
    regioni.forEach(regione => {
        const optionRegione = document.createElement("option");
        optionRegione.value = regione.codice_regione;
        optionRegione.innerHTML = regione.denominazione_regione;
        selectRegioni.append(optionRegione);
    });

      getRegionDetails(selectRegioni, regioni);
});



const getRegionDetails = (selectRegioni, regioni) => {
    selectRegioni.addEventListener('change', (event) => {
        const regionId = document.getElementById("sel-regioni").value;
        const regDetailsDiv = document.getElementById("reg-details");
        regDetailsDiv.innerHTML = "";

        for(let regione of regioni) {
            if(regione.hasOwnProperty("codice_regione")) {
                if(regione.codice_regione == regionId) {
                    regDetailsDiv.innerHTML = displayRegionInfo(regione);
                }
            }
        }
      });
}


// print info per regione specificata
function displayRegionInfo(regione) {
    return `
        <div class="text-justify mt-2 region-details">
            <h4>${regione.denominazione_regione}</h4>
            
            <div>
                <b>Totale Casi</b>: ${regione.totale_casi};
            </div>
            <div>
                <b>Totale Positivi</b>: ${regione.totale_positivi};
            </div>
            <div>
                <b>Dimessi Guariti</b>: ${regione.dimessi_guariti};
            </div>
            <div>
                <b>Deceduti</b>: ${regione.deceduti};
            </div>
            <div>
                <b>Tamponi</b>: ${regione.tamponi};
            </div>
        </div>
    `;
}