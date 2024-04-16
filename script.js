const columns = [];
const nameInput = document.querySelector('input#name');
const typeSelect = document.querySelector('select#type');
const uniqueCheckbox = document.querySelector('input#unique');
const additionalValueParam = document.querySelector('.value-param');
const columnsDiv = document.querySelector('.columns');
const columnsDefinitions = [
    {value: '', title: 'Select'},
    {value: 'firstName', title: 'First name'},
    {value: 'middleName', title: 'Middle name'},
    {value: 'lastName', title: 'Last name'},
    {value: 'fullName', title: 'Full name'},
    {value: 'phoneNumber', title: 'Phone number'},
    {value: 'companyName', title: 'Company name'},
    {value: 'price', title: 'Price'},
    {value: 'currencyCode', title: 'Currency code'},
    {value: 'color', title: 'Color'},
    {value: 'password', title: 'Password'},
    {value: 'email', title: 'Email'},
    {value: 'elementFromList', title: 'Element from list', varName: 'Values (separated by comma)'},
    {value: 'paragraph', title: 'Paragraph', varName: 'Sentences', varValue: 3},
    {value: 'words', title: 'Words', varName: 'Count', varValue: 1},
    {value: 'city', title: 'City'},
    {value: 'country', title: 'Country'},
    {value: 'countryCode', title: 'Country code'},
    {value: 'street', title: 'Street'},
    {value: 'state', title: 'State'},
];

generateSelectOptions();
typeSelect.addEventListener('change', e => {
    console.log(e);
    const option = e.target.querySelector(`[value="${e.target.value}"]`);
    console.log(option);
    if (option.dataset.varName) {
        additionalValueParam.querySelector('label').innerText = option.dataset.varName;
        additionalValueParam.querySelector('#value_param').value = option.dataset.varValue || '';
        additionalValueParam.removeAttribute('hidden');
    } else {
        additionalValueParam.setAttribute('hidden', '');
    }
});

document.querySelector('#add_column').addEventListener('click', () => {
    let errors = false;

    [typeSelect, nameInput].forEach(node => {
        node.classList.remove('error');

        if (!node.value.length) {
            node.classList.add('error');
            errors = true;
        }
    });

    if (errors) {
        return;
    }

    const column = {
        name: nameInput.value,
        type: typeSelect.value,
        additionalValue: additionalValueParam.querySelector('#value_param').value,
        unique: uniqueCheckbox.checked,
    };
    columns.push(column);

    updateColumns();
});

function updateColumns() {
    columnsDiv.innerHTML = columns.map(column => {
        return `<div class="column-item">
                  <div class="column-name">${column.name}</div>
                  <div class="column-type">${column.type}</div>
                  <div class="column-additional-value">${column.additionalValue}</div>
                  <div class="column-additional-value">${column.unique?'unique':''}</div>
                  <div class="close">&times;</div>
                </div>`;
    }).join('');
}

function generateSelectOptions() {
    typeSelect.innerHTML = columnsDefinitions.map(c => {
        const varName = c.varName ? `data-var-name="${c.varName}"` : '';
        const varValue = c.varValue ? `data-var-value="${c.varValue}"` : '';
        return `<option value="${c.value}" ${varName} ${varValue}>${c.title}</option>`;
    }).join('');
}
