'use strict';

const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const check_vaccinated = document.getElementById('input-vaccinated');
const check_dewormed = document.getElementById('input-dewormed');
const check_sterilized = document.getElementById('input-sterilized');
const tableBodyEl = document.getElementById('tbody');
const submit = document.getElementById('submit-btn');
const healthyPet = document.getElementById('healthy-btn');
const buttonCaculateBMI = document.getElementById('caculate-bmi');
const petList = [];
const healthyPetList = [];
let listPetBMI = [];
let checkHealthyPet = false;
let checkResultBMI = false;
let checkUpdateInfo = false;

const init = () => ({
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
    "date": formatDate(new Date()),
})

function checkIdToAdd(petId) {
    if (Array.isArray(petList) && petList.length >= 1) {
        //Some method support check id exists list return true or false
        return petList.some(item => item.id === petId);
    }
    return false;
}

function checkDataValid(data) {
    if (!Boolean(data.id) || !Boolean(data.name) || !Boolean(data.age)
        || !Boolean(data.weight) || !Boolean(data.length_pet) || !Boolean(data.color)) {
        alert('Please , fill all filed data ')
    } else {
        if (!checkUpdateInfo) {
            let checkIdUnique = checkIdToAdd(data.id);
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
    const dataInsert = init();
    if (checkDataValid(dataInsert)) {
        petList.push(dataInsert);
        resetInput();
        showAllList();
    }
}

function setUpIconCheckIn(cell, value) {

    const checked = 'bi bi-check-circle-fill';
    const unchecked = 'class="bi bi-x-circle-fill';
    const icon = document.createElement('i');
    icon.className = Boolean(value) ? checked : unchecked;
    cell.appendChild(icon);
}

function applyColor(selectedColor, cellColor) {
    //Create i tag and apply color value for attribute 
    const colorIcon = document.createElement('i');
    colorIcon.className = 'bi bi-square-fill';
    colorIcon.style.color = selectedColor;
    cellColor.appendChild(colorIcon);
}

//The way 1 
function createRowInTable(petList) {

    tableBodyEl.innerHTML = '';
    for (let index = 0; index < petList.length; index++) {
        //Create row
        const row = document.createElement('tr');

        const cellId = document.createElement('th');
        console.log(petList[index].id);
        const idValue = petList[index].id;
        cellId.textContent = idValue;
        row.appendChild(cellId);

        const cellName = document.createElement('td');
        cellName.textContent = petList[index].name;
        row.appendChild(cellName);

        const cellAge = document.createElement('td');
        cellAge.textContent = petList[index].age;
        row.appendChild(cellAge);

        const cellType = document.createElement('td');
        const typeValue = petList[index].type;
        cellType.textContent = typeValue;
        row.appendChild(cellType);

        const cellWeight = document.createElement('td');
        const weightValue = petList[index].weight;
        cellWeight.textContent = `${weightValue} kg`;
        row.appendChild(cellWeight);

        const cellLength = document.createElement('td');
        const lengthValue = petList[index].length_pet;
        cellLength.textContent = `${lengthValue} cm`;
        row.appendChild(cellLength);

        const cellBreed = document.createElement('td');
        cellBreed.textContent = petList[index].breed;
        row.appendChild(cellBreed);

        const cellColor = document.createElement('td');
        const color = petList[index].color;
        row.appendChild(cellColor);
        applyColor(color, cellColor);

        const cellVaccinated = document.createElement('td');
        const vaccinatedValue = petList[index].vaccinated;
        row.appendChild(cellVaccinated);
        setUpIconCheckIn(cellVaccinated, vaccinatedValue);

        const cellDewormed = document.createElement('td');
        const dewormedValue = petList[index].dewormed;
        row.appendChild(cellDewormed);
        setUpIconCheckIn(cellDewormed, dewormedValue);

        const cellSterilized = document.createElement('td');
        const sterillizedValue = petList[index].sterilized;
        row.appendChild(cellSterilized);
        setUpIconCheckIn(cellSterilized, sterillizedValue);

        const cellBMI = document.createElement('td');
        // cellBMI.textContent = resultBMI(typeValue, weightValue, lengthValue);
        cellBMI.textContent = '?';
        cellBMI.textContent = !checkResultBMI ? '?' : (listPetBMI[index]) ? listPetBMI[index] : '?';
        row.appendChild(cellBMI);

        const cellDate = document.createElement('td');
        cellDate.textContent = petList[index].date;
        row.appendChild(cellDate);

        const cellEdit = document.createElement('td');
        createButtonEdit(cellEdit, idValue);
        row.appendChild(cellEdit);

        const cellDelete = document.createElement('td');
        createButtonDelete(cellDelete, idValue);
        row.appendChild(cellDelete);

        //Add row to tbody 
        tableBodyEl.appendChild(row);
    }
}

//The way 2 
const createRowInTable2 = (petList) => {
    tableBodyEl.innerHTML = "";
    let html = "";

    for (let index = 0; index < petList.length; index++) {
        // html += `<tr>
        //        <td>${petList[index].id}</td>
        //        <td>${petList[index].name}</td>
        //        <td>${petList[index].age}</td>
        //        <td>${petList[index].type}</td>
        //        <td>${petList[index].weight}</td>
        //        <td>${petList[index].length_pet}</td>
        //        <td>${petList[index].breed}</td>
        //        <td><button onclick="deletePet(this)" class = "btn btn-danger btn-delete">Delete</button></td>
        //     </tr>`

        html += `<tr>
        <td>${petList[index].id}</td>
        <td>${petList[index].name}</td>
        <td>${petList[index].age}</td>
        <td>${petList[index].type}</td>
        <td>${petList[index].weight}</td>
        <td>${petList[index].length_pet}</td>
        <td>${petList[index].breed}</td>
        <td><button class = "btn-delete">Delete</button></td>
     </tr>`

    }
    tableBodyEl.innerHTML = html;
}
/*
//How to way another delete 
const deletePet = function (pet) {
    
    // parentElement : Cho biết phần tử cha trực tiếp của phần tử DOM 
    // , trả về phần tử DOM cha gần nhất của phần tử hiện tại trong cây DOM 
    
    // //Giải thích cú pháp 
    // let id = pet.parentElement.parentElement.children[0].innerHTML;
   
    // pet : Biến đại diện cho thú cưng cần xóa 
    // pet.parentElement : lấy ra thẻ td chứa nút delete 
    // pet.parentElement.parentElement : Lấy ra hàng <tr> chứa thẻ <td>
    // children[0] : lấy giá trị trong cột đầu tiên là cột chứa id  
    

    let id = pet.parentElement.parentElement.children[0].innerHTML;
    console.log(pet.parentElement.parentElement.children[0].innerHTML);
    console.log(pet.parentElement.parentElement.children[0].textContent);

    for (let i = 0; i < petList.length; i++) {
        if (petList[i].id === id) {
            petList.splice(i, 1);
            break;
        }
    }
    showAllList();
}
//Another way 
// const deleteEls = document.querySelectorAll("button");
// for (let i = 0; i < petList.length; i++) {
//     deleteEls[i].addEventListener('click', function () {
//         const pet_id = deleteEls[i].parentElement.parentElement.children[0].innerHTML;
//         deletePet2(pet_id);
//     });
// }
// showAllList();
*/
//get id by target 
tableBodyEl.addEventListener('click', function (event) {
    /*
        Giải thích cú pháp : Biến event đại diện cho sự kiện click 
        event.target.className : Lấy ra phần tử mục tiêu của sự kiện click
    */
    if (event.target.className !== "btn-delete") return;
    const isDelete = confirm("Bạn có chắc chắn muốn xóa hay không ?");
    if (isDelete) {
        const id = event.target.parentElement.parentElement.children[0].innerHTML;
        deletePet2(id);
    }
})
//Delete function 
function deletePet2(id) {
    for (let i = 0; i < petList.length; i++) {
        if (petList[i].id === id) {
            petList.splice(i, 1);
            break;
        }
    }
    showAllList();
}


function showAllList() {
    createRowInTable(petList);
}

function showHealthyPet() {
    resultBMI();
    petList.forEach(item => {
        if (item.vaccinated && item.dewormed && item.sterilized) {
            let idPetList = item.id;
            let indexPetId = healthyPetList.findIndex(item => item.id === idPetList);
            if (indexPetId === -1) {
                healthyPetList.push(item);
                console.log(healthyPetList);
            }
        }
    })
    createRowInTable(healthyPetList);
}

healthyPet.addEventListener('click', function () {

    if (!healthyPet.classList.contains('showAll')) {
        healthyPet.textContent = 'Show All Pet';
        healthyPet.classList.add('showAll');
        showHealthyPet();
        checkHealthyPet = false;
    } else {
        healthyPet.textContent = 'Show Healthy Pet';
        healthyPet.classList.remove('showAll');
        showAllList();
        checkHealthyPet = true;
    }
});
function resultBMI(type, weight, length) {
    let bmiType;
    if (type === 'Cat') {
        bmiType = ((weight * 703) / length ** 2);
    }
    if (type === 'Dog') {
        bmiType = ((weight * 886) / length ** 2);
    }
    //? : Có giá trị thì mới nhảy vào 
    return bmiType?.toFixed(2);
}

buttonCaculateBMI.addEventListener('click', function () {
    checkResultBMI = true;
    listPetBMI = [];
    petList.forEach(item => {
        let bmiItem = resultBMI(item.type, item.weight, item.length_pet);
        listPetBMI.push(bmiItem);
    })
    console.log(listPetBMI);
    if (checkHealthyPet) {
        showHealthyPet();
    } else {
        showAllList();
    }
})
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

const arrowEditFunction = (pet) => {
    const index = petList.findIndex(item => item.id === pet.id);
    console.log("Pet ", petList[index]);
    setValue(petList[index]);
    //set value form
    if (index !== -1) {
        //Update data 
        console.log("data update", pet);
        if (checkDataValid(pet)) {
            petList[index] = pet;
            listPetBMI[index] = resultBMI(pet.type, pet.weight, pet.length_pet);
        }
    }
}

function createButtonEdit(cellEdit, petId) {
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'btn btn-info';
    editButton.textContent = 'Edit';
    cellEdit.appendChild(editButton);

    editButton.addEventListener('click', function () {
        checkUpdateInfo = true;
        idInput.setAttribute("readonly", true);
        const pet = petList.find(item => item.id === petId);
        arrowEditFunction(pet);
    });

    //Update bml pet 
}

function updateInfoOfPet(dataUpdate) {
    arrowEditFunction(dataUpdate);
    resetInput();
    idInput.removeAttribute("readonly");
    showAllList();
}


function createButtonDelete(cellDelete, petId) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'btn btn-danger';
    deleteButton.textContent = 'Delete';
    cellDelete.appendChild(deleteButton);

    deleteButton.addEventListener('click', function () {
        arrowDeleteFunction(petId);
    });
}

const arrowDeleteFunction = (petId) => {
    //Delete data with id 
    const index = petList.findIndex(item => item.id === petId);
    if (index !== -1 && confirm('Are you sure?')) {
        console.log('Before delete ', petList.length);
        petList.splice(index, 1);
        console.log('After delete ', petList.length);
        tableBodyEl.innerHTML = '';
        resetInput();
        showAllList();
    }
}

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
    const day = date.getDate().toString().padStart(2, '0');
    //  Get day (note : the month start 0) and ensure it has the least two number (lưu ý rằng tháng bắt đầu từ 0) và đảm bảo rằng nó có ít nhất 2 chữ số
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

submit.addEventListener('click', function () {
    //Update info
    console.log(checkUpdateInfo);
    if (checkUpdateInfo) {
        const dataUpdate = init();
        updateInfoOfPet(dataUpdate);
    } else {
        addPetToList();
        console.log(petList);
    }
});

