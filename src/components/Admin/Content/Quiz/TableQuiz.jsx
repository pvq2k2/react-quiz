import { useTranslation } from "react-i18next";
const TableQuiz = (props) => {
  const { listQuiz, handleModal } = props;
  const { t } = useTranslation();
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("tablequiz.th.name")}</th>
            <th scope="col">{t("tablequiz.th.description")}</th>
            <th scope="col">{t("tablequiz.th.difficulty")}</th>
            <th scope="col">{t("tablequiz.th.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz && listQuiz.length > 0 ? (
            listQuiz.map((item) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleModal("VIEW", item)}
                    >
                      {t("tablequiz.btn.view")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleModal("UPDATE", item)}
                    >
                      {t("tablequiz.btn.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleModal("DELETE", item)}
                    >
                      {t("tablequiz.btn.delete")}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>{t("tablequiz.nodata")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
