import { useNavigation } from "@react-navigation/native";
import { HStack, Heading, IconButton, StyledProps, useTheme } from "native-base";
import { CaretLeft } from "phosphor-react-native";

type Props = StyledProps & {
    title: string;
}

export function Header({ title, ...rest }: Props) {

    const navigation = useNavigation();
    const { colors } = useTheme();

    function handleGoBack() {
        navigation.goBack();
    }

    return (

        <HStack
            w="full"
            h={24}
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            mt={8}
            p={8}
        >
            <IconButton
                icon={<CaretLeft size={24} color={colors.gray[200]} />}
                onPress={handleGoBack}
            />

            <Heading color="gray.100" textAlign="center" fontSize="lg" flex={1}>
                {title}
            </Heading>
        </HStack>
    )
}