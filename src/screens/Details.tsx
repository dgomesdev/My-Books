import { useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, VStack, useTheme } from "native-base";

import firestore from "@react-native-firebase/firestore";

import { Book, CheckCircle, ClipboardText, Hourglass } from "phosphor-react-native";
import { BookProps } from "../components/Book";
import { BookDetails } from "../components/BookDetails";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { BookFirestoreDto } from "../DTO/BookDto";
import { dateFormat } from "../utils/firestoreDateFormat";

type RouteParams = {
    bookId: string;
}

type BookDetails = BookProps & {
    title: string;
    description: string;
    closed: string;
    when: string;
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

                    const closed = finished_at ? dateFormat(finished_at) : null;

                    setBook({
                        id: doc.id,
                        title,
                        description,
                        status,
                        closed,
                        when: dateFormat(created_at)
                    });
                }
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (

        <VStack flex={1} p={4} bg={"gray.600"}>

            <Header title={"Details of the book"} />

            <ScrollView showsVerticalScrollIndicator={false} >
                <BookDetails
                    title="Book"
                    description={book.title}
                    icon={Book}
                />

                <BookDetails
                    title="Started reading at"
                    description={book.when}
                    icon={CheckCircle}
                />


                <BookDetails
                    title="Description"
                    description={book.description}
                    icon={ClipboardText}
                />

                {book.status === 'finished' && (
                    <BookDetails
                        title="Finised reading at"
                        description={book.closed}
                        icon={CheckCircle}
                    />
                )}

            </ScrollView>


            {book.status === 'reading' && (
                <Button title="Mark as read" onPress={handleFinish} />
            )}

        </VStack>
    )
}