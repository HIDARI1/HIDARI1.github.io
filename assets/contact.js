/**
 * CONTACT — Envoi du formulaire via Formspree (AJAX)
 * L'utilisateur reste sur la page et reçoit une confirmation.
 */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("contact-status");
  var submitBtn = form.querySelector('button[type="submit"]');
  var btnLabel = submitBtn ? submitBtn.innerHTML : "";

  function showStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.hidden = false;
    status.classList.remove("contact__status--ok", "contact__status--error");
    status.classList.add(type === "ok" ? "contact__status--ok" : "contact__status--error");
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    submitBtn.innerHTML = isLoading
      ? 'Envoi en cours… <i class="uil uil-spinner-alt button__icon" aria-hidden="true"></i>'
      : btnLabel;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    if (status) status.hidden = true;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          showStatus("Merci ! Votre message a bien été envoyé. ✅", "ok");
        } else {
          return response.json().then(function (data) {
            var msg =
              data && data.errors && data.errors.length
                ? data.errors.map(function (err) { return err.message; }).join(", ")
                : "Une erreur est survenue. Réessayez plus tard.";
            showStatus(msg, "error");
          });
        }
      })
      .catch(function () {
        showStatus("Impossible d'envoyer le message. Vérifiez votre connexion.", "error");
      })
      .finally(function () {
        setLoading(false);
      });
  });
})();
