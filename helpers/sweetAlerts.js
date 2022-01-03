import Swal from "sweetalert2";


export const alertTimer = (icon, title, timer = 1500) => {
   Swal.fire({
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer
   }) 
}

export const alertOptions = async() => {
   const response = await Swal.fire({
      title: 'Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#003566',
      cancelButtonColor: '#960c0c',
      confirmButtonText: 'Sí, puedes eliminar!'
   })
   return response.isConfirmed;
  
}
