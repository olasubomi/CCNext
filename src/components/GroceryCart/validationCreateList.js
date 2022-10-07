const yup = require('yup');
const validationCreateList = yup.object().shape({
    valueProductName: yup.string()
    .max(254)
    .min(5)
    .required(),
    valueProductImage: yup.string().required() ,
    valueProductPrice: yup.number().required(),
    valueProductSize: yup.string().required(),
    valuePricePerOunce: yup.number().required(),
});

export default validationCreateList;
