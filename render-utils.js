export function renderFamily(family) {
    const div = document.createElement('div');
    div.classList.add('family');
    console.log(family);
    const h2 = document.createElement('h2');
    h2.textContent = family.name;


    div.append(h2);


    return div;
}

export function renderOption(family) {
    //console.log(family);
    const option = document.createElement('option');
    option.value = family.id;
    option.textContent = family.name;
    return option;
}