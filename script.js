import {
    generateLocaleSelectOptions,
    generateSelectOptions,
    getAdditionalValueParam,
    getAdditionalValueParamInput,
    getAdditionalValueParamLabel,
    getIncludeHeadersCheckbox,
    getItemsCountInput,
    getLocaleSelect,
    getNameInput,
    getResultTextarea,
    getSeparatorInput,
    getTypeSelect,
    getUniqueCheckbox,
    hide,
    show,
    updateColumns,
} from './css/js/dom-helpers.js';
import {generateItems, setFakerLocale} from './css/js/faker-generator.js';

const columnsDefinitions = await fetch('./json/columns-definitions.json').then(res => res.json());
const langs = await fetch('./json/langs.json').then(res => res.json());
const columnsFromLs = localStorage.getItem('columns');
const columns = columnsFromLs ? JSON.parse(columnsFromLs) : [];
if (columns.length) {
    updateColumns(columns, columnsDefinitions);
}
const typeSelect = getTypeSelect();
const localeSelect = getLocaleSelect();
const uniqueCheckbox = getUniqueCheckbox();


generateSelectOptions(columnsDefinitions);
generateLocaleSelectOptions(langs);

localeSelect.addEventListener('change', e => {
    setFakerLocale(e.target.value);
});

typeSelect.addEventListener('change', e => {
    const additionalValueParam = getAdditionalValueParam();
    const option = e.target.querySelector(`[value="${e.target.value}"]`);

    if (option.dataset.varName) {
        getAdditionalValueParamLabel().innerText = option.dataset.varName;
        getAdditionalValueParamInput().value = option.dataset.varValue || '';
        show(additionalValueParam);
    } else {
        hide(additionalValueParam);
    }
});

document.body.addEventListener('click', (e) => {
    if (e.target.matches('#add_column')) {
        addColumn();
        return;
    }
    if (e.target.matches('#generate')) {
        generate();
        return;
    }
    if (e.target.matches('.column-item .close')) {
        const columnItem = e.target.closest('.column-item');
        const columnName = columnItem.querySelector('.column-name').innerText;
        const columnIndex = columns.findIndex(col => col.name === columnName);
        columns.splice(columnIndex, 1);
        localStorage.setItem('columns', JSON.stringify(columns));
        updateColumns(columns, columnsDefinitions);
    }
});

function generate() {

    const itemsCount = +getItemsCountInput().value;
    const elements = generateItems(itemsCount, columns);

    const csvString = generateCsvString(elements);
    console.log(csvString);
    const textarea = getResultTextarea();
    textarea.value = csvString;
    show(textarea.parentNode);
}

function generateCsvString(arrOfObject) {
    const includeHeaders = getIncludeHeadersCheckbox().checked;
    const separator = getSeparatorInput().value;
    const csvColumns = Object.keys(arrOfObject[0]);
    const csvRows = arrOfObject.map(obj => csvColumns.map(column => {
        const val = obj[column];
        if (val.includes(separator)) {
            return `"${val}"`;
        }
        return val;
    }));
    const csvArray = [
        ...(includeHeaders ? [csvColumns] : []),
        ...csvRows,
    ];
    const csvString = csvArray.map(row => row.join(separator)).join('\n');
    return csvString;
}

function addColumn() {
    let errors = false;
    const nameInput = getNameInput();
    const additionalValueParamInput = getAdditionalValueParamInput();

    [typeSelect, nameInput, additionalValueParamInput].forEach(node => {
        node.classList.remove('error');

        if (!node.value.length && !node.closest('.form-element').hasAttribute('hidden')) {
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
        additionalValue: getAdditionalValueParamInput().value,
        unique: uniqueCheckbox.checked,
    };
    columns.push(column);
    localStorage.setItem('columns', JSON.stringify(columns));
    updateColumns(columns, columnsDefinitions);
}
