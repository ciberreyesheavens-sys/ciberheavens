/* =========================================================
   CONFIGURACIÓN  <-- EDITA SOLO ESTA SECCIÓN
   ========================================================= */

// Tu número de WhatsApp: código de país + número, SOLO dígitos, sin "+" ni espacios.
// México: "52" + 10 dígitos. Si algún día el chat no abre, prueba con "521" + 10 dígitos.
const WHATSAPP_NUMBER = "525627022347";

// Nombre del negocio (se actualiza en el logo, el footer y los mensajes).
// También cambia el <title> y las etiquetas meta de index.html.
const BUSINESS_NAME = "Ciber Heavens Los Reyes";

// Mensaje por defecto de los botones "Cotizar por WhatsApp".
const DEFAULT_MESSAGE = "Hola, quiero cotizar un servicio.";

/* =========================================================
   A PARTIR DE AQUÍ NO ES NECESARIO EDITAR
   ========================================================= */

/* ---------- Utilidades ---------- */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

function getWhatsappDigits() {
  return String(WHATSAPP_NUMBER).replace(/\D/g, "");
}

// Es válido cuando ya reemplazaste las "X" por tu número real.
function isWhatsappConfigured() {
  return /^\d{11,15}$/.test(getWhatsappDigits());
}

function buildWhatsappUrl(text) {
  return "https://wa.me/" + getWhatsappDigits() + "?text=" + encodeURIComponent(text);
}

// Da formato de lectura: 5512345678 -> 55 1234 5678
function formatLocalNumber(digits) {
  const local = digits.slice(-10);
  return local.slice(0, 2) + " " + local.slice(2, 6) + " " + local.slice(6);
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4200);
}

/* ---------- Datos del negocio (nombre, WhatsApp, año, mapa) ---------- */
function initBusinessData() {
  // Nombre e inicial del logo
  $$("[data-biz-name]").forEach((el) => { el.textContent = BUSINESS_NAME; });
  $$("[data-biz-initial]").forEach((el) => {
    el.textContent = BUSINESS_NAME.trim().charAt(0).toUpperCase() || "N";
  });

  // Año del copyright
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  // Enlaces de WhatsApp: cada uno puede llevar su propio mensaje en data-wa-msg
  const configured = isWhatsappConfigured();
  $$("[data-wa]").forEach((link) => {
    const message = link.dataset.waMsg || DEFAULT_MESSAGE;
    link.href = buildWhatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener";

    if (!configured) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Falta configurar tu número: edita WHATSAPP_NUMBER en js/script.js");
      });
    }
  });

  // Número visible (si ya está configurado)
  if (configured) {
    $$("[data-wa-display]").forEach((el) => {
      el.textContent = formatLocalNumber(getWhatsappDigits());
      el.classList.remove("ph", "ph--dark");
    });
  } else {
    console.warn("[Sitio] WHATSAPP_NUMBER todavía tiene el valor de ejemplo. Edita js/script.js.");
  }

  // Botón "Ver en Google Maps": usa el texto de la dirección
  const addressEl = $("[data-address]");
  $$("[data-maps]").forEach((link) => {
    const address = addressEl ? addressEl.textContent.trim() : "";
    const isPlaceholder = !address || address.indexOf("[") !== -1;

    if (isPlaceholder) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("Escribe primero tu dirección en la sección de contacto.");
      });
    } else {
      link.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(address);
    }
  });
}

/* ---------- Navbar: cambia de apariencia al hacer scroll ---------- */
function initHeaderScroll() {
  const header = $("#site-header");
  if (!header) return;

  let ticking = false;
  const update = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
}

/* ---------- Menú móvil (hamburguesa) ---------- */
function initMobileMenu() {
  const header = $("#site-header");
  const toggle = $(".nav-toggle");
  const nav = $("#site-nav");
  if (!header || !toggle || !nav) return;

  const desktop = window.matchMedia("(min-width: 900px)");

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Cierra al elegir una opción
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  // Cierra con Escape y devuelve el foco al botón
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  // Cierra al hacer clic fuera del menú
  document.addEventListener("click", (event) => {
    if (toggle.getAttribute("aria-expanded") === "true" && !header.contains(event.target)) {
      setOpen(false);
    }
  });

  // Cierra si la pantalla pasa a tamaño escritorio
  const onChange = (event) => { if (event.matches) setOpen(false); };
  if (desktop.addEventListener) desktop.addEventListener("change", onChange);
  else desktop.addListener(onChange);
}

