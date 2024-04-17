const elements = {
    nameInput: null,
    typeSelect: null,
    uniqueCheckbox: null,
    columnsDiv: null,
    additionalValueParam: null,
    additionalValueParamInput: null,
    additionalValueParamLabel: null,
    localeSelect: null,
    itemsCountInput: null,
    separatorInput: null,
    includeHeadersCheckbox: null,
    resultTextarea: null,
};

function getElementMemo(selector, memoKey) {
    if (!elements[memoKey]) {
        elements[memoKey] = document.querySelector(selector);
    }
    return elements[memoKey];
}

export function getNameInput() {
    return getElementMemo('input#name', 'nameInput');
}

export function getTypeSelect() {
    return getElementMemo('select#type', 'typeSelect');
}

export function getLocaleSelect() {
    return getElementMemo('select#locale', 'localeSelect');
}

export function getUniqueCheckbox() {
    return getElementMemo('input#unique', 'uniqueCheckbox');
}

export function getColumnsDiv() {
    return getElementMemo('.columns', 'columnsDiv');
}

export function getAdditionalValueParam() {
    return getElementMemo('.value-param', 'additionalValueParam');
}

export function getAdditionalValueParamInput() {
    return getElementMemo('.value-param input#value_param', 'additionalValueParamInput');
}

export function getAdditionalValueParamLabel() {
    return getElementMemo('.value-param label', 'additionalValueParamLabel');
}

export function getItemsCountInput() {
    return getElementMemo('input#items_count', 'itemsCountInput');
}

export function getIncludeHeadersCheckbox() {
    return getElementMemo('input#include_headers', 'includeHeadersCheckbox');
}

export function getSeparatorInput() {
    return getElementMemo('input#separator', 'separatorInput');
}

export function getResultTextarea() {
    return getElementMemo('textarea#result', 'resultTextarea');
}

export function hide(element) {
    element.setAttribute('hidden', '');
}

export function show(element) {
    element.removeAttribute('hidden');
}

export function updateColumns(columns, columnsDefinitions) {
    getColumnsDiv().innerHTML = columns.map(column => {
        const typeName = columnsDefinitions.find(cd => cd.value === column.type);
        return `<div class="column-item">
                  <div class="column-name">${column.name}</div>
                  <div class="column-type">${typeName.title}</div>
                  <div class="column-additional-value">${column.additionalValue}</div>
                  <div class="column-additional-value">${column.unique ? 'unique' : ''}</div>
                  <div class="close">&times;</div>
                </div>`;
    }).join('');
}

export function generateSelectOptions(columnsDefinitions) {
    getTypeSelect().innerHTML = columnsDefinitions.map(c => {
        const varName = c.varName ? `data-var-name="${c.varName}"` : '';
        const varValue = c.varValue ? `data-var-value="${c.varValue}"` : '';
        return `<option value="${c.value}" ${varName} ${varValue}>${c.title}</option>`;
    }).join('');
}

export function generateLocaleSelectOptions(langs) {
    getLocaleSelect().innerHTML = Object.keys(langs).map(code => {
        const selected = code === 'en' ? 'selected' : '';
        return `<option value="${code}" ${selected}>${langs[code]}</option>`;
    }).join('');
}
