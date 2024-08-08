import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getHistory } from "../../services/apiService";
const History = (props) => {
  const [listHistory, setListStory] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createAt).utc().format("L"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setListStory(newData);
    }
  };
  const { t } = useTranslation();
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("history.th.name")}</th>
            <th scope="col">{t("history.th.totalquestion")}</th>
            <th scope="col">{t("history.th.totalcorrect")}</th>
            <th scope="col">{t("history.th.date")}</th>
          </tr>
        </thead>
        <tbody>
          {listHistory && listHistory.length > 0 ? (
            listHistory.map((item) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>{t("history.nodata")}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default History;
