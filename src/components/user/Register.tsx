///LES ATTRIBUTS: email, password, prenom, nom, adresse

import { IonButton, IonInput, IonItem } from "@ionic/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register: React.FC = () =>{
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const hanbleSubmit= ()=>{
        console.log(pwd);
        
        //Ajout utilisateur avec createUserWithEmailAndPassword
        createUserWithEmailAndPassword(auth, email, pwd)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            setDoc(doc(db,"users", user.uid),{
                prenom,
                nom,
                email,
                uid: user.uid
            })
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            
        });
    }

    return (
        <>
        <IonItem>
            <IonInput label="Votre prénom" labelPlacement="floating" 
            placeholder="Saisir votre prénom"
            value={prenom} onIonChange={(e) =>setPrenom(e.detail.value!)}
            ></IonInput>
        </IonItem>

        <IonItem>
            <IonInput label="Votre nom" labelPlacement="floating" 
            placeholder="Saisir votre nom"
            value={nom} onIonChange={(e) =>setNom(e.detail.value!)}

            ></IonInput>
        </IonItem>

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

        <IonButton onClick={hanbleSubmit} expand="full">S'inscrire</IonButton>
        </>
    )
}
export default Register;