import { Box, Center, Circle, HStack, IPressableProps, Pressable, Text, VStack, useTheme } from "native-base";
import { CheckCircle, CircleNotch, ClockAfternoon, Hourglass } from "phosphor-react-native";

export type BookProps = {
    id: string;
    title: string;
    description: string;
    when: string;
    status: 'reading' | 'finished';
}

type Props = IPressableProps & {
    bookData: BookProps;
}

export function Book({ bookData, ...rest }: Props) {

    const { colors } = useTheme();
    const statusColor = bookData.status === 'reading' ? colors.green[500] : colors.secondary[700];

    return (

        <Pressable {...rest}>
            <HStack
                bg={"gray.600"}
                m={8}
                alignItems="center"
                justifyContent="space-netween"
                rounded="sm"
                overflow="hiden"
            >
                <Box h="full" w={2} bg={statusColor}></Box>

                <VStack flex={1} m={4}>
                    <Text color="white" fontSize="md">{bookData.title}</Text>
                    <HStack mt={4}>
                        <ClockAfternoon size={16} color={colors.gray[300]} />
                        <Text color="gray.200" fontSize="xs" ml={2}>{bookData.when}</Text>
                    </HStack>
                </VStack>

                <Circle bg="gray.500" h={12} w={12} m={4}>
                    {
                        bookData.status === 'finished' ?
                        <CheckCircle size={24} color={statusColor} /> :
                        <Hourglass size={24} color={statusColor} />
                    }
                </Circle>
            </HStack>
        </Pressable>
    )
}