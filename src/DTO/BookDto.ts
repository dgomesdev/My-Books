import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export type BookFirestoreDto = {
    title: string,
    description: string,
    status: 'reading' | 'finished',
    created_at: FirebaseFirestoreTypes.Timestamp,
    finished_at?: FirebaseFirestoreTypes.Timestamp
}