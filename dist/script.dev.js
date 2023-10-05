'use strict';

var idInput = document.getElementById('input-id');
var nameInput = document.getElementById('input-name');
var ageInput = document.getElementById('input-age');
var typeInput = document.getElementById('input-type');
var weightInput = document.getElementById('input-weight');
var lengthInput = document.getElementById('input-length');
var colorInput = document.getElementById('input-color-1');
var breedInput = document.getElementById('input-breed');
var check_vaccinated = document.getElementById('input-vaccinated');
var check_dewormed = document.getElementById('input-dewormed');
var check_sterilized = document.getElementById('input-sterilized');
var tableBodyEl = document.getElementById('tbody');
var submit = document.getElementById('submit-btn');
var healthyPet = document.getElementById('healthy-btn');
var petList = [];
var healthyPetList = [];
var bmiPetList = [];
var checkUpdateInfo = false;

var init = function init() {
  return {
    "id": idInput.value,
    "name": nameInput.value,
    "age": parseInt(ageInput.value),
    "type": typeInput.value,
    "weight": parseFloat(weightInput.value),
    "length_pet": lengthInput.value,
    "color": colorInput.value,
    "breed": breedInput.value,
    "vaccinated": check_vaccinated.checked,
    "dewormed": check_dewormed.checked,
    "sterilized": check_sterilized.checked,
    "date": formatDate(new Date())
  };
};

function checkIdToAdd(petId) {
  if (Array.isArray(petList) && petList.length >= 1) {
    //Some method support check id exists list return true or false
    return petList.some(function (item) {
      return item.id === petId;
    });
  }

  return false;
}

function checkDataValid(data) {
  if (!Boolean(data.id) || !Boolean(data.name) || !Boolean(data.age) || !Boolean(data.weight) || !Boolean(data.length_pet) || !Boolean(data.color)) {
    alert('Please , fill all filed data ');
  } else {
    if (!checkUpdateInfo) {
      var checkIdUnique = checkIdToAdd(data.id);

      if (checkIdUnique) {
        alert('ID must be unique!');
        return false;
      }
    }

    if (data.age < 1 || data.age > 15) {
      alert('Age must be between 1 and 15!');
    } else if (data.weight < 1 || data.weight > 15) {
      alert('Weight must be between 1 and 15!');
    } else if (data.length_pet < 1 || data.length_pet > 100) {
      alert('Length must be between 1 and 100!');
    } else if (!Boolean(data.type)) {
      alert('Please select Type!');
    } else if (!Boolean(data.breed)) {
      alert('Please select Breed!');
    } else {
      return true;
    }

    return false;
  }

  return false;
}

function addPetToList() {
  var dataInsert = init();

  if (checkDataValid(dataInsert)) {
    petList.push(dataInsert);
    resetInput();
    showAllList();
  }
}

function resultBMI(type, weight, length) {
  var bmiType;

  if (type === 'Cat') {
    bmiType = weight * 703 / Math.pow(length, 2);
  }

  if (type === 'Dog') {
    bmiType = weight * 886 / Math.pow(length, 2);
  }

  return bmiType.toFixed(2);
}

function setUpIconCheckIn(cell, value) {
  var checked = 'bi bi-check-circle-fill';
  var unchecked = 'class="bi bi-x-circle-fill';
  var icon = document.createElement('i');
  icon.className = Boolean(value) ? checked : unchecked;
  cell.appendChild(icon);
}

function applyColor(selectedColor, cellColor) {
  //Create i tag and apply color value for attribute 
  var colorIcon = document.createElement('i');
  colorIcon.className = 'bi bi-square-fill';
  colorIcon.style.color = selectedColor;
  cellColor.appendChild(colorIcon);
}

function createRowInTable(petList) {
  tableBodyEl.innerHTML = '';

  for (var index = 0; index < petList.length; index++) {
    var row = document.createElement('tr');
    var cellId = document.createElement('th');
    console.log(petList[index].id);
    var idValue = petList[index].id;
    cellId.textContent = idValue;
    row.appendChild(cellId);
    var cellName = document.createElement('td');
    cellName.textContent = petList[index].name;
    row.appendChild(cellName);
    var cellAge = document.createElement('td');
    cellAge.textContent = petList[index].age;
    row.appendChild(cellAge);
    var cellType = document.createElement('td');
    var typeValue = petList[index].type;
    cellType.textContent = typeValue;
    row.appendChild(cellType);
    var cellWeight = document.createElement('td');
    var weightValue = petList[index].weight;
    cellWeight.textContent = "".concat(weightValue, " kg");
    row.appendChild(cellWeight);
    var cellLength = document.createElement('td');
    var lengthValue = petList[index].length_pet;
    cellLength.textContent = "".concat(lengthValue, " cm");
    row.appendChild(cellLength);
    var cellBreed = document.createElement('td');
    cellBreed.textContent = petList[index].breed;
    row.appendChild(cellBreed);
    var cellColor = document.createElement('td');
    var color = petList[index].color;
    row.appendChild(cellColor);
    applyColor(color, cellColor);
    var cellVaccinated = document.createElement('td');
    var vaccinatedValue = petList[index].vaccinated;
    row.appendChild(cellVaccinated);
    setUpIconCheckIn(cellVaccinated, vaccinatedValue);
    var cellDewormed = document.createElement('td');
    var dewormedValue = petList[index].dewormed;
    row.appendChild(cellDewormed);
    setUpIconCheckIn(cellDewormed, dewormedValue);
    var cellSterilized = document.createElement('td');
    var sterillizedValue = petList[index].sterilized;
    row.appendChild(cellSterilized);
    setUpIconCheckIn(cellSterilized, sterillizedValue);
    var cellBMI = document.createElement('td');
    cellBMI.textContent = resultBMI(typeValue, weightValue, lengthValue);
    ;
    row.appendChild(cellBMI);
    var cellDate = document.createElement('td');
    cellDate.textContent = petList[index].date;
    row.appendChild(cellDate);
    var cellEdit = document.createElement('td');
    createButtonEdit(cellEdit, idValue);
    row.appendChild(cellEdit);
    var cellDelete = document.createElement('td');
    createButtonDelete(cellDelete, idValue);
    row.appendChild(cellDelete);
    tableBodyEl.appendChild(row);
  }
}

