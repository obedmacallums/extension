chrome.commands.onCommand.addListener((command) => {
    if (command === "show-alert") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: showAlertWithSelectedText
            });
        });
    }
});

function showAlertWithSelectedText() {
    const selectedText = window.getSelection().toString();

    function transformText(text) {
        return text.replace(/_/g, ' ').toUpperCase();
    }

    if (selectedText) {
        navigator.clipboard.writeText(transformText(selectedText))
            .then(() => {
                console.log('Texto copiado al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar texto: ', err);
            });
    } else {
        alert("No hay texto seleccionado.");
    }
}



