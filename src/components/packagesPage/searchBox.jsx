import React, { Fragment } from 'react';

const SearchBox = ({onChange, value, total}) => (
   <Fragment>
      <div className='row'>
         <input className='ml-3 form-control col' type='text' placeholder='Search...' name='search' onChange={e => { onChange(e.currentTarget.value) }} value={value} />
         <div class='pl-3 pr-2 mr-3 badge badge-light'>({total}) Packages</div>
      </div>
   </Fragment>
);

export default SearchBox;