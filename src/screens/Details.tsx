import { useNavigation, useRoute } from "@react-navigation/native";
import { VStack, useTheme } from "native-base";

import firestore from "@react-native-firebase/firestore";

import { Book, ClipboardText, Hourglass } from "phosphor-react-native";
import { BookProps } from "../components/Book";
import { BookDetails } from "../components/BookDetails";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { BookFirestoreDto } from "../DTO/BookDto";

type RouteParams = {
    bookId: string;
}

type BookDetails = BookProps & {
    title: string;
    description: string;
    closed: string;
}

export function Details() {

    const navigation = useNavigation();
    const route = useRoute();
    const { colors } = useTheme();
    const { bookId } = route.params as RouteParams;
    const [book, setBook] = useState<BookDetails>({} as BookDetails);
    const [isLoading, setIsLoading] = useState(true);

    function handleFinish() {
        firestore()
        .collection('books')
        .doc(bookId)
        .update({
            status: 'finished',
            finished_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert('Success', "Marked as read");
            navigation.goBack();
        })
        .catch((error) => {
            console.log('Error:', error);
            Alert.alert('Error', 'Error when marking the book as read');
        })
    }

    useEffect(() => {
        firestore()
        .collection<BookFirestoreDto>('books')
        .doc(bookId)
        .get()
        .then(doc => {
            if (doc.exists) {
                const { title, description, status, created_at, finished_at } = doc.data();
                
                
            }
        })
    }, [])

    if (isLoading) {
        return <Loading />;
    }

    return (

        <VStack flex={1} p={4} bg={"gray.600"}>

            <Header title={"Details of book " + bookId} />

            <BookDetails
                title="Book"
                description="Name of the book"
                icon={Book}
            />

            <BookDetails
                title="Description"
                description="Description of the book"
                icon={ClipboardText}
            />

            <Button title="Mark as read" onPress={handleFinish} />

        </VStack>
    )
}