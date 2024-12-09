import axios from "axios";
import { useEffect, useState } from "react";

export default function UserInfo(){
    const [user, setUser] = useState();

    useEffect(() => {
        getUser();
      }, []);

    const getUser = async () =>{
        const { data } = await axios.get("/api/auth/user");
        setUser(data.nombre_usuario);
    }

    return(
        <>{user}</>
    )
}