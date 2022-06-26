function Paginate({
  totalItems,
  perPage,
  setPerPage,
  setCurrentPage,
  offset,
  currentPage,
}) {
  const totalPages = Math.ceil(totalItems / perPage);
  const arrays = new Array(totalPages).fill(0);

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = e => {
    setPerPage(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div>
        <span>Pokemons per page:</span>
        <select value={perPage} onChange={handlePerPageChange}>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='40'>40</option>
          <option value='100'>100</option>
        </select>
      </div>
      {totalPages > 0 && (
        <ul style={{ margin: '20px 0px' }}>
          {currentPage > 1 && (
            <li className='paginate-li'>
              <a href='#' onClick={() => handlePageChange(currentPage - 1)}>
                &lt;= prev
              </a>
            </li>
          )}

          <li className='paginate-li'>
            <a href='#' onClick={() => handlePageChange(1)}>
              1
            </a>
          </li>

          {currentPage > offset ? (
            <li className='paginate-li'>
              <a href=''>...</a>
            </li>
          ) : null}

          {arrays.map((arr, index) => {
            if (
              index + 1 < currentPage + offset &&
              index + 1 > currentPage - offset &&
              index !== 0 &&
              index !== totalPages - 1
            ) {
              return (
                <li key={index} className='paginate-li'>
                  <a href='#' onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </a>
                </li>
              );
            }
          })}

          {currentPage < totalPages - offset ? (
            <li className='paginate-li'>
              <a>...</a>
            </li>
          ) : null}

          {totalPages !== 1 ? (
            <>
              <li className='paginate-li'>
                <a href='#' onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </a>
              </li>
              {currentPage !== totalPages && (
                <li className='paginate-li'>
                  <a href='#' onClick={() => handlePageChange(currentPage + 1)}>
                    next =&gt;
                  </a>
                </li>
              )}
            </>
          ) : null}
        </ul>
      )}
    </>
  );
}

export default Paginate;
