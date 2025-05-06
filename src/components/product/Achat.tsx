import { IonButton } from "@ionic/react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

interface Product {
    id: string,
    nom: string,
    prix: number,
    vendeur: string
}

interface Props {
    product: Product
}

const Achat:React.FC<Props> = ({product}) =>{

    const user = auth.currentUser;

    const handleSubmit = async () =>{

        try {
            await addDoc(collection(db, "orders"),{
                acheteur: user?.uid,
                vendeur: product.vendeur,
                productId : product.id,
                productName : product.nom,
                productPrice : product.prix,
            })

            console.log("OK");
            
            
        } catch (error) {
            console.log(error);
            
            console.log("KO");
            
        }

    }

    return (
        <>
           <IonButton color="success" onClick={handleSubmit} > Acheter ce produit</IonButton>
        
        </>
    )
}

export default Achat;