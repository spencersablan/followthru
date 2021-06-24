$('#new-note__title').on('keypress', (e) => {
    if (e.which == 13) {
        e.preventDefault()
        $('#new-note__body').focus()
    }
})

$('#new-note__submit').on('click', () => {
    $('#note-form__title').val($( '#new-note__title').html() )
    $('#note-form__body').val( $( '#new-note__body').html() )
    $('#new-note-form').submit()
})

$('.add-note').on('click', () => {
    $('#note-create').fadeIn()
    $('#new-note__title').focus()
})

$('#edit-notes').on('click', () => {
    $('.delete-container').toggle()
    
    if ( $('#edit-notes').html() === 'edit') return $('#edit-notes').html('done')

    return $('#edit-notes').html('edit')
})