import auth from "@react-native-firebase/auth";
import { Heading, Icon, Image, VStack, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { Alert } from "react-native";
import Logo from '../assets/logo.png';

export function SignIn() {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn() {

        if (!email && !password) {
            return Alert.alert('Error', 'Fill all the fields');
        }

        if (email && !password) {
            return Alert.alert('Error', 'No password provided');
        }

        if (!email && password) {
            return Alert.alert('Error', 'No e-mail provided');
        }

        setIsLoading(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .catch((error => {
                console.log(error);
                setIsLoading(false);

                console.log('code', error.code);

                if (error.code === 'auth/invalid-email') {
                    return Alert.alert('Error', 'Invalid e-mail');
                }

                if (error.code === 'auth/invalid-login') {
                    return Alert.alert('Error', 'Invalid e-mail or password');
                }

                return Alert.alert('Error', 'Error when logging in')
            })

            )
    }

    return (

        <VStack flex={1} bg="gray.700" alignItems="center" p={4}>

            <Image source={Logo} resizeMode="contain" size="xl" alt="logo" mt={16} />

            <Heading color="white" fontSize="xl" m={8}>
                Sign in
            </Heading>

            <Input
                placeholder="E-mail"
                InputLeftElement={<Icon as={<Envelope color={colors.white} />} m={4} />}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
            />

            <Input
                placeholder="Password"
                InputLeftElement={<Icon as={<Key color={colors.white} />} m={4} />}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
            />

            <Button
                title="Sign in"
                w="full"
                onPress={handleSignIn}
                isLoading={isLoading}
            />

        </VStack>
    )
}