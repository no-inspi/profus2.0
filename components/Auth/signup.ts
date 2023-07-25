import axios from "axios";
import Cookies from 'js-cookie';

function inscription(data: any, url: string, setIsConnected: any, onCloseSignup: any, toast: any) {
    axios({
        method: 'post',
        url: "http://localhost:3001/auth/register",
        headers: {}, 
        data: {
            "email": data.email,
            "password": data.passwordSignup,
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
        else {
            console.log("error on signup")
        }
        
      }, (error) => {
        console.log(error);
      });

}

export default inscription;