function blurEvent(input) {
    input.type = 'text'
    
    if ($(input).val() !== '') {
        const date = new Date($(input).val()) 
        const day = date.getDate() + 1
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        const formattedDate = [month,day,year].join('/')
        $(input).val(formattedDate.toString())
    }
}

function focusEvent(input) {
    const initialValue = $(input).val()
    input.type = 'date'

    if (initialValue !== '') {
        // Format date to make sense with date input
        const date = new Date(initialValue)
        let day = date.getDate()
        let month = date.getMonth() + 1
        const year = date.getFullYear()
        
        if (day < 10) { day = "0" + day }
        if (month < 10) { month = "0" + month }

        const formattedDate = [year,month,day].join('-')

        input.value = formattedDate
    }
}
