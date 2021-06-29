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

$('#profile__edit-pic').on('click', () => {
    $('#profile-pic__popup').fadeIn('fast')
})

$('.pic__cancel').on('click', () => {
    $('#profile-pic__popup').fadeOut('fast')
})

$('#logout-user').on('click', () => {
    $.ajax({
        url: '/logout',
        method: 'post',
        success: (res) => {
            window.location.replace(res.url)
        }
    })
})
