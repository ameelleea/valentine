let request = {}

document.querySelector("#search-form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const field = document.querySelector("#requestcode");
    const code = field.value;
    const message = document.querySelector(".status");
    request = await getRequest(code);

    field.value = '';
    console.log(request)
    if(request !== undefined && request !== null){
      let status = request['status'];
      message.innerHTML = `Your request is ${status}`
    }else{
      message.innerHTML = "No request found. Are you sure the code is correct?"
    }
});