/* ---------- Resalta en el menú la sección visible ---------- */
function initScrollSpy() {
  if (!("IntersectionObserver" in window)) return;

  // sección -> enlace del menú que debe resaltarse
  const map = {
    inicio: "inicio",
    servicios: "servicios",
    proceso: "servicios",
    nosotros: "nosotros",
    galeria: "nosotros",
    testimonios: "nosotros",
    contacto: "contacto"
  };
  const links = $$(".nav-list a");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = map[entry.target.id];
      links.forEach((link) => {
        if (link.getAttribute("href") === "#" + target) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  Object.keys(map).forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}

/* ---------- Aparición suave al hacer scroll ---------- */
function initReveal() {
  const items = $$(".reveal");
  if (!items.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  // Pequeño escalonado entre elementos hermanos
  const counts = new Map();
  items.forEach((el) => {
    const parent = el.parentElement;
    const n = counts.get(parent) || 0;
    el.style.setProperty("--d", Math.min(n * 70, 280) + "ms");
    counts.set(parent, n + 1);
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  items.forEach((el) => observer.observe(el));
}

/* ---------- Formulario -> WhatsApp ---------- */
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  const fields = {
    name: { input: $("#f-name"), error: $("#e-name") },
    phone: { input: $("#f-phone"), error: $("#e-phone") },
    service: { input: $("#f-service"), error: $("#e-service") },
    message: { input: $("#f-message"), error: $("#e-message") }
  };
  const status = $("#form-status");

  function validate(values) {
    const errors = {};

    if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]{1,59}$/u.test(values.name)) {
      errors.name = "Escribe tu nombre (mínimo 2 letras).";
    }

    const digits = values.phone.replace(/\D/g, "");
    const validLocal = digits.length === 10;
    const validWithCountry = /^52\d{10,11}$/.test(digits);
    if (!validLocal && !validWithCountry) {
      errors.phone = "Escribe tu número de WhatsApp a 10 dígitos.";
    }

    if (!values.service) {
      errors.service = "Elige el servicio que necesitas.";
    }

    if (values.message.length > 500) {
      errors.message = "El mensaje puede tener hasta 500 caracteres.";
    }

    return errors;
  }

  function showErrors(errors) {
    Object.keys(fields).forEach((key) => {
      const { input, error } = fields[key];
      const message = errors[key] || "";
      error.textContent = message;
      if (message) input.setAttribute("aria-invalid", "true");
      else input.removeAttribute("aria-invalid");
    });
  }

  function setStatus(text, type) {
    status.textContent = text;
    status.className = "form-status" + (type ? " is-" + type : "");
  }

  function buildMessage(values) {
    const digits = values.phone.replace(/\D/g, "");
    const phone = digits.length === 10 ? formatLocalNumber(digits) : values.phone.trim();

    let text = "Hola, mi nombre es " + values.name + ".\n" +
      "Mi número de WhatsApp es " + phone + ".\n" +
      "Estoy interesado en: " + values.service + ".";

    if (values.message) {
      text += "\nNecesito: " + values.message.replace(/[.\s]+$/, "") + ".";
    }
    return text;
  }

  // Quita el error de un campo en cuanto la persona lo corrige
  Object.keys(fields).forEach((key) => {
    const { input, error } = fields[key];
    const clear = () => {
      error.textContent = "";
      input.removeAttribute("aria-invalid");
      setStatus("", "");
    };
    input.addEventListener("input", clear);
    input.addEventListener("change", clear);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = {
      name: fields.name.input.value.trim().replace(/\s+/g, " "),
      phone: fields.phone.input.value.trim(),
      service: fields.service.input.value,
      message: fields.message.input.value.trim()
    };

    const errors = validate(values);
    showErrors(errors);

    const firstInvalid = Object.keys(fields).find((key) => errors[key]);
    if (firstInvalid) {
      fields[firstInvalid].input.focus();
      setStatus("Revisa los campos marcados.", "error");
      return;
    }

    if (!isWhatsappConfigured()) {
      setStatus("Falta configurar el número de WhatsApp del negocio (WHATSAPP_NUMBER en js/script.js).", "error");
      return;
    }

    const url = buildWhatsappUrl(buildMessage(values));
    const popup = window.open(url, "_blank");
    if (popup) popup.opener = null;
    else window.location.href = url; // por si el navegador bloquea la ventana nueva

    setStatus("Abriendo WhatsApp con tu mensaje…", "ok");
  });
}

/* ---------- Inicio ---------- */
function init() {
  initBusinessData();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initReveal();
  initContactForm();
  window.__siteReady = true; // avisa al <head> de que el script cargó bien
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
