function funTicket(tipo) {

  const fechaActual = new Date().toISOString();
  var type = tipo.toString()
  console.log('funTicket ejecutado')

  const ticketData = {
    // Agrega aquí los datos del objeto que quieres enviar a la ruta /caja
    tipo : type,
    fecha : fechaActual,
  };

  fetch('/ticket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticketData)
  })
  .then(response => {
    // Agrega aquí lo que quieres hacer después de enviar la solicitud POST
  })
  .catch(error => {
    console.error('Error:', error);
  });

}


funCaja1 = (id_caja) =>{
  console.log('funCaja 1 ejecutado')

  const cajaData = {
    // Agrega aquí los datos del objeto que quieres enviar a la ruta /caja
    id_modulo : id_caja
  };

  fetch('/caja1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cajaData)
  })
  .then(response => {
    
    // Agrega aquí lo que quieres hacer después de enviar la solicitud POST
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

funCaja2 = (id_caja) =>{
  console.log('funCaja 2 ejecutado')

  const cajaData = {
    // Agrega aquí los datos del objeto que quieres enviar a la ruta /caja
    id_modulo : id_caja
  };

  fetch('/caja2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cajaData)
  })
  .then(response => {
    if (response.ok) {
      response.json()
        .then(data => {
          // Actualiza el contenido de la lista en el DOM
          updateList(data);
        })
        .catch(error => console.log(error));
      }
    // Agrega aquí lo que quieres hacer después de enviar la solicitud POST
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

function fetchData() {
  fetch('/tickets')
    .then(response => response.json())
    .then(data => renderData(data))
    .catch(error => console.log(error));
}

function renderData(data) {
  const list = document.getElementById('data-list');

  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.descripcion; // mostrar la descripción del ticket en la lista
      list.appendChild(li);
    });
  }
}

function updateList(data) {
  const list = document.getElementById('data-list');

  if (list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.descripcion; // mostrar la descripción del ticket en la lista
      list.appendChild(li);
    });
  }
}

document.addEventListener('DocumentEventMap', fetchData);
document.addEventListener('click',fetchData);
document.addEventListener('DOMContentLoaded', fetchData);
