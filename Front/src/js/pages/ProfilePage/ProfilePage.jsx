import Profile from "../../components/dev/Profile/Profile";
import "./ProfilePage.css";
<<<<<<< HEAD

const ProfilePage = () => {
  return (
    <div className="mt-4 mb-4 profile-page flex flex-col jusify-center align-center">
      <h1 className='profile'>Perfil:</h1>
=======
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-4 mb-4 profile-page flex flex-col jusify-center align-center">
      <h1 className='profile'>{t("nav.profile")}</h1>
>>>>>>> main
      <Profile />
    </div>
  );
};
export default ProfilePage;
