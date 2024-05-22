import { Box } from '@chakra-ui/react'
import FormLogin from '../../components/login/formLogin'


const Login = () => {
    return (
        <Box bgColor={'#2C2C2C'} maxW={'100vw'} minH={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <FormLogin/>
        </Box>
    )
}

export default Login