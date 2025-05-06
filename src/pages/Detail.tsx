import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import Show from "../components/product/Show";
import { useParams } from "react-router";

const Detail:React.FC = () =>{

    // Récupérer l'id depuis l'URL
  const { id } = useParams<{ id: string }>();
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        {/* <Show></Show>
         */}
        <Show productId={id} />

  </IonContent>
    </IonPage>
  );
};

export default Detail;