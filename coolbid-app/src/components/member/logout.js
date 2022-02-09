/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable space-before-function-paren */
/* eslint-disable react/prop-types */
/* eslint curly: 2, quotes: ["error", "double"] */
/* eslint eqeqeq: "off", curly: "error" */
import swal from 'sweetalert'

export default function Logout() {
  if (window.sessionStorage.getItem('userinfo')) {
    // 清sessionstorage
    window.sessionStorage.clear()
    swal({
      title: "登出成功",
      // text: "You clicked the button!",
      icon: "success",
      button: "下次再來！"
    }).then(() => {
      window.location.href = 'http://localhost:3000/'
    })
  }
}
