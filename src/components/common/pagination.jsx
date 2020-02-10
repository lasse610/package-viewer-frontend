import React from 'react';


const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
   const pagesCount = Math.ceil(itemsCount / pageSize);
   const pages = [...Array(pagesCount + 1).keys()];
   pages.shift();
   if (pages <= 1) {
      return null;
   }
   return (
      <div className='overflow-auto'>
         <nav aria-label="...">
            <ul className="pagination">
               <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
                  <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                     <span aria-hidden="true">&laquo;</span>
                     <span className="sr-only">Previous</span>
                  </button>
               </li>
               {pages.map(page =>
                  <li key={page} className={currentPage === page ? 'page-item active' : 'page-item'}>
                     <button className="page-link" onClick={() => onPageChange(page)}>{page}</button>
                  </li>
               )}
               <li className={currentPage === pagesCount ? 'page-item disabled' : 'page-item'}>
                  <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                     <span aria-hidden="true">&raquo;</span>
                     <span className="sr-only">Previous</span>
                  </button>
               </li>
            </ul>
         </nav>
      </div>
   );
}


export default Pagination;