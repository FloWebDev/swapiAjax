var app = {

    starshipPage: 'https://swapi.dev/api/starships/',
    starshipArray: [],

    init: function() {

        console.log('init');

        $('#swapi').html('<div class="col-12 text-center mt-5">\
            <img src="asset/media/star-wars.png" alt="swapi ajax" style="width: 300px;">\
            </div>')

        $('.swapiAjax').on('mouseover', app.handleSwapiAjax);

    },

    handleSwapiAjax: function(evt) {

        console.log('handleSwapiAjax');

        console.log(evt.currentTarget);

        var data = $(evt.currentTarget).data('info');

        console.log(data);

        if(data == 'movie')
        {
            app.movieAjax();
            return;
        }

        if(data == 'starship')
        {
            app.starshipAjax();
            return;
        }

        if(data == 'character')
        {
            app.characterAjax();
            return;
        }

        if(data == 'planet')
        {
            app.planetAjax();
            return;
        }
    },

    movieAjax: function() {
        
        console.log('movieAjax');

        $.ajax(
            {
              url: 'https://swapi.dev/api/films/', // URL sur laquelle faire l'appel Ajax
              method: 'GET', // La méthode HTTP souhaité pour l'appel Ajax (GET ou POST)
              dataType: 'json', // Le type de données attendu en réponse (text, html, xml, json)
            }
          ).done(function(response) { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec succès" et je récupère le code de réponse en paramètre
              console.log(response); // debug

              $('#swapi').empty();

              for (var movieIndex in response.results) {

                console.log(response.results[movieIndex]);

                $('<div>').addClass('col-12 card').addClass('divNumber' + movieIndex).appendTo('#swapi');

                $('<p>').html(response.results[movieIndex].title + ' n° ' + response.results[movieIndex].episode_id).css('font-weight', 'bold').appendTo('.divNumber' + movieIndex);

                $('<p>').html('Date de réalisation : ' + response.results[movieIndex].release_date).appendTo('.divNumber' + movieIndex);

                $('<p>').html('<span style="font-weight: bold;">Directeur(s) : </span>' + response.results[movieIndex].director + ' <span style="font-weight: bold;">- Producteur(s) : </span>' + response.results[movieIndex].producer).appendTo('.divNumber' + movieIndex);

                $('<p>').html('<span style="font-weight: bold;">Sujet : </span>' + response.results[movieIndex].opening_crawl).appendTo('.divNumber' + movieIndex);
              }
              
          }).fail(function() { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec erreur"
              alert('Erreur, veuillez réessayer ultérieurement !');
          });

    },

    starshipAjax: function() {
        
        console.log('starshipAjax');
        console.log(app.starshipPage);

        $.ajax(
            {
              url: app.starshipPage, // URL sur laquelle faire l'appel Ajax
              method: 'GET', // La méthode HTTP souhaité pour l'appel Ajax (GET ou POST)
              dataType: 'json', // Le type de données attendu en réponse (text, html, xml, json)
            }
          ).done(function(response) { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec succès" et je récupère le code de réponse en paramètre
                console.log(response); // debug

                // Pour chaque valeur (vaisseau) retourné, j'ajoute celle-ci dans le tableau
                // La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.
                // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/push
                for(var index in response.results)
                {
                    app.starshipArray.push(response.results[index]);
                }

                // Si présence d'une page suivante,
                // je relance cette méthode en modifiant la page
                // sur laquelle requêtée
                if (response.next !== null)
                {
                    app.starshipPage = response.next;
                    
                    app.starshipAjax();
                    return;
                }

                console.log(app.starshipArray);

                // Gestion de l'affichage dans le DOM
                $('#swapi').empty();

                $('<h2>').html('Liste des vaisseaux spatiaux :').appendTo('#swapi');

                $('<ul>').appendTo('#swapi');

                for (var starshipIndex in app.starshipArray) {

                $('<li>').html(app.starshipArray[starshipIndex].name).appendTo('#swapi ul');

                }

                // Une fois l'affichage effectuée,
                // on réinitialise les propriétés de l'app
                // avec leurs valeurs par défaut
                app.starshipPage = 'https://swapi.dev/api/starships/';
                app.starshipArray = [];


          }).fail(function() { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec erreur"
              alert('Erreur, veuillez réessayer ultérieurement !');
          });

    },

    characterAjax: function() {
        
        console.log('characterAjax');

        $.ajax(
            {
              url: 'https://swapi.dev/api/people/', // URL sur laquelle faire l'appel Ajax
              method: 'GET', // La méthode HTTP souhaité pour l'appel Ajax (GET ou POST)
              dataType: 'json', // Le type de données attendu en réponse (text, html, xml, json)
            }
          ).done(function(response) { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec succès" et je récupère le code de réponse en paramètre
              console.log(response); // debug

              var maxNumber = response.results.length - 1;

            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
            // On renvoie un entier aléatoire entre une valeur min (incluse)
            // et une valeur max (incluse).
            // Attention : si on utilisait Math.round(), on aurait une distribution
            // non uniforme !
            function getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min +1)) + min;
            }

            randomIndex = getRandomIntInclusive(0, maxNumber);

            console.log(randomIndex);

              $('#swapi').empty();

              $('<div>').addClass('col-12 card').appendTo('#swapi');

              $('<p>').html('Personnage : ' + response.results[randomIndex].name).css('font-weight', 'bold').appendTo('#swapi div');

              $('<p>').html('<span style="font-weight: bold;">Genre : </span>' + response.results[randomIndex].gender + ' <span style="font-weight: bold;">- Taille : </span>' + response.results[randomIndex].height + ' <span style="font-weight: bold;">- Poids : </span>' + response.results[randomIndex].mass + ' <span style="font-weight: bold;">- Couleur des yeux : </span>' + response.results[randomIndex].eye_color + ' <span style="font-weight: bold;">- Couleur des cheveux : </span>' + response.results[randomIndex].hair_color).appendTo('#swapi div');

              $('<p>').html('<span style="font-weight: bold;">Année de naissance : </span>' + response.results[randomIndex].birth_year).appendTo('#swapi div');


              
          }).fail(function() { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec erreur"
              alert('Erreur, veuillez réessayer ultérieurement !');
          });
    },

    planetAjax: function() {
        
        console.log('planetAjax');

        $.ajax(
            {
              url: 'https://swapi.dev/api/planets/', // URL sur laquelle faire l'appel Ajax
              method: 'GET', // La méthode HTTP souhaité pour l'appel Ajax (GET ou POST)
              dataType: 'json', // Le type de données attendu en réponse (text, html, xml, json)
            }
          ).done(function(response) { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec succès" et je récupère le code de réponse en paramètre
              console.log(response); // debug

              var maxNumber = response.results.length - 1;

            // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/random
            // On renvoie un entier aléatoire entre une valeur min (incluse)
            // et une valeur max (incluse).
            // Attention : si on utilisait Math.round(), on aurait une distribution
            // non uniforme !
            function getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min +1)) + min;
            }

            randomIndex = getRandomIntInclusive(0, maxNumber);

            console.log(randomIndex);

              $('#swapi').empty();

              $('<div>').addClass('col-12 card').appendTo('#swapi');

              $('<p>').html('Planète : ' + response.results[randomIndex].name).css('font-weight', 'bold').appendTo('#swapi div');

              $('<p>').html('<span style="font-weight: bold;">Climat : </span>' + response.results[randomIndex].climate + ' <span style="font-weight: bold;">- Diamètre : </span>' + response.results[randomIndex].diameter + ' <span style="font-weight: bold;">- Gravité : </span>' + response.results[randomIndex].gravity + ' <span style="font-weight: bold;">- Climat : </span>' + response.results[randomIndex].climate + ' <span style="font-weight: bold;">- Population : </span>' + response.results[randomIndex].population).appendTo('#swapi div');

              $('<p>').html('<span style="font-weight: bold;">Type de terrain : </span>' + response.results[randomIndex].terrain).appendTo('#swapi div');


              
          }).fail(function() { // J'attache une fonction anonyme à l'évènement "Appel ajax fini avec erreur"
              alert('Erreur, veuillez réessayer ultérieurement !');
          });
    }

};

$(app.init);