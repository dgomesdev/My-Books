import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";

import { Loading } from "../components/Loading";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./appRoutes";

export function Routes() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User>();

    useEffect(() => {
        const subscriber = auth().
        onAuthStateChanged(response => {
            console.log('reponse:', response);
            setUser(response);
            setIsLoading(false);
        })
    }, [])

    if (isLoading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {user ? (
                <AppRoutes />
            ) : (
                <SignIn />
            )}
        </NavigationContainer>
    )
}