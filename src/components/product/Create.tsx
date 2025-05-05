import { IonButton, IonCol, IonGrid, IonImg, IonInput, IonItem, IonRow } from "@ionic/react";
import { base64FromPath, usePhotoGallery } from "../../hooks/usePhotoGallery";
import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import axios from "axios";



const Create: React.FC = () => {
   const { photos, takePhoto } = usePhotoGallery();

   const [ nom, setNom] = useState("");
   const [ description, setDescription] = useState("");
   const [ prix, setPrix] = useState("");

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
                    base64Image: await base64FromPath(photo.webviewPath!),
                    photo : photo.filepath
                })

                return photo;
            } catch (error) {
            return null;
            
        }
       })
    )
    
    /********************************** */
console.log(fileNames);

    await addDoc(collection(db, "product"), {
        nom,
        description,
        prix,
        vendeur: user?.uid,
        photo: fileNames.filter((photo) => photo !== null)
    });
        
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

        <IonButton  onClick={() => takePhoto()}>Prendre une photo</IonButton>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={photo.filepath}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonButton  onClick={() => handleSumbit()}>Enregistrer le produit</IonButton>

    </>
   );
}

export default Create;