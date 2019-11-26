// check for valid email 
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(email.match(regEx)) return true;
else return false;
}

// check for empty string function
const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
}

exports.validateSignupData = (data) => {

    //declare all errors
        let errors = {}

    // check for email
        if(isEmpty(data.email)){
            errors.email = "email is required";
        } else if(!isEmail(data.email)) {
            errors.email = "Valid email address is required ";
        }

    // check for password and matching passwordconfirmation
        if(isEmpty(data.password)) errors.password = 'Must not be empty';
        if(data.password !== data.confirmPassword) errors.confirmpassword = 'passwords dont match';
    // check user handle
        if(isEmpty(data.handle)) errors.handle = 'Must not be empty';

        return {
            errors,
            valid: Object.keys(errors).length === 0 ? true : false
        }

}

exports.validateLoginData = (data) => {
    let errors = {}

    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Password is empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }

}