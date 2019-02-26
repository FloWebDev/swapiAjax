// REQUETE AJAX TYPE
// Je souhaite faire un appel Ajax sur la page "sous-dossier/toto.php"
$.ajax(
    {
      url: 'sous-dossier/toto.php', // URL sur laquelle faire l'appel Ajax
      method: 'GET', // La méthode HTTP souhaité pour l'appel Ajax (GET ou POST)
      dataType: 'html', // Le type de données attendu en réponse (text, html, xml, json)
      data: { // (optionnel) Tableau contenant les données à envoyer avec la requête
          index: 'valeur envoyée en GET ou POST, comme un formulaire',
          second: 'seconde donnée envoyée'
      }
    }
  ).done(function(response) { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec succès" et je récupère le code de réponse en paramètre
      console.log(response); // debug
      
      // TODO faire les actions souhaitées après la récupération de la réponse
  }).fail(function() { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec erreur"
      alert('Réponse ajax incorrecte');
  });