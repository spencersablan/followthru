$('#delete-user').on('click', () => {
    $('#delete-user__popup').fadeIn('fast')
})

$('.popup__nvm-btn').on('click', () => {
    $('#delete-user__popup').fadeOut('fast')
})

$('.popup__delete-btn').on('click', () => {
    const user = $('body').attr('data-user-id')

    $.ajax({
        url: '/profile',
        method: 'delete',
        data: { user },
        success: (res) => {
            window.location.replace(res.url)
        }
    })
})