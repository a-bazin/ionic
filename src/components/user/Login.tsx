import {
  IonAlert,
  IonButton,
  IonInput,
  IonItem,
  IonLoading,
} from "@ionic/react";
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
  const [isLoading, setIsLoading] = useState(false); // Ajout du spinner

  const handleSubmit = () => {
    if (!email || !pwd) {
      setAlertMessage("Veuillez remplir tous les champs !");
      setShowAlert(true);
      return;
    }

    setIsLoading(true); // Affiche le spinner
    signInWithEmailAndPassword(auth, email, pwd)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = await getDoc(doc(db, "users", user.uid));

        if (userData.exists()) {
            history.push("/profil");
         
        }
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code === "auth/invalid-credential") {
          setAlertMessage("Login ou mot de passe incorrect");
          setShowAlert(true);
        }
      });
  };

  return (
    <>
      <IonItem>
        <IonInput
          label="Votre email"
          labelPlacement="floating"
          placeholder="Saisir votre email"
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonInput
          label="Votre mot de passe"
          labelPlacement="floating"
          type="password"
          placeholder="Saisir votre mot de passe"
          value={pwd}
          onIonInput={(e) => setPwd(e.detail.value!)}
        />
      </IonItem>

      <IonButton onClick={handleSubmit} expand="full">
        Se connecter
      </IonButton>

      <IonAlert
  isOpen={showAlert}
  message={alertMessage}
  buttons={[
    {
      text: "OK",
      handler: () => {
        setShowAlert(false);
        if (alertMessage === "Vous êtes bien connecté !") {
          history.push("/profil");
        }
      },
    },
  ]}
/>
      <IonLoading
        isOpen={isLoading}
        message="Connexion en cours..."
        spinner="crescent"
      />
    </>
  );
};

export default Login;
