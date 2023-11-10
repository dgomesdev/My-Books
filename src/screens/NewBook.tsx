import { useState } from "react";
import { VStack } from "native-base";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore"

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function NewBook() {

    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    function handleNewBook() {
        if (!title || !description) {
            setError(true);
            return Alert.alert('Add new book', 'Fill all the fields')
        }

        setIsLoading(true);

        firestore()
        .collection('books')
        .add({
            title,
            description,
            status: 'reading',
            created_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert('Success', 'New book added');
            navigation.goBack();
        })
        .catch((error) => {
            console.log('Error when adding a new book:', error);
            Alert.alert('Error', 'Error when adding a new book');
        })
    }

    return (

        <VStack flex={1} p={4} bg={"gray.600"}>
            <Header title="New book" />

            <Input
                placeholder="Title"
                onChangeText={setTitle}
            />

            <Input
                placeholder="Description"
                flex={1}
                multiline
                textAlignVertical="top"
                onChangeText={setDescription}
            />

            <Button
                title="Add book"
                isLoading={isLoading}
                onPress={handleNewBook}
            />

        </VStack>
    )
}