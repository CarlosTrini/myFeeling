import { alertTimer } from "../helpers/sweetAlerts";

const commentValidationFn = async(data, successFn) => {
   const { comment, limitComment, username, id, idstory } = data;

   if (comment.length > limitComment) {
      return alertTimer('error', 'Has excedido el límite de caráteres permitidos en el comentario', 2500);
   }
   if (comment === '') {
      return alertTimer('error', 'No puedes enviar un comentario vacío', 2500);
   }
   if(!username || !id){
      return alertTimer('error', 'Inténtanlo de nuevo');
   }
   return await successFn({comment, id, username}, idstory);
}

export default commentValidationFn