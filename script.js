const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const avatarImg = document.getElementById('avatarImg');
const avatarInstructions = document.getElementById('avatarInstructions');
const removeAvatarBtn = document.getElementById('removeAvatar');
const changeAvatarBtn = document.getElementById('changeAvatar');
const avatarError = document.getElementById('avatarError');
const ticketForm = document.getElementById('ticketForm');
const ticketSection = document.getElementById('ticketSection');

let avatarDataUrl = '';

function showAvatar(file) {
  if (!file) return;
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    avatarError.textContent = 'Only JPG or PNG allowed.';
    return;
  }
  if (file.size > 500 * 1024) {
    avatarError.textContent = 'File too large. Please upload a photo under 500KB.';
    return;
  }
  avatarError.textContent = '';
  const reader = new FileReader();
  reader.onload = function(e) {
    avatarImg.src = e.target.result;
    avatarImg.style.display = 'block';
    avatarInstructions.style.display = 'none';
    removeAvatarBtn.style.display = 'inline-block';
    changeAvatarBtn.style.display = 'inline-block';
    avatarDataUrl = e.target.result;
  };
  reader.readAsDataURL(file);
}

avatarInput.addEventListener('change', (e) => {
  if (e.target.files[0]) showAvatar(e.target.files[0]);
});

removeAvatarBtn.addEventListener('click', () => {
  avatarImg.src = '';
  avatarImg.style.display = 'none';
  avatarInstructions.style.display = 'block';
  removeAvatarBtn.style.display = 'none';
  changeAvatarBtn.style.display = 'none';
  avatarInput.value = '';
  avatarDataUrl = '';
});

changeAvatarBtn.addEventListener('click', () => {
  avatarInput.click();
});

// Drag & drop
const avatarDrop = document.getElementById('avatarDrop');
avatarDrop.addEventListener('dragover', (e) => {
  e.preventDefault();
  avatarDrop.style.borderColor = '#ff7e5f';
});
avatarDrop.addEventListener('dragleave', (e) => {
  avatarDrop.style.borderColor = '#6c4ad2';
});
avatarDrop.addEventListener('drop', (e) => {
  e.preventDefault();
  avatarDrop.style.borderColor = '#6c4ad2';
  if (e.dataTransfer.files[0]) showAvatar(e.dataTransfer.files[0]);
});

// Form submit
ticketForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Validate email
  const email = document.getElementById('email').value.trim();
  const emailError = document.getElementById('emailError');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    return;
  } else {
    emailError.textContent = '';
  }
  // Validate avatar
  if (!avatarDataUrl) {
    avatarError.textContent = 'Please upload your avatar.';
    return;
  }
  avatarError.textContent = '';

  // Fill ticket info
  document.getElementById('ticketName').textContent = document.getElementById('fullName').value;
  document.getElementById('ticketEmail').textContent = email;
  document.getElementById('ticketUser').textContent = document.getElementById('fullName').value;
  document.getElementById('ticketGithub').textContent = document.getElementById('github').value;
  document.getElementById('ticketAvatar').src = avatarDataUrl;

  ticketForm.style.display = 'none';
  ticketSection.style.display = 'block';
});