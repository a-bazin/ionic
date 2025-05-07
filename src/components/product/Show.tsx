import { useEffect, useState } from "react";
import {
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonImg,
  IonLabel,
} from "@ionic/react";

import { doc, getDoc } from "firebase/firestore";
import { pricetagOutline } from "ionicons/icons";

import { db } from "../../firebaseConfig";
import Achat from "./Achat";

const Show: React.FC<{ productId: string }> = ({ productId }) => {
  const url = "http://192.168.1.174:3000/public/";

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [product, setProduct] = useState<any>(null);

  console.log(productId);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "product", productId); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProduct({
            id: docSnap.id,
            ...data,
          });
        } else {
          setMessage("Produit non trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit :", error);
        setMessage("Erreur lors du chargement.");
        setShowAlert(true);
    }
    };

    fetchPost();
  }, [productId]);

  return (
    <>
      {product ? (
        <IonCard key={product.id}>
          <IonImg
            src={
              product.photo?.length > 0 && product.photo[0]
                ? `${url}${product.photo[0].filepath}`
                : "/noImage.jpeg"
            }
          />
          <IonCardHeader>
            <IonCardTitle>{product.nom}</IonCardTitle>
            <IonCardSubtitle>
              <IonChip>
                <IonIcon icon={pricetagOutline} color="primary"></IonIcon>
                <IonLabel>{product.prix} €</IonLabel>
              </IonChip>
            </IonCardSubtitle>
          </IonCardHeader>

          <Achat product = {product}/>

        </IonCard>
      ) : (
        <IonLabel>Chargement...</IonLabel>
      )}

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Erreur"
        message={message}
        buttons={["OK"]}
      />
    </>
  );
};

export default Show;
