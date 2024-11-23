const btnSubmit = document.querySelector(".btn__submit");
btnSubmit.addEventListener("click", ()=> {
    console.log('deu bom')
    window.open("result.html", "_blank");
})

const btnAdd = document.querySelector('.btn__add--action');

btnAdd.addEventListener("click", ()=> {
    const mainFields = document.querySelector(".main__fields");
    const main = document.querySelector(".main");

    const newMainFields = mainFields.cloneNode(true);
    main.appendChild(newMainFields);
}
)

//icone copy

const iconeCopy = document.querySelector(".icone__copy");
iconeCopy.addEventListener('click', ()=>{
    document.querySelector('.txt').select();
    document.execCommand('copy');

})