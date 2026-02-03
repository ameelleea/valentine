let request = {}

function hideForm(){
    let wrapper = document.querySelector('.form-wrapper');

    wrapper.style.display = 'none';
}

function showConfirmMessage(id){
    let confirm = document.querySelector("#confirm-message")
    confirm.querySelector("span").innerHTML = `Your request code is ${id}`
    document.querySelector(".form-wrapper").style.display = 'none';
    confirm.style.display = 'block';
}

document.querySelector("#search-form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = document.querySelector("#requestcode").value;
    const message = document.querySelector(".form-wrapper").querySelector("h2");
    request = await getRequest(code);
    hideForm();
    
    console.log(request)
    if(request !== undefined){
      let status = request['status'];
      message.innerHTML = `Your request is ${status}`
    }else{
      message.innerHTML = "No request found. Are you sure the code is correct?"
    }
});

function changeSizes(){
    const yes = document.querySelector(".button-group").querySelector("#yes")
    const no = document.querySelector(".button-group").querySelector("#no")

    const yesstyle = window.getComputedStyle(yes);
    const yescurrentSize = parseFloat(yesstyle.fontSize);

    const nostyle = window.getComputedStyle(no);
    const nocurrentSize = parseFloat(nostyle.fontSize);

    const yesnewSize = yescurrentSize * 1.15; 
    const nonewSize = nocurrentSize * 0.90; 

    yes.style.fontSize = yesnewSize + 'px';
    no.style.fontSize = nonewSize + 'px';
}

function requestAccepted(){
    document.querySelector(".button-group").style.display = 'none';

    document.querySelector("#success-message").style.display = 'block';
}