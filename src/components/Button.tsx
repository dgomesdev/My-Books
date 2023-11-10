import { Button as ButtonNativeBase, Heading, IButtonProps } from 'native-base'

type Props = IButtonProps & {
    title: string;
}

export function Button({ title, ...rest }: Props) {

    return (

        <ButtonNativeBase
            bg="yellow.500"
            h={16}
            fontSize="sm"
            rounded="sm"
            m={4}
            _pressed={{ bg: 'yellow.700' }}
            { ...rest }
        >
            <Heading color="black" fontSize="md">{title}</Heading>
        </ButtonNativeBase>
    );
}