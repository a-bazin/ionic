import { IonContent, IonHeader, IonPage, IonTabBar, IonTitle } from "@ionic/react";
import Register from "../components/user/Register";
import Login from "../components/user/Login";

const User:React.FC=()=>{

    return (
        <IonPage>
            <IonHeader>
                <IonTabBar>
                    <IonTitle> Acceder à mon applkication</IonTitle>
                </IonTabBar>
            </IonHeader>

            <IonContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus est magni enim tempora, distinctio in magnam voluptatibus aliquam? Laborum voluptatibus pariatur sunt, ullam sit eos hic distinctio enim! Iusto, labore?
                Obcaecati sunt unde numquam aut totam dignissimos adipisci id illum veniam omnis voluptatibus provident rem nemo perferendis incidunt deserunt quis, excepturi itaque laborum? Possimus alias veniam necessitatibus, nihil voluptates quae.
            
            <Login/>
            {/* <Register/> */}
            
            </IonContent>
        </IonPage>
    )
}

export default User;