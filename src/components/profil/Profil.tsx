import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonAlert,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItemDivider,
  IonBadge,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface Sale {
  id: string;
  productName: string;
  isSeen: boolean;
}

const Profil: React.FC = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const history = useHistory();
  const { user } = useAuth();
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:3000/sales?userId=${user.uid}`)
        .then((res) => {
          console.log("Ventes récupérées :", res.data);
          setSales(res.data);
        })
        .catch((err) => console.error("Erreur récupération ventes :", err));
    }
  }, [user]);

  useEffect(() => {
    const main = document.getElementById("profil-main");
    main?.focus();

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, []);

  const markAsViewed = (saleId: string) => {
    axios
      .post("http://localhost:3000/mark-sale-as-seen", { saleId })
      .then(() => {
        setSales((prev) =>
          prev.map((sale) =>
            sale.id === saleId ? { ...sale, isSeen: true } : sale
          )
        );
      })
      .catch((err) => console.error("Erreur MAJ vue :", err));
  };

  const handleUpdateProfile = async () => {
    try {
      if (!auth.currentUser) return;
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        prenom,
        nom,
      });

      setAlertMessage("Profil mis à jour avec succès!");
    } catch (error: any) {
      setAlertMessage("Erreur lors de la mise à jour : " + error.message);
    }
    setShowAlert(true);
  };

  const handleLogout = async () => {
    await auth.signOut();

    localStorage.clear();
    setAlertMessage("Vous êtes déconnecté !");
    setShowAlert(true);
    history.push("/user");
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await deleteDoc(userRef);

      await auth.currentUser.delete();

      setAlertMessage("Compte supprimé avec succès!");
      setShowAlert(true);
      history.push("/user");
    } catch (error: any) {
      setAlertMessage("Erreur lors de la supprission : " + error.message);
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      {user ? (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Mon Profil</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding" id="profil-main">
            <IonItem>
              <IonLabel position="floating">Prénom</IonLabel>
              <IonInput
                value={prenom}
                onIonChange={(e) => setPrenom(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Nom</IonLabel>
              <IonInput
                value={nom}
                onIonChange={(e) => setNom(e.detail.value!)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput value={user.email} disabled />
            </IonItem>

            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonButton
                    expand="full"
                    onClick={handleUpdateProfile}
                    color="primary"
                  >
                    Enregistrer
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="full"
                    onClick={handleLogout}
                    color="warning"
                  >
                    Se Déconnecter
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="full"
                    onClick={() => setShowDeleteAlert(true)}
                    color="danger"
                  >
                    Supprimer
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonList>
              <IonItemDivider>
                <IonLabel>Mes ventes</IonLabel>
              </IonItemDivider>

              {sales.length === 0 ? (
                <IonItem>
                  <IonLabel>Aucune vente trouvée</IonLabel>
                </IonItem>
              ) : (
                sales.map((sale) => (
                  <IonItem key={sale.id}>
                    <IonLabel>
                      {sale.productName}
                      {!sale.isSeen && (
                        <IonBadge color="danger" className="ion-margin-start">
                          Non vue
                        </IonBadge>
                      )}
                    </IonLabel>
                    {!sale.isSeen && (
                      <IonButton
                        slot="end"
                        onClick={() => markAsViewed(sale.id)}
                      >
                        Marquer comme vue
                      </IonButton>
                    )}
                  </IonItem>
                ))
              )}
            </IonList>

            <IonAlert
              isOpen={showAlert}
              message={alertMessage}
              buttons={["OK"]}
              onDidDismiss={() => setShowAlert(false)}
            />

            <IonAlert
              isOpen={showDeleteAlert}
              header="Confirmation"
              message="Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
              buttons={[
                { text: "Annuler", role: "cancel" },
                { text: "Supprimer", handler: handleDeleteAccount },
              ]}
              onDidDismiss={() => setShowDeleteAlert(false)}
            />
          </IonContent>
        </>
      ) : (
        <IonContent className="ion-padding">
          <p>Il faut être connecté pour accéder à cette page profil</p>
          <IonButton expand="full" href="/user" color="primary">
            Se connecter
          </IonButton>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Profil;
