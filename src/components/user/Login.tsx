///LES ATTRIBUTS: email, password, prenom, nom, adresse

import { IonButton, IonInput, IonItem } from "@ionic/react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Login: React.FC = () =>{
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const hanbleSubmit=  ()=>{
        console.log(pwd);
          signInWithEmailAndPassword(auth, email, pwd)
        .then(async(userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const userData = await getDoc(doc(db,"users", user.uid));
            
            console.log(userData);
            
            if (userData.exists()) {
                localStorage.setItem("user", JSON.stringify(userData.data()));
        }
            
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
       
    }

    return (
        <>
        <IonItem>
            <IonInput label="Votre email" labelPlacement="floating" 
            placeholder="Saisir votre email"
            value={email} onIonChange={(e) =>setEmail(e.detail.value!)}

            />
        </IonItem>

        <IonItem>
            <IonInput label="Votre mot de passe" labelPlacement="floating" 
            placeholder="Saisir votre mot de passe" type="password"
            value={pwd} onIonChange={(e) =>setPwd(e.detail.value!)}

            />
        </IonItem>

        <IonButton onClick={hanbleSubmit} expand="full">Se conecter</IonButton>
        </>
    )
}
export default Login;