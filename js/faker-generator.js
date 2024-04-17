import * as faker from 'https://esm.sh/@faker-js/faker';
import {getAdditionalValueParamInput} from './dom-helpers.js';

let localeFaker = new faker.Faker({locale: faker[['en']]});
const defaultFaker = faker.faker;
const columnsDefinitions = await fetch('./json/columns-definitions.json').then(res => res.json());

export const fakerGenerator = {
    firstName: () => {
        return localeFaker.person.firstName();
    },
    lastName: () => {
        return localeFaker.person.lastName();
    },
    middleName: () => {
        try {
            return localeFaker.person.middleName();
        } catch (e) {
            return defaultFaker.person.middleName();
        }
    },
    fullName: () => {
        try {
            return localeFaker.person.fullName();
        } catch (e) {
            return defaultFaker.person.fullName();
        }
    },
    phoneNumber: () => {
        try {
            return localeFaker.phone.number();
        } catch (e) {
            return defaultFaker.phone.number();
        }
    },
    email: () => {
        try {
            return localeFaker.internet.email();
        } catch (e) {
            return defaultFaker.internet.email();
        }
    },
    companyName: () => {
        try {
            return localeFaker.company.name();
        } catch (e) {
            return defaultFaker.company.name();
        }
    },
    price: () => {
        return localeFaker.commerce.price();
    },
    currencyCode: () => {
        return defaultFaker.finance.currencyCode();
    },
    color: () => {
        return localeFaker.internet.color();
    },
    password: () => {
        return localeFaker.internet.password();
    },
    city: () => {
        try {
            return localeFaker.location.city();
        } catch (e) {
            return defaultFaker.location.city();
        }
    },
    country: () => {
        try {
            return localeFaker.location.country();
        } catch (e) {
            return defaultFaker.location.country();
        }
    },
    countryCode: () => {
        try {
            return localeFaker.location.countryCode();
        } catch (e) {
            return defaultFaker.location.countryCode();
        }
    },
    street: () => {
        try {
            return localeFaker.location.street();
        } catch (e) {
            return defaultFaker.location.street();
        }
    },
    state: () => {
        try {
            return localeFaker.location.state();
        } catch (e) {
            return defaultFaker.location.state();
        }
    },
    elementFromList: () => {
        const value = getAdditionalValueParamInput().value;
        const valArray = value.split(',');
        return localeFaker.helpers.arrayElement(valArray);
    },
    paragraph: () => {
        const value = getAdditionalValueParamInput().value;
        return localeFaker.lorem.paragraph(+value);
    },
    words: () => {
        const value = getAdditionalValueParamInput().value;
        return localeFaker.lorem.paragraph(+value);
    },
};

function getColumnTypeDefinition(type) {
    return columnsDefinitions.find(c => c.type === type);
}

export function setFakerLocale(lang) {
    console.log({lang, faker});
    localeFaker = new faker.Faker({locale: faker[lang]});
}

export function generateItems(itemsCount, columns) {
    const elements = [];
    const typesDefinitions = {};
    for (let i = 0; i < itemsCount; i++) {
        const obj = {};
        for (const column of columns) {
            const {name, type, unique} = column;
            let generatedValue = fakerGenerator[type]();

            if (!typesDefinitions[type]) {
                typesDefinitions[type] = getColumnTypeDefinition(type);
            }

            if (!unique || !typesDefinitions[type].canBeUnique) {
                obj[name] = generatedValue;
            } else {
                while (elements.find(el => el[name] === generatedValue)) {
                    generatedValue = fakerGenerator[type]();
                }
            }
        }
        elements.push(obj);
    }
    console.log(elements);
    return elements;
}
