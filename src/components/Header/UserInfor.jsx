import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { postProfile } from "../../services/apiService";
import { toast } from "react-toastify";
const UserInfor = () => {
  const { t } = useTranslation();
  const account = useSelector((state) => state.user.account);

  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(account)) {
      setUsername(account.username);
      setImage("");
      if (account.image) {
        setPreviewImage(`data:image/jpeg;base64,${account.image}`);
      } else {
        setPreviewImage("");
      }
    }
  }, [account]);

  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleSubmitProfile = async () => {
    let data = await postProfile(username, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      setUsername("");
      setImage("");
      setPreviewImage("");
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="inputUsername" className="form-label">
            {t("modaluser.input.username")}
          </label>
          <input
            type="text"
            className="form-control"
            id="inputUsername"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="fileUpload" className="form-label label-upload">
            <FcPlus />
            {t("modaluser.input.file")}
          </label>
          <input
            type="file"
            id="fileUpload"
            hidden
            onChange={(e) => handleUploadImage(e)}
          />
        </div>

        <div className="col-md-12 mb-3">
          <div className="img-preview">
            {previewImage ? (
              <img src={previewImage} alt="img preview" />
            ) : (
              <span>{t("modaluser.input.previewimage")}</span>
            )}
          </div>
        </div>
      </form>
      <Button variant="primary" onClick={() => handleSubmitProfile()}>
        {t("updateuser.btn.submit")}
      </Button>
    </>
  );
};

export default UserInfor;
