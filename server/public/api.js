async function getRequest(code) {
    const url = `/requests?code=${code}`;

    try {
      console.log(`\n---\nRequest:\nGET ${url}\n`);

      const res = await fetch(url);
      const data = await res.json();

      console.log('Status:', res.status);
      console.log('Body:', data);

      if (!res.ok || !data.success) throw new Error(`${res.status} ${data.error}`);

      return data.results;

    } catch (err) {
      console.error('Errore caricando siti:', err);
    }
}

async function saveRequest(payload){
  console.log(`\n---\nRequest:\nPOST /requests\nBody:\n`, payload);

  try{
    const res = await fetch('/requests', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(payload)
    });

    const data = await res.json();
    
    console.log(`Response POST:\nStatus: ${res.status}\nBody:\n`, data, '\n---\n');
  }catch(error){
    console.log('Errore nella POST: ' + error);
  }
}

//Chiamata API PUT
async function modifyStatus(request) {
  console.log(`\n---\nRequest:\nPUT /requests/${request.id}\nBody:\n`, request);

  try{
    const res = await fetch(`/requests/${request.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(request)
        });
  
    const data = await res.json();
    console.log(`Response PUT:\nStatus: ${res.status}\nBody:\n`, data, '\n---\n');
       
  }catch(error){ 
    console.error('Errore nella PUT:', error);
  }
}

async function sendEmail(request, dest) {
  let email;
  let destname;
  let id = request.id;

  if(dest === 'receiver'){
    email = request.destemail;
    destname = request.destName;
  }else{
    email = request.submitteremail;
    destname = request.submitterName;
  }

  fetch('/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      name: destname,
      code: id,
      template: dest
    })
  })
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
}
