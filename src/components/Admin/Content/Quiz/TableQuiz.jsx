import { useEffect, useState } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiService";

const TableQuiz = (props) => {
  // const {
  //   listUser,
  //   handleClickBtnUpdate,
  //   handleClickBtnView,
  //   handleClickBtnDelete,
  // } = props;
  const [listQuiz, setListQuiz] = useState([]);
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Action</th>
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
                  <td>{item.type}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      // onClick={() => handleClickBtnView(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      // onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      // onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No quiz</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableQuiz;
