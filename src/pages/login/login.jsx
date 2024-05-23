import { Box } from '@chakra-ui/react'
import PropTypes from 'prop-types';
import FormLogin from '../../components/login/formLogin'


const Login = ({ onLogin }) => {
    return (
        <Box bgColor={'#2C2C2C'} maxW={'100vw'} minH={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <FormLogin onLogin={onLogin} />
        </Box>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired, 
};

export default Login