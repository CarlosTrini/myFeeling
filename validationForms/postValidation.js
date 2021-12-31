import { alertTimer } from '../helpers/sweetAlerts';
const postValidation = async(data, limits, imgFile, localStorageFn, success) => {
   const { category, title, description, storybody, writer } = data;
   const {limitTitle, limitDescription, limitStory} = limits;

   if ([category, title, description, storybody].includes('')) return alertTimer('error', 'Todos los campos son obligatorios');

   if(title.length > limitTitle) return alertTimer('info', 'Titulo sobrepasa el límite', 2000);
   if(description.length > limitDescription) return alertTimer('info', 'La descripción sobrepasa el límite', 2000);
   if(storybody.length > limitStory) return alertTimer('info', 'La historia sobrepasa el límite', 2000);

   if (!imgFile) return alertTimer('error', 'La imagen es necesaria');

   data.createAt = Date.now();

   if ([writer.id, writer.name, data.createAt].includes('')) {
      localStorageFn(data); //just save in localStorage if there is this case
      alertTimer('info', 'Ocurrió un error interno al capturar tu usuario o la fecha', 3000);
   }

   //success function -> just when all is alright
   const dataResponse = await success(data, imgFile);
   console.log(dataResponse)


}
export default postValidation;