// Armazenamento de Localizações
function salvarLocalizacao(localizacao) {
    const locais = JSON.parse(localStorage.getItem('locations') || '[]');
    locais.push(localizacao);
    localStorage.setItem('locations', JSON.stringify(locais));
}

function carregarLocalizacoes() {
    return JSON.parse(localStorage.getItem('locations') || '[]');
}

function limparLocalizacoes() {
    localStorage.removeItem('locations');
    location.reload();
}