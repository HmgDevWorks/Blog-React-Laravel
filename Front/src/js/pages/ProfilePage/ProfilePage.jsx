import Profile from "../../components/dev/Profile/Profile";
import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="mt-4 mb-4 profile-page flex flex-col jusify-center align-center">
      <h1 className='profile'>Perfil:</h1>
      <Profile />
    </div>
  );
};
export default ProfilePage;
