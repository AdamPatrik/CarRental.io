// Simple client-side behavior for the login form.
// For demo purposes this file simulates a backend response.
// Replace the `fakeLoginRequest` call with a real fetch to your API.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const submitBtn = document.getElementById('submit');
  const toggleBtn = document.getElementById('toggle-password');
  const formMessage = document.getElementById('form-message');
  const emailError = document.getElementById('email-error');
  const passwordError = document.getElementById('password-error');

  toggleBtn.addEventListener('click', () => {
    const isHidden = passInput.type === 'password';
    passInput.type = isHidden ? 'text' : 'password';
    toggleBtn.textContent = isHidden ? 'Hide' : 'Show';
    toggleBtn.setAttribute('aria-pressed', String(!isHidden));
  });

  function validate() {
    let ok = true;
    emailError.textContent = '';
    passwordError.textContent = '';
    formMessage.textContent = '';

    const email = emailInput.value.trim();
    const password = passInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      emailError.textContent = 'Please enter a valid email';
      ok = false;
    }
    if (!password || password.length < 6) {
      passwordError.textContent = 'Password must be at least 6 characters';
      ok = false;
    }
    return ok;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';
    formMessage.textContent = '';

    const payload = {
      email: emailInput.value.trim(),
      password: passInput.value,
      remember: document.getElementById('remember').checked
    };

    try {
      // Replace this with: await fetch('/api/login', { method: 'POST', body: JSON.stringify(payload) })
      const res = await fakeLoginRequest(payload);

      if (res.ok) {
        // store token (example). For real apps use secure, HttpOnly cookies when possible.
        localStorage.setItem('authToken', res.token);
        formMessage.style.color = 'green';
        formMessage.textContent = 'Signed in — redirecting...';
        // Simulate redirect to protected page
        setTimeout(() => {
          window.location.href = '/dashboard.html';
        }, 800);
      } else {
        formMessage.style.color = '';
        formMessage.textContent = res.error || 'Invalid credentials';
      }
    } catch (err) {
      formMessage.style.color = '';
      formMessage.textContent = 'Network error, please try again.';
      // console.error(err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }
  });

  // Demo-only fake login:
  function fakeLoginRequest({ email, password }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // demo credentials:
        if (email === 'user@example.com' && password === 'password123') {
          resolve({ ok: true, token: 'fake-jwt-token-123' });
        } else {
          resolve({ ok: false, error: 'Email or password is incorrect' });
        }
      }, 700);
    });
  }
});
