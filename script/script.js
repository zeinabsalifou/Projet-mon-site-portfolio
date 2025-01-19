$(function () {
    $('#contact-form').submit(function (e) {
        e.preventDefault(); // Empêche le rechargement de la page
        $('.comments').empty(); // Vide les messages précédents

        var postdata = $('#contact-form').serialize(); // Sérialise les données du formulaire

        $.ajax({
            type: 'POST',
            url: 'php/contact.php',
            data: postdata,
            dataType: 'json',
            success: function (json) {
                if (json.isSuccess) {
                    $('#contact-form').append(
                        "<p class='thank-you'>Votre message a bien ete envoye. Merci de m'avoir contacte :)</p>"
                    );
                    $('#contact-form')[0].reset();
                } else {
                    $('#firstname + .comments').html(json.firstnameError);
                    $('#name + .comments').html(json.nameError);
                    $('#email + .comments').html(json.emailError);
                    $('#phone + .comments').html(json.phoneError);
                    $('#message + .comments').html(json.messageError);
                }
            },
            error: function (xhr, status, error) {
                console.error("Erreur dans la requête AJAX :", error);
            }
        });
    });
});  