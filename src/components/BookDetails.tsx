import { HStack, Text, VStack, useTheme } from "native-base";
import { IconProps } from "phosphor-react-native";
import { ElementType } from "react";

type Props = {
    title: string;
    description: string;
    icon: ElementType<IconProps>;
}

export function BookDetails({ title, description, icon: Icon }: Props) {

    const { colors } = useTheme();

    return (
        <VStack bg="gray.500" rounded="sm" my={4}>

            <HStack alignItems="center" p={4} my={4}>
                <Icon color={colors.primary[700]} />
                <Text ml={2} color="gray.300" fontSize="sm">
                    {title}
                </Text>
            </HStack>

            {!!description && (
                <Text color="gray.100" fontSize="md" m={4}>
                    {description}
                </Text>
            )}

        </VStack>
    )
}