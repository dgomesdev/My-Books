import { Button, IButtonProps, Text, useTheme } from "native-base";

type Props = IButtonProps & {
    title: string,
    isActive?: boolean,
    type: 'reading' | 'finished';
}

export function Filter({ title, isActive = false, type, ...rest }: Props) {

    const { colors } = useTheme();
    const colorType = type === 'reading' ? colors.green[500] : colors.secondary[700] 

    return (

        <Button
            variant='outline'
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor="gray.600"
            flex={1}
            m={4}
            size="sm"
            {...rest}
        >
            <Text color={isActive ? colorType : "gray.300"} fontSize="xs">{title}</Text>
        </Button>
    );
}