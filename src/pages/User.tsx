import { IonButton, IonContent, IonHeader, IonPage, IonTabBar, IonTitle, IonToolbar } from "@ionic/react";
import Register from "../components/user/Register";
import Login from "../components/user/Login";
import { useState } from "react";
import "./User.css"

const User: React.FC = () => {
    const [activeForm, setActiveForm] = useState<string | null>(null);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className="header-title">Acceder à mon application</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="page-container">
                <h5 className="description-text">
                    Lorem ipsum dolor sit, amet consectetur adipi
                </h5>
                <div className="buttons-container">
                    <IonButton onClick={() => setActiveForm('login')}>Connexion</IonButton>
                    <IonButton onClick={() => setActiveForm('register')}>Inscription</IonButton>
                </div>
                <div className="form-container">
                    {activeForm === 'login' && <Login />}
                    {activeForm === 'register' && <Register />}
                </div>
            </IonContent>
        </IonPage>
    )
}

export default User;