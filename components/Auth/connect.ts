import axios from "axios";
import Cookies from 'js-cookie';

function connexion(data: any, url: string, setIsConnected: any, onCloseLogin: any, toast: any) {
    console.log(data.pseudo)
    axios({
        method: 'post',
        url: "http://localhost:3001/auth/login",
        headers: {}, 
        data: {
            "pseudo": data.pseudo,
            "password": data.password
        }
      })
      .then((response) => {
        if (response.status == 200) {
            console.log(response)
            
            Cookies.set('accessToken', response.data.accessToken, { expires: 1 });
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 2 });
            // window.location.href = url
            setIsConnected(true)
            onCloseLogin()
            toast({
                title: 'Connexion Réussie !',
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

export default connexion;