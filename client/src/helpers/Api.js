import Local from './Local';

/**
 * This is a helper class that places all "knowledge" about doing a fetch() in one place. 
 * Any component that needs to do a fetch() will import this class and call the corresponding method.
 * 
 * All methods call the internal/private _doFetch() method, which does all the work. It returns
 * a "unified" myresponse obj that has four properties:
 *   ok: true if the server response is OK, false otherwise
 *   data: the response data if OK, null otherwise
 *   status: the response status code if the server was reached; 0 otherwise
 *   error: the error message if there was either a server or network error, '' otherwise
 **/

class Api {

    //Login
    static async loginUser(username, password) {
        let body = { username, password };
        return await this._doFetch('/login', 'POST', body);
    }

    //Register
    static async registerUser(firstname, lastname, username, email, password) {
        let body = { firstname, lastname, username, email, password };
        return await this._doFetch('/register', 'POST', body);
    }

    //Get all owners
    static async getOwners() {
        return await this._doFetch('/owners');
    }

    // get one owner
    static async getOneOwner(id) {
        return await this._doFetch(`/owners/${id}`);
    }

    // get all pets of one owner
    static async getOwnerPets(id) {
        return await this._doFetch(`/owners/${id}/pets`);
    }

    //General GET (for any URL, like /pets, /appointments, /clinics)
    static async getContent(url) {
        return await this._doFetch(url);
    }

    //Get one pet, includes info on their vet/clinic and appointments
    static async getOnePet(id){
        return await this._doFetch(`/pets/${id}`);
    }

    //Post pet to owner NOTE: ID IN PARAMS IS IN REFERENCE TO THE OWNER'S ID
    static async addPet(id, petObj) {
        return await this._doFetch(`/pets/${id}/pets`, 'POST', petObj);
    }

    //Put to edit pet info
    static async changePet(id, petObj){
        return await this._doFetch(`/pets/${id}`, 'PUT', petObj);
    }

    // get one appointment - includes associated pet
    static async getOneAppointment(id) {
        return await this._doFetch(`/appointments/${id}`);
    }

    //Post appointment to pet - doesn't include id in params because this is the only POST
    //option for appointments. The PetId must be included in the appointmentObj to link it to the 
    //correct pet
    static async addAppointment(appointmentObj) {
        return await this._doFetch(`/appointments`, 'POST', appointmentObj);
    }

    //Put to edit appointment info
    static async changeAppointment(id, appointmentObj){
        return await this._doFetch(`/appointments/${id}`, 'PUT', appointmentObj);
    }

    //Delete appointment
    static async deleteAppointment(id){
        return await this._doFetch(`/appointments/${id}`, 'DELETE');
    }

    //Get one clinic - includes associated pets
    static async getOneClinic(id) {
        return await this._doFetch(`/clinics/${id}`);
    }

    //Post new clinic
    static async addClinic(clinicObj) {
        return await this._doFetch(`/clinics`, 'POST', clinicObj);
    }

    //Put to edit clinic info
    static async changeClinic(id, clinicObj){
        return await this._doFetch(`/clinics/${id}`, 'PUT', clinicObj);
    }

    //Post clinic to pet NOTE: ID IN PARAMS IS IN REFERENCE TO THE PET'S ID
    static async addPetClinic(id, clinicObj) {
        return await this._doFetch(`/clinics/${id}/clinics`, 'POST', clinicObj);
    }

    static async _doFetch(url, method = 'GET', body = null) {
        let options = {
            method,
            headers: {}
        };

        //Add token to headers if it exists in localStorage

        let token = Local.getToken();
        if (token) {
            options.headers['Authorization'] = 'Bearer ' + token;
        }

        if (body) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }

        let uresponse = { ok: false, data: null, status: 0, error: ''};
        try {
            let response = await fetch(`/api${url}`, options);
            if (response.ok) {
                uresponse.ok = true;
                uresponse.data = await response.json();
                uresponse.status = response.status;
            } else {
                uresponse.status = response.status;
                uresponse.error = response.statusText;
            }
        } catch(err) {
            uresponse.error = err.message;
        }

        return uresponse;
    }
}

export default Api;