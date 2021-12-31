import Swal  from "sweetalert2"


export const alertTimer = (icon, title, timer=1500) => {
   Swal.fire({
      position: 'top-end',
      icon,
      title,
      showConfirmButton: false,
      timer
    })
}