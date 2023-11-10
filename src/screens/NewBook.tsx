import { useState } from "react";
import { VStack } from "native-base";
import { Alert } from "react-native";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function NewBook() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleNewBook() {
        if (!title || !description) {
            return Alert.alert('Add new book', 'Fill all the fields')
        }
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