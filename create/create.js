import { createBunny, getFamilies, checkAuth, logout } from '../fetch-utils.js';
import { renderOption } from '../render-utils.js';

const form = document.querySelector('.bunny-form');
const familySelect = document.getElementById('family_id');
const logoutButton = document.getElementById('logout');


form.addEventListener('submit', async (e) => {
    // prevent default
    e.preventDefault();

    // get the name and family id from the form
    const bunnyform = new FormData(form);
    console.log(bunnyform.get('family_id'));
    await createBunny({
        name: bunnyform.get('bunny-name'),
        family_id: bunnyform.get('family_id'),
    });

    // use createBunny to create a bunny with this name and family id
    
    form.reset();
});

window.addEventListener('load', async () => {
    // let's dynamically fill in the families dropdown from supabase
    
    const families = await getFamilies();
    console.log(families);
    for (let family of families) {
        const familyRender = renderOption(family);
        familySelect.append(familyRender);
    }
    // grab the select HTML element from the DOM

    // go get the families from supabase

    // for each family

    // create an option tag

    // set the option's value and text content

    // and append the option to the select
});



checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});
