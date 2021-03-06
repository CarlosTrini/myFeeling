import { regexEmail } from "../helpers/constants";
import { alertTimer } from "../helpers/sweetAlerts";

const registerValidation = (data, successFn) => {
   const { email, password, user } = data;

   if ([email, password, user].includes('')) return  alertTimer('error', 'Los campos son obligatorios');

    console.log(regexEmail.test(email))
    if(!regexEmail.test(email)) return alertTimer('error', 'Correo no válido');

   //success function
   successFn(data);
}
export default registerValidation;