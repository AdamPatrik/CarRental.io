// Basic client-side validation & demo flow (same behavior as before).
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const submitBtn = document.getElementById('submit');

  function validate() {
    const email = (emailInput.value || '').trim();
    const password = passInput.value || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) return false;
    if (!password || password.length < 6) return false;
    return true;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) {
      submitBtn.textContent = 'Check inputs';
      setTimeout(() => submitBtn.textContent = 'Log in', 1000);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';

    // simulate network / replace with actual fetch to your backend
    await new Promise(r => setTimeout(r, 800));

    // demo success
    submitBtn.textContent = 'Logged in';
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Log in';
    }, 800);
  });
});
