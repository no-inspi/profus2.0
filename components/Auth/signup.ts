import axios from "axios";
import Cookies from 'js-cookie';

function inscription(data: any, url: string, setIsConnected: any, onCloseSignup: any, toast: any) {
    axios({
        method: 'post',
        url: "https://profus-api-1-0.vercel.app/auth/register",
        headers: {}, 
        data: {
            "email": data.email,
            "password": data.passwordSignup,
            "passwordConfirm": data.verifpasswordsignup,
            "pseudo": data.pseudoSignup
        }
      })
      .then((response) => {
        if (response.status == 200) {
            console.log(response)
            
            Cookies.set('accessToken', response.data.accessToken, { expires: 1 });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 2 });
            // window.location.href = url
            setIsConnected(true)
            onCloseSignup()
            toast({
                title: 'Inscription Réussie !',
                // description: "Le taux a bien été mit à jour ! Merci !",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
      }, (error) => {
        console.log(error.response.data.error)
        if (error.response.status == 400) {
          console.log("error on sign up")
          toast({
            title: error.response.data.error,
            description: "Veuillez réessayer",
            status: 'error',
            duration: 7000,
            isClosable: true,
          })
        }
      });

}

export default inscription;