import { FcGoogle } from "react-icons/fc";
import {
  singUpWithGoogleAccount,
  signOutFromAccount,
} from "../firebase/firebaseConfig";
import { userSetting } from "../features/gallareySlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.like);
  const loginSignup = () => {
    singUpWithGoogleAccount()
      .then((result) => {
        dispatch(userSetting(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {!user && <h1 className="text-4xl my-10">Login/Signup With Google</h1>}
      {user && (
        <div className=" flex gap-10 flex-col items-center">
          <h1>{user.displayName}</h1>

          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
        </div>
      )}
      <button onClick={loginSignup} className="btn btn-neutral">
        <span>
          <FcGoogle />
        </span>
        <span> SingUp</span>
      </button>
      <button onClick={signOutFromAccount} className="btn btn-neutral">
        <span>
          <FcGoogle />
        </span>
        <span>LogOut</span>
      </button>
    </div>
  );
}

export default Login;
