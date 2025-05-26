export const showAlert = (type: 'success' | 'fail', msg: string) => {
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = msg;

  document.body.appendChild(alert);
  setTimeout(hideAlert, 1500);
};

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement?.removeChild(el);
};
