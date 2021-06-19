var ApiService = (function(){
    return {
        getAndamentoNazionale: async function () {
            try {
            let readableObject = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json', { method: 'GET' });
            let json = await readableObject.json();
            return json;
            } catch (e) {
                console.log('Errore: ' + e);
            }
        },
        getAndamentoRegioni: async function () {
            try {
                let readableObject = await fetch ('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni-latest.json', { method: 'GET' });
                let json = await readableObject.json();
                return json; 
            } catch (e) {
                console.log('Errore: ' + e);
            }
        }
    }
}());

