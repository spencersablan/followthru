
const changeEditText = (element) => {
    if ( $(element).html() === 'edit') return $(element).html('done')

    return $(element).html('edit')
}


//* Header

// Add contenteditable attr to .page-title
$('.page-title').on('click', function() {
    $(this).attr('contenteditable', true)
})

$('.page-title').on('focusout keypress', function(e) {
    
    if (e.which !== 13) return;

    e.preventDefault()
    const friendId = $('body').attr('data-friend-id')
    const updatedName = $(this).text()
   
    $.ajax({
        url: `/friends/${friendId}/change-name`,
        method: 'put',
        data: {
            friendId,
            updatedName
        },
        success:  (res) => {
            if (res.result == 'redirect') {
                window.location.replace(res.url)
            }
        }
    })
})


//* Picture

$('#edit-friend-pic__form').on('submit', function(e) {
    e.preventDefault()
    const friendId = $('body').attr('data-friend-id')
    const data = new FormData(this)

    $.ajax({
        url: `/friends/${friendId}/picture`,
        method: 'post',
        data,
        processData: false,
        contentType: false,
        success: (res) => {
            window.location.replace(res.url)
        },
        error: (res) => {
            console.log(res)
            $('#friend-picture__error-msg').text(res.error)
        }
    })
})

//* Goal

// Edit mode
$('#edit-goal').on('click', function() {
    if ($(this).html() === 'done') {
        return $('#goal-form').submit()
    }

    changeEditText(this)
    $('#goal-text').toggle()
    $('#goal-form').toggle()
})

$('#goal-form').on('submit', () => {
    const friendId = $('#goal-form').attr('data-friend-id')
    const frequencyNum = $('.frequencyNum').val()
    const frequencyUnit =  $('.frequencyUnit').val()
    $.ajax({
        url: `/friends/${friendId}/edit-goal`,
        method: 'put',
        data: {
            friendId,
            frequencyNum,
            frequencyUnit
        },
        success: (res) => {
            if (res.result == 'redirect') {
                window.location.replace(res.url)
            }
        }
    })
})


//* Dates

let updates = []
// Toggle edit dates
$('#edit-dates').on('click', function() {
    $('.dates__date-container .delete-container').toggle()
    const friendId = $('body').attr('data-friend-id')
    console.log(updates)
    if ($(this).html() == 'done') {
        
        $.ajax({
            url: `/friends/${friendId}/edit-dates`,
            method: 'put',
            data: {
                updates: JSON.stringify(updates)
            },
            success: (res) => {
                window.location.replace(res.url)
            },
            error: () => {
            
            }
        })
    }

    $('.label-text').toggle()
    $('.dates__formatted-date').toggle()
    $('.edit-date__form').toggle()
   
    changeEditText(this)
})

$('.edit-date__form').on('focusout', function() {

    const data = {
        _id: $(this).attr('data-date-id'),
        label: $(this).children('.h6').val(),
        date: $(this).children('.h5').val()
    }

    updates.push(data)
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
    
    const dateId = $(this).attr('data-date-id')
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
    $('#note-form__title').val($( '#new-note__title').text() )
    $('#note-form__body').val( $( '#new-note__body').text() )
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

// Submit edited not on focusout
$('.notes__note-container').on('focusout', function() {
    const _id = $(this).attr('data-note-id')
    const title =  $(this).children('h5').text()
    const body = $(this).children('p').text()
    const friendId = $('body').attr('data-friend-id')
    
    $.ajax({
        url: `/friends/${friendId}/edit-note`,
        method: 'put',
        data:  { _id, title, body },
        success: (res) => {
            window.location.replace(res.url)
        }
    })
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


$('#friend__edit-pic').on('click', () => {
    $('#friend-pic__popup').fadeIn('fast')
})

$('.pic__cancel').on('click', () => {
    $('#friend-pic__popup').fadeOut('fast')
})
