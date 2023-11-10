import { Input as NativeBaseInput, IInputProps } from 'native-base'

export function Input({ ...rest }: IInputProps) {

    return (

        <NativeBaseInput
            bg="gray.700"
            h={16}
            size="md"
            fontFamily="body"
            color="white"
            m={4}
            placeholderTextColor="white"
            _focus={{
                borderWidth: 1,
                borderColor: 'yellow.500',
                bg: 'gray.700'
            }}
            { ...rest }
        >
        </NativeBaseInput>
    )
}