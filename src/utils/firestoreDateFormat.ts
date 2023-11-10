import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timesamp: FirebaseFirestoreTypes.Timestamp) {
    if (timesamp) {
        const date = new Date(timesamp.toDate());
        const day = date.toLocaleDateString('fr');
        const hour = date.toLocaleTimeString('fr');

        return `${day} at ${hour}`;
    }
}