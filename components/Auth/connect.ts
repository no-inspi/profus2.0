import axios from "axios";
import Cookies from 'js-cookie';

function connexion(data: any, url: string, setIsConnected: any, onCloseLogin: any, toast: any) {
  axios({
    method: 'post',
    url: "https://profus-api-1-0.vercel.app/auth/login",
    headers: {},
    data: {
      "pseudo": data.pseudo,
      "password": data.password
    }
  })
    .then((response) => {
      if (response.status == 200) {

        Cookies.set('accessToken', response.data.accessToken, { expires: 1 });
        Cookies.set('refreshToken', response.data.refreshToken, { expires: 2 });
        // window.location.href = url
        setIsConnected(true)
        onCloseLogin()
        toast({
          title: 'Connexion Réussie !',
          // description: "Le taux a bien été mit à jour ! Merci !",
          status: 'success',
          duration: 7000,
          isClosable: true,
        })
      }
      else {


      }

    }, (error) => {
      if (error.response.status == 403) {
        console.log("error on sign in")
        toast({
          title: "Pseudo ou mot de passe incorrect ",
          description: "Veuillez réessayer",
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      }
    });

}

export default connexion;