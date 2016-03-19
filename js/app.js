$(function() {
    var verbs = window.Verbs;

    // Process options
    var url = window.location.search;
    var scrambleVerbs  = (url.indexOf('scramble_verbs=true') > -1);
    var scrambleTenses = (url.indexOf('scramble_tenses=true') > -1);
    var singleReveal   = (url.indexOf('single_reveal=true') > -1);

    if (scrambleVerbs) {
        verbs = _.shuffle(verbs);
    }

    if (scrambleTenses) {
        verbs.forEach(function(verb) {
            verb.tenses = _.shuffle(verb.tenses);
        });
    }

    var template = Handlebars.compile( $('#verb').html() );
    var html = template(verbs);
    $('#main').html(html);

    $('.btn-check').on('click', function(e) {
        e.preventDefault();

        var $btn        = $(this);
        var $form       = $(this).closest('form');
        var $inputs     = $form.find('input');
        var numAttempts = parseInt($form.data('attempts')) || 0;

        $inputs.each(function() {
            var $input = $(this);
            var $group = $input.closest('.form-group');
            var val    = $input.val();
            var answer = $input.data('answer');

            $group.removeClass('has-success has-error')

            if (val === answer) {
                $group.addClass('has-success');
            } else {
                $group.addClass('has-error');
                $form.data('attempts', numAttempts + 1);

                if (numAttempts >= 5) {
                    var shouldReveal = !singleReveal || (singleReveal && $input.is(':focus'));
                    if (shouldReveal) {
                        $input.val(answer);
                    }
                }
            }
        });

        return false;
    });

    $('.option').on('click', function(e) {
        e.stopPropagation();
    });

    $('.reload').on('click', function(e) {
        e.stopPropagation();

        var $options = $('.option:checked');
        var params = {};
        $options.each(function() {
            var key = $(this).val();
            params[key] = true;
        });
        var queryStr = $.param(params);
        window.location.search = queryStr;
        return false;
    });
});
