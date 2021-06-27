const changeEditText = (element) => {
    if ( $(element).html() === 'edit') return $(element).html('done')

    return $(element).html('edit')
}


//* Dates

// Toggle edit dates
$('#edit-dates').on('click', function() {
    $('.dates__date-container .delete-container').toggle()
    changeEditText(this)
})


// Show "create date" & focus on title
$('.add-date').on('click', () => {
    $('#date-create').fadeIn()
    $('#new-date__title').focus()
})

// Go to date when "enter" on title
$('#new-date__title').on('keypress', (e) => {
    if (e.which == 13) {
        e.preventDefault()
        $('#new-date__body').focus()
    }
})

// Submit new date on "enter"
$('#new-date__body').on('keypress', (e) => {
    if (e.which == 13) {
        e.preventDefault()
        $('#date-create').submit()
    }
})

// Submit new date on "add date" press
$("#new-date__submit").on('click', (e) => {
    e.preventDefault()
    $('#date-create').submit()
})

// Delete date on click
$('.dates__date-container .delete-container').on('click', function() {
    $(this).parent().fadeOut("fast")
    
    const dateId = $(this).attr('data-note-id')
    const friendId = $(this).attr('data-friend-id')

    $.ajax({
        url: '/delete-date/' + dateId,
        method: 'delete',
        data: { dateId, friendId  }
    })
})



//* Notes

// Make "enter" on keyboard focus on body of note
$('#new-note__title').on('keypress', (e) => {
    if (e.which == 13) {
        e.preventDefault()
        $('#new-note__body').focus()
    }
})

// Submit new note to server
$('#new-note__submit').on('click', () => {
    $('#note-form__title').val($( '#new-note__title').html() )
    $('#note-form__body').val( $( '#new-note__body').html() )
    $('#new-note-form').submit()
})

// Show "create note" & focus on title
$('.add-note').on('click', () => {
    $('#note-create').fadeIn()
    $('#new-note__title').focus()
})

// Toggle edit notes
$('#edit-notes').on('click', function() {
    $('.notes__note-container .delete-container').toggle()
    changeEditText(this)
})

// Delete note on click
$('.notes__note-container .delete-container').on('click', function() {
    $(this).parent().fadeOut("fast")
    
    const noteId = $(this).attr('data-note-id')
    const friendId = $(this).attr('data-friend-id')

    $.ajax({
        url: '/delete-note/' + noteId,
        method: 'delete',
        data: { noteId, friendId  }
    })
})

