import { useEffect, useState } from "react";
import { Center, FlatList, HStack, Heading, IconButton, Image, Text, VStack, useTheme } from "native-base";
import { ChatTeardropText, SignOut } from 'phosphor-react-native'
import { useNavigation } from "@react-navigation/native";

import { Filter } from "../components/Filter";
import { Button } from "../components/Button";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import Logo from '../assets/logo.png';
import { Book, BookProps } from "../components/Book";
import { Loading } from "../components/Loading";
import { Alert } from "react-native";
import { dateFormat } from "../utils/firestoreDateFormat";

export function Home() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [selectedStatus, setSlectedStatus] = useState<'reading' | 'finished'>('reading');
    const [isLoading, setIsLoading] = useState(false)
    const [books, setBooks] = useState<BookProps[]>([
        /*{
            id: '1',
            title: 'Harry Potter 1',
            description: 'Description of Harry Potter 1',
            when: '5 days ago',
            status: 'reading'
        },
        {
            id: '2',
            title: 'Harry Potter 2',
            description: 'Description of Harry Potter 2',
            when: 'Today',
            status: 'finished'
        }*/
    ])

    function handleNewBook() {
        navigation.navigate('newBook')
    }

    function handleOpenDetails(bookId: string) {
        navigation.navigate('details', { bookId })
    }

    function handleLogOut() {
        auth().
        signOut()
        .catch((error) => {
            console.log('Error when signing out', error);
            Alert.alert('Error', 'Error when signing out');
        })
    }
    
    useEffect(() => {
        setIsLoading(true);
        const subscriber = firestore()
        .collection('books')
        .where('status', '==', selectedStatus)
        .onSnapshot((snapshot) => {
            const data = snapshot.docs.map(doc => {
                const { title, description, status, created_at } = doc.data();

                return {
                    id: doc.id,
                    title,
                    description,
                    status,
                    when: dateFormat(created_at)
                }
            });
            setBooks(data);
            setIsLoading(false);
        })
        return subscriber;
    }, [selectedStatus])

    return (

        <VStack flex={1} bg="gray.600" p={4}>
            <HStack
                w="full"
                h={24}
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                p={8}
                mt={8}
            >
                <Image source={Logo} resizeMode="contain" size="sm" alt="logo" />

                <IconButton 
                icon={<SignOut size={24} color={colors.gray[300]} />}
                onPress={handleLogOut} 
                />

            </HStack>

            <VStack flex={1}>
                <HStack w="full" justifyContent="space-between" alignItems="center" my={4} p={8}>
                    <Heading color="gray.100">
                        My books
                    </Heading>
                    <Text color="gray.200">
                        {books.length}
                    </Text>
                </HStack>

                <HStack space={3}>
                    <Filter
                        title="Reading"
                        type="reading"
                        isActive={selectedStatus === 'reading'}
                        onPress={() => setSlectedStatus('reading')}
                    />

                    <Filter
                        title="Finished"
                        type="finished"
                        isActive={selectedStatus === 'finished'}
                        onPress={() => setSlectedStatus('finished')}
                    />
                </HStack>

                {isLoading ? (
                    <Loading />
                ) : (
                    <FlatList
                        data={books}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Book bookData={item} onPress={() => handleOpenDetails(item.id)} />}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        ListEmptyComponent={() => (
                            <Center pt={24}>
                                <ChatTeardropText color={colors.gray[300]} size={24} />
                                <Text color={colors.gray[300]} fontSize="lg" mt={6} textAlign="center">
                                    {selectedStatus === 'reading' ? "You are not reading any books" : "You have not finished a book yet"}
                                </Text>
                            </Center>
                        )}
                    />)}

                <Button title="Add new book" onPress={handleNewBook} />

            </VStack>

        </VStack>
    )
}