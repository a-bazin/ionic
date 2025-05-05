///LES ATTRIBUTS: email, password, prenom, nom, adresse

import { IonAlert, IonButton, IonInput, IonItem, IonLabel, IonText } from "@ionic/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useHistory } from "react-router";


interface RegisterProps {
  onRegisterSuccess: () => void;
}

// const Register: React.FC = () => {
const Register: React.FC<RegisterProps> = ({ onRegisterSuccess }) => {

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useHistory();

    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

      const [confirmPwd, setConfirmPwd] = useState("");
  const [adresse, setAdresse] = useState("");

    const hanbleSubmit = () => {

        console.log('nom', nom);

        // Changez password par pwd dans la condition
        if (!nom || !prenom || !email || !pwd) {
            setAlertMessage("Veuillez remplir tous les champs!")
            setShowAlert(true);
            return;
        }

        if (!isValidEmail(email)) {
            setAlertMessage("Veuillez entrer une adresse valide!")
            setShowAlert(true)
            return;
        }

        if (!passwordRegex.test(pwd)) {
            setAlertMessage("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
            setShowAlert(true);
            return;
        }

           if (pwd !== confirmPwd) {
      setAlertMessage("Les mots de passe ne correspondent pas.");
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
                    adresse,
                    uid: user.uid
                })
                setAlertMessage("Vous êtes bien inscrit")
                // setShowAlert(true);
                // Appel de la fonction passée en props
                onRegisterSuccess();
            })
            .catch((error) => {
        

        switch (error.code) {
            case "auth/email-already-in-use":
                setAlertMessage("Cette adresse e-mail est déjà utilisée.");
                break;
            case "auth/invalid-email":
                setAlertMessage("L'adresse e-mail est invalide.");
                break;
            case "auth/weak-password":
                setAlertMessage("Le mot de passe est trop faible (minimum 6 caractères).");
                break;
            case "auth/missing-password":
                setAlertMessage("Veuillez entrer un mot de passe.");
                break;
            default:
                setAlertMessage("Une erreur est survenue. Veuillez réessayer.");
        }

        
    });
    setShowAlert(true);
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
            <IonText color={passwordRegex.test(pwd) ? "success" : "danger"}>
          {pwd && (
            <p style={{ paddingLeft: "15px", fontSize: "12px" }}>
              {passwordRegex.test(pwd) ? "Mot de passe valide" : "Doit contenir 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, 1 spécial"}
            </p>
          )}
        </IonText>
        <IonItem>
          <IonLabel position="floating">Confirmer votre mot de passe *</IonLabel>
          <IonInput type="password" value={confirmPwd} onIonChange={(e) => setConfirmPwd(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Adresse *</IonLabel>
          <IonInput value={adresse} onIonChange={(e) => setAdresse(e.detail.value!)} />
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