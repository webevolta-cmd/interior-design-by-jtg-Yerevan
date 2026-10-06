/**
 * Progressive enhancement for the Netlify forms:
 * inline validation, conditional fields, file checks, AJAX submission with
 * loading / success / error states, and simple bot traps (honeypot + timing).
 * Without JavaScript the forms post normally and Netlify redirects to /thank-you/.
 */

const PHONE_RE = /^[+()\-\s\d]{6,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2500;

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const messages = {
  required: 'This field is required.',
  name: 'Please enter your full name.',
  email: 'Please enter a valid email address, e.g. name@example.com.',
  phone: 'Please enter a valid phone number, including the country code if outside Armenia.',
  choice: 'Please choose one option.',
  consent: 'Please confirm that we may contact you.',
  minlength: (n: number) => `Please write at least ${n} characters.`,
  fileType: 'Please attach a JPG, PNG, WEBP, HEIC or PDF file.',
  fileSize: (mb: number) => `The file is larger than ${mb} MB. Please attach a smaller file or send it by email.`,
};

function errorEl(form: HTMLFormElement, name: string) {
  return form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
}

function setError(form: HTMLFormElement, field: Field, message: string | null) {
  const wrap = field.closest('.field');
  const err = errorEl(form, field.name);
  const group = field.type === 'radio' ? form.querySelectorAll<HTMLInputElement>(`[name="${field.name}"]`) : [field];
  group.forEach((el) => (message ? el.setAttribute('aria-invalid', 'true') : el.removeAttribute('aria-invalid')));
  wrap?.classList.toggle('has-error', !!message);
  if (err) err.textContent = message ?? '';
}

function validateField(form: HTMLFormElement, field: Field): string | null {
  if (field.disabled || field.closest('[hidden]')) return null;
  const value = 'value' in field ? field.value.trim() : '';

  if (field instanceof HTMLInputElement && field.type === 'radio') {
    if (!field.required) return null;
    const checked = form.querySelector(`[name="${field.name}"]:checked`);
    return checked ? null : messages.choice;
  }
  if (field instanceof HTMLInputElement && field.type === 'checkbox') {
    if (!field.required) return null;
    return field.checked ? null : messages.consent;
  }
  if (field instanceof HTMLInputElement && field.type === 'file') {
    const file = field.files?.[0];
    if (!file) return null;
    const maxMb = Number(field.dataset.maxMb || 8);
    const okType = /^(image\/(jpeg|png|webp|heic|heif)|application\/pdf)$/.test(file.type) || /\.(jpe?g|png|webp|heic|heif|pdf)$/i.test(file.name);
    if (!okType) return messages.fileType;
    if (file.size > maxMb * 1024 * 1024) return messages.fileSize(maxMb);
    return null;
  }
  if (field.required && !value) return field.name === 'name' ? messages.name : messages.required;
  if (!value) return null;
  if (field instanceof HTMLInputElement && field.type === 'email' && !EMAIL_RE.test(value)) return messages.email;
  if (field.dataset.validate === 'phone' && (!PHONE_RE.test(value) || value.replace(/\D/g, '').length < 6)) return messages.phone;
  const min = Number(field.getAttribute('minlength') || 0);
  if (min && value.length < min) return field.name === 'name' ? messages.name : messages.minlength(min);
  return null;
}

function fieldsOf(form: HTMLFormElement): Field[] {
  return [...form.querySelectorAll<Field>('input:not([type="hidden"]), select, textarea')].filter(
    (f) => !f.closest('.hp'),
  );
}

function initConditional(form: HTMLFormElement) {
  const blocks = [...form.querySelectorAll<HTMLElement>('[data-show-when]')];
  if (!blocks.length) return;
  const update = () => {
    blocks.forEach((block) => {
      const [name, values] = (block.dataset.showWhen || '').split('=');
      const allowed = values.split('|');
      const controls = form.querySelectorAll<HTMLInputElement | HTMLSelectElement>(`[name="${name}"]`);
      let current = '';
      controls.forEach((c) => {
        if (c instanceof HTMLSelectElement) current = c.value;
        else if ((c as HTMLInputElement).checked) current = c.value;
      });
      const show = allowed.includes(current);
      block.classList.toggle('is-shown', show);
      block.querySelectorAll<Field>('input, select, textarea').forEach((f) => (f.disabled = !show));
    });
  };
  form.addEventListener('change', update);
  update();
}

function initFileInputs(form: HTMLFormElement) {
  form.querySelectorAll<HTMLElement>('[data-file]').forEach((box) => {
    const input = box.querySelector<HTMLInputElement>('input[type="file"]');
    const text = box.querySelector<HTMLElement>('[data-file-text]');
    if (!input || !text) return;
    const original = text.innerHTML;
    const render = () => {
      const file = input.files?.[0];
      if (file) {
        const size = file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(file.size / 1024)} KB`;
        text.innerHTML = '';
        const name = document.createElement('span');
        name.className = 'file__name';
        name.textContent = file.name;
        text.append(name, document.createTextNode(` · ${size}`));
      } else text.innerHTML = original;
      setError(form, input, validateField(form, input));
    };
    input.addEventListener('change', render);
    ['dragenter', 'dragover'].forEach((t) => box.addEventListener(t, () => box.classList.add('is-dragover')));
    ['dragleave', 'drop'].forEach((t) => box.addEventListener(t, () => box.classList.remove('is-dragover')));
  });
}

async function submit(form: HTMLFormElement) {
  const data = new FormData(form);
  // Remove empty optional file inputs — Netlify rejects empty file parts.
  const file = data.get('attachment');
  if (file instanceof File && !file.name && file.size === 0) data.delete('attachment');

  const multipart = form.dataset.formEncoding === 'multipart';
  const body = multipart ? data : new URLSearchParams(data as unknown as Record<string, string>).toString();
  const headers: Record<string, string> = multipart ? {} : { 'Content-Type': 'application/x-www-form-urlencoded' };
  const res = await fetch('/', { method: 'POST', headers, body });
  if (!res.ok) throw new Error(`Form submission failed with ${res.status}`);
}

export function initForms() {
  document.querySelectorAll<HTMLFormElement>('[data-form]').forEach((form) => {
    const wrap = form.closest<HTMLElement>('[data-form-wrap]');
    const success = wrap?.querySelector<HTMLElement>('[data-form-success]');
    const alert = form.querySelector<HTMLElement>('[data-form-alert]');
    const btn = form.querySelector<HTMLButtonElement>('[data-submit]');
    const btnLabel = form.querySelector<HTMLElement>('[data-submit-label]');
    const originalLabel = btnLabel?.textContent ?? '';
    const renderedAt = Date.now();
    let touched = false;

    initConditional(form);
    initFileInputs(form);

    fieldsOf(form).forEach((field) => {
      const evt = field instanceof HTMLSelectElement || field.type === 'radio' || field.type === 'checkbox' ? 'change' : 'blur';
      field.addEventListener(evt, () => {
        touched = true;
        setError(form, field, validateField(form, field));
      });
      field.addEventListener('input', () => {
        if (field.closest('.field')?.classList.contains('has-error')) setError(form, field, validateField(form, field));
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      alert?.classList.remove('is-visible');

      let firstInvalid: Field | null = null;
      const seen = new Set<string>();
      for (const field of fieldsOf(form)) {
        if (field.type === 'radio' && seen.has(field.name)) continue;
        seen.add(field.name);
        const msg = validateField(form, field);
        setError(form, field, msg);
        if (msg && !firstInvalid) firstInvalid = field;
      }
      if (firstInvalid) {
        firstInvalid.focus({ preventScroll: false });
        firstInvalid.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      const honeypot = form.querySelector<HTMLInputElement>('.hp input');
      const looksAutomated = (honeypot && honeypot.value !== '') || (!touched && Date.now() - renderedAt < MIN_FILL_MS);

      form.classList.add('is-sending');
      form.setAttribute('aria-busy', 'true');
      if (btn) btn.disabled = true;
      if (btnLabel) btnLabel.textContent = 'Sending…';

      try {
        if (!looksAutomated) await submit(form);
        form.hidden = true;
        if (success) {
          success.classList.add('is-visible');
          const title = success.querySelector<HTMLElement>('[data-success-title]');
          title?.focus();
          success.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        form.reset();
      } catch {
        alert?.classList.add('is-visible');
        alert?.focus?.();
      } finally {
        form.classList.remove('is-sending');
        form.removeAttribute('aria-busy');
        if (btn) btn.disabled = false;
        if (btnLabel) btnLabel.textContent = originalLabel;
      }
    });
  });
}
