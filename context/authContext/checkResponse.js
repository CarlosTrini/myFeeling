const checkResponse = (codeToCheck) => {
   const errorsSelector = {
      'auth/email-already-in-use': 'Este email ya está siendo utilizado',
      'auth/weak-password':'Contraseña débil',
      'auth/internal-error':'Ha ocurrido un error',
      'auth/invalid-email':'El correo no es correcto',
      'auth/user-not-found': 'Este usuario no fue encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Algo está sucediendo, intente más tarde'
   }

   return errorsSelector[codeToCheck];
}
export default checkResponse;