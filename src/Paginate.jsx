function Paginate({
  totalItems,
  perPage,
  handlePageChange,
  offset = 3,
  currentPage,
}) {
  const totalPages = Math.ceil(totalItems / perPage);
  const arrays = new Array(totalPages).fill(0);

  return (
    <ul style={{ 'margin': '50px 0px' }}>
      <li className='paginate-li'>
        <a href='#' onClick={handlePageChange}>
          1
        </a>
      </li>

      {currentPage > offset ? (
        <li className='paginate-li'>
          <a href='#' onClick={handlePageChange}>
            ...
          </a>
        </li>
      ) : null}

      {arrays.map((arr, index) => {
        if (
          index + 1 < currentPage + offset &&
          index + 1> currentPage - offset &&
          index !== 0 &&
          index !== totalPages - 1
        ) {
          return (
            <li className='paginate-li'>
              <a href='#' onClick={handlePageChange}>
                {index + 1}
              </a>
            </li>
          );
        }
      })}

      {currentPage < totalPages - offset ? (
        <li className='paginate-li'>
          <a href='#' onClick={handlePageChange}>
            ...
          </a>
        </li>
      ) : null}

      <li className='paginate-li'>
        <a href='#' onClick={handlePageChange}>
          {totalPages}
        </a>
      </li>
    </ul>
  );
}

export default Paginate;
