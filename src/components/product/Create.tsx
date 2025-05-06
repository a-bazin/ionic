import { IonButton, IonCol, IonGrid, IonImg, IonInput, IonItem, IonRow, IonToast } from "@ionic/react";
import { base64FromPath, usePhotoGallery } from "../../hooks/usePhotoGallery";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";
import { useHistory } from "react-router";
import { Preferences } from "@capacitor/preferences";



const Create: React.FC = () => {
   const { photos, takePhoto } = usePhotoGallery();

   const [ nom, setNom] = useState("");
   const [ description, setDescription] = useState("");
   const [ prix, setPrix] = useState("");

   /**********Message ****** */
   const [ message, setMessage] = useState("");
   const [ showMessage, setShowMessage] = useState(false);
   
const history = useHistory();



   const handleSumbit =async() => {
    // Recuperation du user connecté
    const user = auth.currentUser;

    /********************************** */
    const fileNames = await Promise.all( 
       photos.map(async (photo, index) => {
        try {

            // APPEL DU BACKEND
            //Installation de AXIOS : npm i axios
            await axios.post('http://localhost:3000/uploads',{
                // base64Image: await base64FromPath(photo.webviewPath!),
                base64Image: photo.webviewPath!,
                photo : photo
            })

            return photo.filepath;
            } catch (error) {
            return null;
            
        }
       })
    )
    
    /**********Ajout du produit dans Firebase ********* */
   try {
     await addDoc(collection(db, "product"), {
        nom,
        description,
        prix,
        vendeur: user?.uid,
        photo: fileNames.filter((photo) => photo !== null)
    });

    setMessage("Produit créé");
      // Attendre 2 secondes avant de rediriger
      setTimeout(() => {
         history.replace("/home"); // Redirection après 2 secondes
      }, 2000); // 2000ms = 2 secondes
      
    history.replace('/home');
   } catch (error) {
    console.error(error);
      setMessage("Erreur lors de la publication.");
   }
      setShowMessage(true); // Afficher le toast

    /**********Ajout du produit dans Firebase ********* */
   }

   return (
    <>
        <IonItem>
            <IonInput label="Le nom du produit" labelPlacement="floating"
                placeholder="Saisir le nom du produit"
                value={nom} onIonChange={(e) => setNom(e.detail.value!)}
            ></IonInput>
        </IonItem>
        <IonItem>
            <IonInput label="La description du produit" labelPlacement="floating"
                placeholder="Saisir la description du produit"
                value={description} onIonChange={(e) => setDescription(e.detail.value!)}
            ></IonInput>
        </IonItem>
        <IonItem>
            <IonInput label="Le prix " labelPlacement="floating"
                placeholder="Saisir le prix du produit"
                value={prix} onIonChange={(e) => setPrix(e.detail.value!)}
            ></IonInput>
        </IonItem>

        <IonButton expand="full"  onClick={() => takePhoto()}>Prendre une photo</IonButton>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonButton expand="full" color="success"  onClick={() => handleSumbit()}>Enregistrer le produit</IonButton>

        <IonToast
            isOpen={showMessage}
            message={message}
            duration={3000} // Durée en ms avant disparition
            onDidDismiss={() => setShowMessage(false)} // Ferme le toast après le délai
            />
    </>
   );
}

export default Create;