function showAllList() {
  createRowInTable(petList);
}

function showHealthyPet() {
  resultBMI();
  petList.forEach(function (item) {
    if (item.vaccinated && item.dewormed && item.sterilized) {
      // let idPetList = item.id;
      // let indexPetId = healthyPetList.findIndex(item => item.id === idPetList);
      // if (indexPetId === -1) {
      healthyPetList.push(item);
      console.log(healthyPetList); // }
    }
  });
  createRowInTable(healthyPetList);
}

healthyPet.addEventListener('click', function () {
  if (!healthyPet.classList.contains('showAll')) {
    healthyPet.textContent = 'Show All Pet';
    healthyPet.classList.add('showAll');
    showHealthyPet();
  } else {
    healthyPet.textContent = 'Show Healthy Pet';
    healthyPet.classList.remove('showAll');
    showAllList();
  }
});

function setValue(data) {
  idInput.value = data.id;
  nameInput.value = data.name;
  ageInput.value = data.age;
  typeInput.value = data.type;
  weightInput.value = data.weight;
  lengthInput.value = data.length_pet;
  colorInput.value = data.color;
  breedInput.value = data.breed;
  check_vaccinated.checked = data.vaccinated;
  check_dewormed.checked = data.dewormed;
  check_sterilized.checked = data.sterilized;
}

var arrowEditFunction = function arrowEditFunction(pet) {
  var index = petList.findIndex(function (item) {
    return item.id === pet.id;
  });
  console.log("Pet ", petList[index]);
  setValue(petList[index]); //set value form

  if (index !== -1) {
    //Update data 
    console.log("data update", pet);

    if (checkDataValid(pet)) {
      petList[index] = pet;
    }
  }
};

function createButtonEdit(cellEdit, petId) {
  var editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.className = 'btn btn-info';
  editButton.textContent = 'Edit';
  cellEdit.appendChild(editButton);
  editButton.addEventListener('click', function () {
    checkUpdateInfo = true;
    idInput.setAttribute("readonly", true);
    var pet = petList.find(function (item) {
      return item.id === petId;
    });
    arrowEditFunction(pet);
  });
}

function updateInfoOfPet(dataUpdate) {
  console.log(dataUpdate);
  arrowEditFunction(dataUpdate);
  resetInput();
  idInput.removeAttribute("readonly");
  showAllList();
}

function createButtonDelete(cellDelete, petId) {
  var deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'btn btn-danger';
  deleteButton.textContent = 'Delete';
  cellDelete.appendChild(deleteButton);
  deleteButton.addEventListener('click', function () {
    arrowDeleteFunction(petId);
  });
}

var arrowDeleteFunction = function arrowDeleteFunction(petId) {
  //Delete data with id 
  var index = petList.findIndex(function (item) {
    return item.id === petId;
  });

  if (index !== -1 && confirm('Are you sure?')) {
    console.log('Before delete ', petList.length);
    petList.splice(index, 1);
    console.log('After delete ', petList.length);
    tableBodyEl.innerHTML = '';
    resetInput();
    showAllList();
  }
};

function resetInput() {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  typeInput.value = 'Select Type';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  breedInput.value = 'Select Breed';
  check_vaccinated.checked = false;
  check_dewormed.checked = false;
  check_sterilized.checked = false;
}

function formatDate(date) {
  // Get day and ensure it has the least two number 
  var day = date.getDate().toString().padStart(2, '0'); //  Get day (note : the month start 0) and ensure it has the least two number (lưu ý rằng tháng bắt đầu từ 0) và đảm bảo rằng nó có ít nhất 2 chữ số

  var month = (date.getMonth() + 1).toString().padStart(2, '0');
  var year = date.getFullYear();
  return "".concat(day, "/").concat(month, "/").concat(year);
}

submit.addEventListener('click', function () {
  //Update info
  console.log(checkUpdateInfo);

  if (checkUpdateInfo) {
    var dataUpdate = init();
    updateInfoOfPet(dataUpdate);
  } else {
    addPetToList();
    console.log(petList);
  }
});