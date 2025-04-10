///LES ATTRIBUTS: email, password, prenom, nom, adresse

import { IonAlert, IonButton, IonInput, IonItem } from "@ionic/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router";

const Register: React.FC = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useHistory();


    const hanbleSubmit = () => {

        console.log('nom', nom);

        // Changez password par pwd dans la condition
        if (!nom || !prenom || !email || !pwd) {
            setAlertMessage("Veuillez remplir tous les champs!")
            setShowAlert(true);
            return;
        }

        //Ajout utilisateur avec createUserWithEmailAndPassword
        createUserWithEmailAndPassword(auth, email, pwd)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                setDoc(doc(db, "users", user.uid), {
                    prenom,
                    nom,
                    email,
                    uid: user.uid
                })
                setAlertMessage("Vous êtes bien inscrit")
                setShowAlert(true);
            })
            .catch((error) => {

                const errorMessage = error.message;
                setAlertMessage(errorMessage);
                setShowAlert(true);

            });
    }

    return (
        <>
            <IonItem>
                <IonInput label="Votre prénom" labelPlacement="floating"
                    placeholder="Saisir votre prénom"
                    value={prenom} onIonChange={(e) => setPrenom(e.detail.value!)}
                ></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Votre nom" labelPlacement="floating"
                    placeholder="Saisir votre nom"
                    value={nom} onIonChange={(e) => setNom(e.detail.value!)}

                ></IonInput>
            </IonItem>

            <IonItem>
                <IonInput label="Votre email" labelPlacement="floating"
                    placeholder="Saisir votre email"
                    value={email} onIonChange={(e) => setEmail(e.detail.value!)}
                />
            </IonItem>

            <IonItem>
                <IonInput label="Votre mot de passe" labelPlacement="floating"
                    placeholder="Saisir votre mot de passe" type="password"
                    value={pwd} onIonInput={(e) => setPwd(e.detail.value!)}

                />
            </IonItem>

            <IonButton onClick={hanbleSubmit} expand="full">S'inscrire</IonButton>
            <IonAlert
                isOpen={showAlert}
                message={alertMessage}
                buttons={[{
                    text: "ok",
                    handler: () => {
                        setShowAlert(false);
                        navigate.push("/user")
                    }
                }]}
            />
        </>
    )
}
export default Register;