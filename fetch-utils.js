// Create your own supabase database using the provided seeds.sql file
const SUPABASE_URL = 'https://wuqcwgxturbjhkdtdjwn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1cWN3Z3h0dXJiamhrZHRkanduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI3MjQ0MjMsImV4cCI6MTk2ODMwMDQyM30.qVkreSGtYAMaEk7THSwEY_1E0AB9q0iNMjuFXHaIa8Q';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getFamilies() {
    // fetch all families and their bunnies
    const response = await client.from('loving_families').select('*, fuzzy_bunnies(*)');
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }

    return checkError(response);
}

export async function deleteBunny(id) {
    // delete a single bunny using the id argument
    const response = await client.from('fuzzy_bunnies').delete().eq('id', id);

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
    

    return checkError(response);
}

export async function createBunny(bunny) {
    // create a bunny using the bunny argument
    const response = await client.from('fuzzy_bunnies').insert({ ...bunny, user_id: client.auth.session().user.id
    });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }

    return checkError(response);
}

// MARTHA STEWART (PRE-MADE) FUNCTIONS

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
