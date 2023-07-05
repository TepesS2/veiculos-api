let vehicles = [
    {
      id: 1,
      placa: 'ABC123',
      ano: '2022',
      modelo: 'GT86',
      fabricante: 'Toyota'
    },
    {
      id: 2,
      placa: 'DEF456',
      ano: '2020',
      modelo: 'civic',
      fabricante: 'Honda'
    },
  ];
  
  function generateId() {
    return Math.floor(Math.random() * 100000) + 1;
  }
  

  function renderVehicles() {
    const vehicleTableBody = document.querySelector('#vehicleTable tbody');
    vehicleTableBody.innerHTML = '';
  
    vehicles.forEach((vehicle) => {
      const row = document.createElement('tr');
  
      const plateCell = document.createElement('td');
      plateCell.textContent = vehicle.placa;
      row.appendChild(plateCell);
  
      const yearCell = document.createElement('td');
      yearCell.textContent = vehicle.ano;
      row.appendChild(yearCell);
  
      const modelCell = document.createElement('td');
      modelCell.textContent = vehicle.modelo;
      row.appendChild(modelCell);
  
      const manufacturerCell = document.createElement('td');
      manufacturerCell.textContent = vehicle.fabricante;
      row.appendChild(manufacturerCell);
  
      const actionsCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editVehicle(vehicle.id));
      actionsCell.appendChild(editButton);
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteVehicle(vehicle.id));
      actionsCell.appendChild(deleteButton);
  
      row.appendChild(actionsCell);
  
      vehicleTableBody.appendChild(row);
    });
  }
  

  function addVehicle(vehicle) {
    vehicle.id = generateId();
    vehicles.push(vehicle);
    renderVehicles();
  }
  

  function deleteVehicle(vehicleId) {
    vehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    renderVehicles();
  }
  

  function editVehicle(vehicleId) {
    const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    if (vehicle) {
      document.getElementById('placa').value = vehicle.placa;
      document.getElementById('ano').value = vehicle.ano;
      document.getElementById('modelo').value = vehicle.modelo;
      document.getElementById('fabricante').value = vehicle.fabricante;
      document.getElementById('addVehicleBtn').textContent = 'Update';
      document.getElementById('addVehicleBtn').addEventListener('click', () => updateVehicle(vehicleId));
    }
  }
  

  function updateVehicle(vehicleId) {
    const updatedVehicle = {
      placa: document.getElementById('placa').value,
      ano: document.getElementById('ano').value,
      modelo: document.getElementById('modelo').value,
      fabricante: document.getElementById('fabricante').value
    };
  
    const vehicleIndex = vehicles.findIndex((vehicle) => vehicle.id === vehicleId);
    if (vehicleIndex !== -1) {
      vehicles[vehicleIndex] = { id: vehicleId, ...updatedVehicle };
      renderVehicles();
      document.getElementById('vehicleForm').reset();
      document.getElementById('addVehicleBtn').textContent = 'Add Vehicle';
      document.getElementById('addVehicleBtn').removeEventListener('click', () => updateVehicle(vehicleId));
    }
  }
  
 
  document.getElementById('addVehicleBtn').addEventListener('click', () => {
    const vehicleId = document.getElementById('addVehicleBtn').textContent === 'Update' ? parseInt(document.getElementById('addVehicleBtn').dataset.vehicleId) : null;
  
    const vehicle = {
      placa: document.getElementById('placa').value,
      ano: document.getElementById('ano').value,
      modelo: document.getElementById('modelo').value,
      fabricante: document.getElementById('fabricante').value
    };
  
    if (vehicleId) {
      updateVehicle(vehicleId);
    } else {
      addVehicle(vehicle);
    }
  });
  
 
  renderVehicles();