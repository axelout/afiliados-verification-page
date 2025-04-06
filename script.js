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

        // Optional: You could add a check here to see if the form action is correct, 
        // but it's set in the HTML already.
        // console.log('Form action:', form.action); 

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
