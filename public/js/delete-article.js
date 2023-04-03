$(document).ready(function() {
    $("#form")
        .submit(function(event) {

            var formData = {
            'title'            : $('input[name=title]').val(),
            'introduction'            : $('input[name=introduction]').val(),
            'text'           : $('textarea[name=text]').val(),
            'conclusion'           : $('textarea[name=conclusion]').val(),
            'link'           : $('textarea[name=link]').val(),
            'author'           : $('input[name=author]').val(),
            'topic'           : $('input[name=topic]').val(),
             };

            $.ajax({
                url: $form.attr('action'),
                data: formData,
                cache: false,
                contentType: 'application/json',
                dataType: 'json',
                processData: false,
                type: 'POST',

                }).done(function(data) {

                    console.log(data);
                });
            event.preventDefault();
        });
});
