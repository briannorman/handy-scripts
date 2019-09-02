var COOKIE_NAME = 'pg22_exit_intent_modal_shown';

function getCookieValueByCookieName(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function showExitIntentModal() {
  var modalHTML = `
    <style>
      #pg22-myModal.pg22_modal {
        display: block !important;
        position: fixed; /* Stay in place */
        z-index: 100; /* Sit on top */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0,0,0); /* Fallback color */
        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
      }

      /* Modal Content/Box */
      .pg22-modal-content {
        background-color: #fefefe;
        margin: 15% auto; /* 15% from the top and centered */
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 400px;
        text-align: center;
      }

      /* The Close Button */
      .pg22-close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .pg22-close:hover,
      .pg22-close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }

      p.pg22 {
        padding: 10px 10% 0;
      }

      a.pg22 {
        color: #fff;
        padding: 10px 20px;
        background-color: #D62DA7;
        border-radius: 10px;
        display: block;
        width: 50%;
        margin: 30px auto 0;
      }
    </style>

    <div id="pg22-myModal" class="pg22_modal">
      <!-- Modal content -->
      <div class="pg22-modal-content">
        <span class="pg22-close">&times;</span>
        <h1 class="pg22">Avant de partir!</h1>
        <p class="pg22">Envie d'acheter malin?</p>
        <p class="pg22">On économise en utilisant les bons de réduction à imprimer, pour des réductions sur ses marques préférées!</p>
        <a class="pg22" href="https://www.enviedeplus.com/maison/economies/bons-de-reduction-a-imprimer-shopping-malin">Achetez Smart</a>
      </div>
    </div>
  `;

  document.querySelector('body').insertAdjacentHTML('afterbegin', modalHTML);
}

function removeExitIntentModalFromPage() {
  // we only show the exit intent modal once per session so remove it entirely from the DOM when closed
  document.querySelector('#pg22-myModal').remove();
}

function handleModalClose() {
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('pg22-close') || e.target.classList.contains('pg22_modal')) {
      removeExitIntentModalFromPage();
    }
  });
}

function handleExitIntent(e) {
  if (e.clientY < 0 || e.clientY > window.innerHeight || e.clientX < 0 || e.clientX > window.innerWidth) {
    showExitIntentModal();
    handleModalClose();

    // set the cookie that the modal has been shown
    document.cookie = COOKIE_NAME + '=true';

    // remove our event listener so the exit intent modal is only shown once
    document.removeEventListener('mouseout', handleExitIntent);
  }
}

if (!getCookieValueByCookieName(COOKIE_NAME)) {
  document.addEventListener('mouseout', handleExitIntent);
}
