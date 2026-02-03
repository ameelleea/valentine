let request = {}

function generateShortID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

function showForm(){
    let wrapper = document.querySelector('.form-wrapper');

    wrapper.style.display = 'grid';
}

function hideHeader(){
    let bodies = document.querySelectorAll(".body");
    bodies.forEach(body => body.style.display = 'none')
}

function showConfirmMessage(id){
    let confirm = document.querySelector("#confirm-message")
    confirm.querySelector(".code").innerHTML = `Your request code is <b>${id}</b>`
    document.querySelector(".form-wrapper").style.display = 'none';
    hideHeader()
    confirm.style.display = 'block';
}

document.querySelector("#request-form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = generateShortID();
    console.log(id);

    const objData = {
    "id" : id,
    "submitterName" : document.getElementById('submittername').value,
    "submitterPhone" : document.getElementById('submitterphone').value,
    "destName" : document.getElementById('destname').value,
    "destPhone" : document.getElementById('destphone').value,
    "status" : "pending"
    }

    console.log(objData)

    await saveRequest(objData)

    showConfirmMessage(id);
});