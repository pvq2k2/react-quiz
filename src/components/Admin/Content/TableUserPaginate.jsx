import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";
const TableUserPaginate = (props) => {
  const {
    listUser,
    handleClickBtnUpdate,
    handleClickBtnView,
    handleClickBtnDelete,
    fetchGetAllUsersWithPaginate,
    pageCount,
    currentPage,
    setCurrentPage,
  } = props;
  const { t } = useTranslation();
  const handlePageClick = (event) => {
    setCurrentPage(+event.selected + 1);
    fetchGetAllUsersWithPaginate(+event.selected + 1);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">{t("tableuser.th.username")}</th>
            <th scope="col">{t("tableuser.th.email")}</th>
            <th scope="col">{t("tableuser.th.role")}</th>
            <th scope="col">{t("tableuser.th.action")}</th>
          </tr>
        </thead>
        <tbody>
          {listUser && listUser.length > 0 ? (
            listUser.map((item) => {
              return (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => handleClickBtnView(item)}
                    >
                      {t("tableuser.btn.view")}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      {t("tableuser.btn.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      {t("tableuser.btn.delete")}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>{t("tableuser.nodata")}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="user-paginate d-flex justify-content-center">
        <ReactPaginate
          nextLabel={`${t("tableuser.pagination.next")} >`}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel={`< ${t("tableuser.pagination.prev")}`}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
