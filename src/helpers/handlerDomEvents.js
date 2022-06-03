
const buttonStartExtrationData = (e) => {

    e.preventDefault();

    const objGetData = {
        dayIn: document.querySelector('input #dayIn').value,
        dayOut: document.querySelector('input #dayOut').value,
        month: document.querySelector('input #month').value,
    }

    console.log( objGetData )
}
