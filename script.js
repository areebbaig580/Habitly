const dateCont = document.querySelector(".date-container");

dateContainer();
function dateContainer() {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    
    for(let i = date; i < date + 21 ; i++){

        let currDate = new Date(year, month, i);
        let currMonth = currDate.toLocaleString('default' , {month : 'short'});

        const dateCard = `
        <div class="date">
                    <div class="dtmain">${currDate.getDate()}</div>
                    <div class="dtbtm">${currMonth}</div>
                </div>
        `; 

        dateCont.innerHTML += dateCard;
    }
}