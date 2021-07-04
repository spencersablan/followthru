$('#signup-form').on('submit', (e) => {
    e.preventDefault()
    const password = $('#signup__password').val()
    const confirmedPassword = $('#signup__confirm-password').val() 

    if ( password !== confirmedPassword ) {
        return $('#signup-error-msg').text('Passwords do not match.')
    }

    const data = {
        firstName: $('#signup__firstName').val(),
        lastName: $('#signup__lastName').val(),
        email: $('#signup__email').val(),
        password
    }

    $.ajax({
        url: '/users',
        method: 'post',
        data,
        success: (res) => {
            window.location.replace(res.url)
        },
        error: (res) => {
            $('#signup-error-msg').text(res.responseJSON.message)
        }
    })
})