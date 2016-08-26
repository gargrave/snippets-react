import toastr from 'toastr';


export default function configureApp() {
  /*=============================================
   = Toastr.js config
   =============================================*/
  toastr.options.timeOut = 1650;
  toastr.options.progressBar = false;
  toastr.options.preventDuplicates = true;
  toastr.options.closeButton = true;
  toastr.options.showMethod = 'slideDown';
}
