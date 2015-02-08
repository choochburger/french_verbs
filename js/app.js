$(function() {
    var template = Handlebars.compile( $('#verb').html() );
    var html = template(window.Verbs);
    $('#main').html(html);

    $('.btn-check').on('click', function(e) {
        e.preventDefault();

        var $btn = $(this);
        var $form = $(this).closest('form');
        var $inputs = $form.find('input');

        $inputs.each(function() {
            var $input = $(this);
            var $group = $input.closest('.form-group');
            var val = $input.val();
            var answer = $input.data('answer');

            $group.removeClass('has-success has-error')

            if (val === answer) {
                $group.addClass('has-success');
            } else {
                $group.addClass('has-error');
            }
        });

        return false;
    });
});
