import { regexEmail } from "../helpers/constants";
import { alertTimer } from "../helpers/sweetAlerts";

const loginValidation = (data, successFn) => {
   const { email, password } = data;

   if ([email, password].includes('')) return alertTimer('error', 'Los campos son obligatorios');
   if (!regexEmail.test(email)) return alertTimer('error', 'Correo no válido');

   //success function
   successFn(data);
}
export default loginValidation;