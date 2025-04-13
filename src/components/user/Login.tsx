///LES ATTRIBUTS: email, password, prenom, nom, adresse

import { IonAlert, IonButton, IonInput, IonItem } from "@ionic/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useHistory } from "react-router";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const history = useHistory();
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const hanbleSubmit = () => {
        console.log(pwd);

        if (!email) {
            setAlertMessage("Vous êtes bien connecté");
            setShowAlert(true);
            return;
        }

        signInWithEmailAndPassword(auth, email, pwd)
            .then(async (userCredential) => {
                setAlertMessage("Veuillez remplir tous les champs!")
                setShowAlert(true);
                // Signed in 
                const user = userCredential.user;
                const userData = await getDoc(doc(db, "users", user.uid));
                history.push("/profil")

                console.log(userData);

                if (userData.exists()) {
                    localStorage.setItem("user", JSON.stringify(userData.data()));
                    history.push("/profil")
                }

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                setAlertMessage(error.message);
            });

    }

    return (
        <>
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

            <IonButton onClick={hanbleSubmit} expand="full">Se connecter</IonButton><IonAlert
                isOpen={showAlert}
                message={alertMessage}
                buttons={[{
                    text: "ok",
                    handler: () => {
                        setShowAlert(false);
                    }
                }]}
            />
        </>
    )
}
export default Login;