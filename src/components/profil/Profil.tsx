import React, { use, useContext, useEffect, useState } from "react";
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton,
    IonItem, IonLabel, IonAlert, IonGrid, IonRow, IonCol,
    IonItemDivider,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";



const Profil: React.FC = () => {

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const history = useHistory();

    //Recuperation du user connecté
     const { user } = useAuth();

    const handleUpdateProfile = async () => {
        try {
            if (!auth.currentUser) return;
            const userRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userRef, {
                prenom,
                nom
            })

            setAlertMessage("Profil mis à jour avec succès!")
        } catch (error: any) {
            setAlertMessage("Erreur lors de la mis à jour" + error.message);
        }
        setShowAlert(true);
    };

    const handleLogout = async () => {
        await auth.signOut();

         localStorage.clear(); 
        setAlertMessage("Vous êtes déconnecté !")
        setShowAlert(true);
        history.push("/user")
    };

    const handleDeleteAccount = async () => {
        if (!auth.currentUser) return;

        try {
            const userRef = doc(db, "users", auth.currentUser.uid);
            await deleteDoc(userRef);

            await auth.currentUser.delete();

            setAlertMessage("Compte supprimé avec succès!")
            setShowAlert(true);
            history.push("/user");

        } catch (error: any) {
            setAlertMessage("Erreur lors de la supprission" + error.message);
            setShowAlert(true)
        }
    };

    // console.log('***currentUser', user);

    return (
        <IonPage>
            {user ? (
                <>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Mon Profil</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <>
                            <IonItem>
                                <IonLabel position="floating">Prénom</IonLabel>
                                <IonInput value={user.prenom} onIonChange={(e) => setPrenom(e.detail.value!)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Nom</IonLabel>
                                <IonInput value={user.nom} onIonChange={(e) => setNom(e.detail.value!)} />
                            </IonItem>
                            <IonItem>
                                <IonLabel position="floating">Email</IonLabel>
                                <IonInput value={user.email} disabled />
                            </IonItem>

                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonButton expand="full" onClick={handleUpdateProfile} color="primary">Enregistrer</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton expand="full" onClick={handleLogout} color="warning">Se Déconnecter</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton expand="full" onClick={() => setShowDeleteAlert(true)} color="danger">Supprimer</IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </>
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
                                { text: "Supprimer", handler: handleDeleteAccount }
                            ]}
                            onDidDismiss={() => setShowDeleteAlert(false)}
                        />
                    </IonContent>
                </>
            ) : (
                <IonContent>
                    <p>Il faut être connecté pour accéder à cette page profil</p>
                    <IonButton expand="full" href="/user" color="primary">Se connecter</IonButton> </IonContent>
            )}
        </IonPage>
    );
};

export default Profil;