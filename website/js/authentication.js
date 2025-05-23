// authentication.js
// Handles Supabase authentication logic for Stira auth pages.
// Plain JS: no import/export, no import.meta.env

// ---- PUT YOUR KEYS HERE (these are public anyway for client-side apps) ----
const SUPABASE_URL = 'https://yfhzcvikolcbgbaopyrj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmaHpjdmlrb2xjYmdiYW9weXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MDIwNDIsImV4cCI6MjA2Mjk3ODA0Mn0.u4r_RWjIoJiv-flUZySWIKA-tJsaCd1tN5S_yGa0h3s';
// --------------------------------------------------------------------------

function getSupabaseClient() {
  if (!window.supabase) {
    console.error('Supabase library not loaded!');
    showError('Signup error: Supabase not loaded. Please refresh the page.', 'signup-error-msg');
    throw new Error('Supabase not loaded');
  }
  return window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// SIGN UP LOGIC
async function signUpWithEmail(email, password, name) {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
      emailRedirectTo: "http://127.0.0.1:5500/website/confirm-account.html"
    }
  });

  return { data, error };
}


// SIGN IN LOGIC
async function signInWithEmail(email, password) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// Attach all auth form handlers after DOM is loaded

// Function to set form loading state
function setFormLoading(form, isLoading) {
  const button = form.querySelector('button[type="submit"]');
  if (!button) return;
  
  const buttonText = button.querySelector('.button-text');
  const buttonLoader = button.querySelector('.button-loader');
  
  if (isLoading) {
    button.disabled = true;
    if (buttonText) buttonText.textContent = 'Please wait...';
    if (buttonLoader) buttonLoader.style.display = 'inline-block';
  } else {
    button.disabled = false;
    if (buttonText) buttonText.textContent = button.dataset.originalText || 'Continue';
    if (buttonLoader) buttonLoader.style.display = 'none';
  }
}

// Function to handle form submission
async function handleAuthFormSubmit(e) {
  console.log('Auth form submit triggered.');
  e.preventDefault();
  const form = e.target;
  const formId = form.id || '';
  const isSignUp = formId.includes('signup') || window.location.pathname.includes('signup');
  const isSignIn = formId.includes('signin') || window.location.pathname.includes('signin');

  const isResetPassword = window.location.pathname.includes('reset-password');

  // Set loading state
  setFormLoading(form, true);
  
  // Save original button text if not already saved
  const button = form.querySelector('button[type="submit"]');
  if (button && !button.dataset.originalText) {
    const buttonText = button.querySelector('.button-text');
    if (buttonText) {
      button.dataset.originalText = buttonText.textContent;
    }
  }

  try {
    // Handle password reset
    if (isResetPassword) {
      const email = form.querySelector('input[name="email"]').value.trim();
      if (!email) {
        showError('Please enter your email address.');
        return;
      }
      
      const supabase = getSupabaseClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password.html`
      });
      
      if (error) throw error;
      window.location.href = 'check-email.html';
      return;
    }

    // Handle sign up (only require name if present)
    if (isSignUp) {
        console.log('Signup mode detected.');
      const nameInput = form.querySelector('input[name="name"]');
      const name = nameInput ? nameInput.value.trim() : undefined;
      const email = form.querySelector('input[name="email"]').value.trim();
      const password = form.querySelector('input[name="password"]').value;
      
      if ((nameInput && !name) || !email || !password) {
        showError('Please fill in all fields.');
        return;
      }
      
      console.log('Attempting signup with:', { email, name });
      const { error } = await signUpWithEmail(email, password, name);
      if (error) {
        console.error('Signup error:', error);
        // Supabase returns a specific error for existing users
        if (error.message && error.message.toLowerCase().includes('user already registered')) {
          showError('An account with this email already exists. Please sign in or reset your password.', 'signup-error-msg');
        } else if (error.message && error.message.toLowerCase().includes('duplicate key value')) {
          showError('An account with this email already exists. Please sign in or reset your password.', 'signup-error-msg');
        } else {
          showError(error.message || 'Signup failed.', 'signup-error-msg');
        }
        return;
      }
      window.location.href = 'check-email.html';
      return;
    }

    // Handle sign in
    if (isSignIn) {
      const email = form.querySelector('input[name="email"]').value.trim();
      const password = form.querySelector('input[name="password"]').value;
      
      if (!email || !password) {
        showError('Please enter both email and password.');
        return;
      }
      
      const { error } = await signInWithEmail(email, password);
      if (error) throw error;
      
      // Redirect to dashboard or home page after successful sign in
      window.location.href = 'index.html';
      return;
    }
  } catch (error) {
    console.error('Auth error:', error);
    showError(error.message || 'An error occurred. Please try again.');
  } finally {
    // Reset loading state
    setFormLoading(form, false);
  }
}

// --- Navbar Animations for Auth Pages ---
(function() {
  // Navbar shadow on scroll
  const navbar = document.querySelector('.auth-navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 8) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Animate underline for nav links/buttons (handled in CSS)
})();

// Helper function to show error messages
function showError(message, elementId = 'signin-error-msg') {
  // Try to find error element by ID first, then by class if ID not found
  let errorElement = document.getElementById(elementId);
  if (!errorElement) {
    // Try to find any error message element in the current form
    const form = document.activeElement?.form || document.querySelector('form');
    if (form) {
      errorElement = form.querySelector('.error-message, [id$="-error-msg"]');
    }
  }
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }, 5000);
  } else {
    // Fallback to alert if no error element found
    alert(message);
  }
}

// Initialize auth forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find all auth forms on the page
  const authForms = document.querySelectorAll('.auth-form');
  
  // Add submit event listeners to all auth forms
  authForms.forEach(form => {
    // Add submit handler
    form.addEventListener('submit', handleAuthFormSubmit);
    
    // Add input event listeners to clear error messages when user types
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const errorMsg = form.querySelector('.error-message, [id$="-error-msg"]');
        if (errorMsg && errorMsg.style.display !== 'none') {
          errorMsg.style.display = 'none';
        }
      });
    });
  });
  
  // No Supabase onAuthStateChange for v2 UMD; skip this block
});
