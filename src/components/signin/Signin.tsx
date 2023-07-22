import FormSignin from "../form-signin/FormSignin";
import './Signin.css'

const Signin = () => {


    return (<>
        <div className="Heading">My Trade Journal</div>
        <div className="Auth-form-container">
            <FormSignin />
        </div>

</>
    );
};
export default Signin;
