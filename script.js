// 1. Navigation Logic
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active-section'));
    const section = document.getElementById(sectionId);
    if (section) section.classList.add('active-section');
}

// 2. Modal Toggle
function toggleModal(show) {
    document.getElementById('loginModal').style.display = show ? 'flex' : 'none';
}

// 3. Expense Form Validation & Calculation
const expenseForm = document.getElementById('expense-form');

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const desc = document.getElementById('expense-desc');
    const amount = document.getElementById('total-amount');
    const people = document.getElementById('num-people');
    const errorMsg = document.getElementById('error-msg');

    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/; // Only letters and spaces
    const numberRegex = /^\d+(\.\d{1,2})?$/;        // Positive numbers, max 2 decimals
    const integerRegex = /^[1-9]\d*$/;             // Positive integers

    // Reset errors
    errorMsg.innerText = "";
    [desc, amount, people].forEach(i => i.style.borderColor = "#ddd");

    // Validate Name
    if (!nameRegex.test(desc.value.trim())) {
        desc.style.borderColor = "red";
        errorMsg.innerText = "Expense Name must contain letters only!";
        return;
    }

    // Validate Amount
    if (!numberRegex.test(amount.value.trim()) || parseFloat(amount.value) <= 0) {
        amount.style.borderColor = "red";
        errorMsg.innerText = "Amount must be a positive number (max 2 decimals)!";
        return;
    }

    // Validate People
    if (!integerRegex.test(people.value.trim())) {
        people.style.borderColor = "red";
        errorMsg.innerText = "Number of People must be a positive whole number!";
        return;
    }

    // Calculation
    const perPerson = (parseFloat(amount.value) / parseInt(people.value)).toFixed(2);
    document.getElementById('result-area').innerHTML = `
        <div class="result-box">
            <h4>${desc.value.trim()}</h4>
            <h2>$${perPerson} <span>/ person</span></h2>
            <button type="button" id="clear-btn" class="btn-clear">Clear</button>
        </div>
    `;

    // Clear button
    document.getElementById('clear-btn').addEventListener('click', () => {
        expenseForm.reset();
        document.getElementById('result-area').innerHTML = '<div class="placeholder-text">Enter details to see results...</div>';
        [desc, amount, people].forEach(i => i.style.borderColor = "#ddd");
        errorMsg.innerText = "";
    });
});

// 4. Gmail Login Validation
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('login-email');
    const email = emailInput.value.trim();

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    const authError = document.getElementById('auth-error');
    authError.innerText = "";
    emailInput.style.borderColor = "#ddd";

    if (!gmailRegex.test(email)) {
        emailInput.style.borderColor = "red";
        authError.innerText = "Enter a valid @gmail.com email!";
        return;
    }

    alert("Success! Welcome to SplitWise Pro.");
    toggleModal(false);
    emailInput.value = "";
});