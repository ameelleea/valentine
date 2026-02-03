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

    
    const field = document.querySelector("#requestcode");
    const code = field.value;
    const message = document.querySelector(".message");
    
    request = await getRequest(code);

    field.value = '';
    
    console.log(request)
    if(request !== undefined && request !== null){
        document.querySelector(".idle").style.display = 'none';
        document.querySelector("#notfound").style.display = 'none';
        message.style.display = 'block';
      hideForm();
      let sender = request['submitterName'];
      let receiver = request['destName']
      message.querySelector("h2").innerHTML = `Hi ${receiver}! Will you be my valentine?`
      message.querySelector("h3").innerHTML = `Sincerely, ${sender}`

      document.querySelector(".button-group").style.display = 'block';
    }else{
      document.querySelector("#notfound").style.display = 'block';
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
    document.querySelector(".message").style.display = 'none';
    document.querySelector("#success-message").style.display = 'block';
    request.status = 'accepted';
}