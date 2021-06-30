$('#login-form').on('submit', function(e) {
    e.preventDefault()
    const data = {
        email: $('#login-email').val(),
        password: $('#login-password').val()
    }
    $.ajax({
        url: "/login",
        method: "post",
        data,
        success: (res) => {
            window.location.replace(res.url)
        },
        error: (res) => {
            console.log(res.responseJSON.error)
            $('#login-error-msg').text(res.responseJSON.error)
        }
    })
})