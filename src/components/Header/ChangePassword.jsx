import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { postChangePassword } from "../../services/apiService";
const ChangePassword = () => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please enter complete information !");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password not match new password !");
      return;
    }
    console.log(currentPassword, newPassword, confirmPassword);
    let data = await postChangePassword(currentPassword, newPassword);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-12">
          <label htmlFor="currentPassword" className="form-label">
            {t("changepassword.currentpassword")}
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="newPassword" className="form-label">
            {t("changepassword.newpassword")}
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="confirmPassword" className="form-label">
            {t("changepassword.confirmpassword")}
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </form>
      <Button
        className="mt-3"
        variant="primary"
        onClick={() => handleSubmitChangePassword()}
      >
        {t("updateuser.btn.submit")}
      </Button>
    </>
  );
};

export default ChangePassword;
