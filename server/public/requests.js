let request = {}

document.querySelector("#search-form").addEventListener('submit', async (e) => {
    e.preventDefault();

    const code = document.querySelector("#requestcode").value;
    const message = document.querySelector(".form-wrapper").querySelector("h2");
    request = await getRequest(code);

    console.log(request)
    if(request !== undefined){
      let status = request['status'];
      message.innerHTML = `Your request is ${status}`
    }else{
      message.innerHTML = "No request found. Are you sure the code is correct?"
    }
});

