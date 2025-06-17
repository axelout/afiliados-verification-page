document.addEventListener('DOMContentLoaded', () => {
    // Get the current URL's query parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract the 'id' and 'token' parameters
    const citizenId = urlParams.get('id');
    const token = urlParams.get('token');
    
    // Get references to the HTML elements
    const messageElement = document.getElementById('message');
    const idInput = document.getElementById('citizen-id');
    const tokenInput = document.getElementById('verification-token');
    const verifyButton = document.getElementById('verify-button');
    const form = document.getElementById('verify-form'); // Get form reference

    // Check if all elements and parameters exist
    if (citizenId && token && idInput && tokenInput && form && messageElement && verifyButton) {
        // Populate the hidden input fields
        idInput.value = citizenId;
        tokenInput.value = token;
        console.log('ID and Token populated in form.');

        // Nueva lógica: POST vía fetch al hacer clic
        verifyButton.onclick = async (e) => {
            e.preventDefault();
            verifyButton.disabled = true;
            messageElement.textContent = 'Verificando...';
            messageElement.style.color = '';
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = '';
            const formData = new FormData();
            formData.append('id', citizenId);
            formData.append('token', token);
            try {
                const response = await fetch('https://qknogktmkyxytzrxqkfb.supabase.co/functions/v1/verify-number', {
                    method: 'POST',
                    body: formData
                });
                const text = await response.text();
                resultDiv.textContent = text;
                if (response.ok) {
                    resultDiv.style.color = 'green';
                    messageElement.textContent = '¡Verificación completada!';
                } else {
                    resultDiv.style.color = 'red';
                    messageElement.textContent = 'No se pudo verificar el número.';
                }
            } catch (err) {
                resultDiv.textContent = 'Error de red o del servidor.';
                resultDiv.style.color = 'red';
                messageElement.textContent = 'No se pudo verificar el número.';
            }
            verifyButton.disabled = false;
        };
    } else {
        // Handle missing parameters or elements - disable form/button and show error
        if (messageElement) {
             messageElement.textContent = 'Error: Enlace de verificación inválido o incompleto.';
             messageElement.style.color = 'red';
        }
        if (verifyButton) {
            verifyButton.disabled = true;
            verifyButton.style.backgroundColor = '#ccc'; // Indicate disabled state
            verifyButton.style.cursor = 'default';
        }
        console.error('Error: Missing ID/Token in URL or required form elements not found.');
    }
});
