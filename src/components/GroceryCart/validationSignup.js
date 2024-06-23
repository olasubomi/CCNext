import * as yup from 'yup';

const signupValidation = yup.object().shape({
    confPassword: yup
        .string()
        .oneOf(
            [yup.ref('password'), null],
            'Password did not match: Please try again...'
        )
        .max(254)
        .min(5)
        .required(),
    password: yup
        .string()
        .max(254)
        .min(5, 'Password is too short - should be 5 chars minimum.')
        .required(),
    email: yup
        .string()
        .max(254)
        .email()
        .required(),
    firstname: yup
        .string()
        .max(254)
        .min(3)
        .required(),
    lastname: yup
        .string()
        .max(254)
        .min(3)
        .required(),
    phoneNumber: yup
        .number()
        .required(),
    street: yup
        .string()
        .max(254)
        .min(3)
        .required(),
    city: yup
        .string()
        .max(254)
        .min(3)
        .required(),
    zipCode: yup
        .number()
        .required(),
    ipsid: yup
        .number()
        .required(),

});
export default signupValidation;