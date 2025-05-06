import { useParams } from "react-router";

const Show:React.FC = () =>{

    //RECUPERATION DE L'ID DU PRODUIT
    const { id } = useParams<{id:string}>();


    //FAIRE UNE REQUETE POUR RECUPER EN FONCTION DE SON ID

    return (

        <></>
    )
}

export default Show;