// Function to validate individual form fields
function validate(obj) {
    const errorElement = document.getElementById(obj.id + '-error');
    let isValid = true;
    let errorMessage = '';

    // Reset error styling
    obj.style.borderColor = '';
    errorElement.textContent = '';

    if (obj.value.trim() === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else {
        switch (obj.id) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(obj.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'password':
                if (obj.value.length < 8) {
                    isValid = false;
                    errorMessage = 'Password must be at least 8 characters long';
                }
                break;
            case 'confirm-password':
                const password = document.getElementById('password').value;
                if (obj.value !== password) {
                    isValid = false;
                    errorMessage = 'Passwords do not match';
                }
                break;
        }
    }

    if (!isValid) {
        obj.style.borderColor = 'red';
        errorElement.textContent = errorMessage;
    }

    return isValid;
}

// Function to validate the entire form
function validateForm(event) {
    event.preventDefault();
    const fields = ['username', 'email', 'password', 'confirm-password'];
    let isValid = true;

    fields.forEach(field => {
        if (!validate(document.getElementById(field))) {
            isValid = false;
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
        // Here you would typically submit the form to the server
    }
}

// Add event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    if (form) {
        form.addEventListener('submit', validateForm);

        const fields = ['username', 'email', 'password', 'confirm-password'];
        fields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('focusout', function() {
                    validate(this);
                });
            }
        });
    }
});