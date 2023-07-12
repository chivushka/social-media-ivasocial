import { useLocation } from 'react-router-dom';
import Search from './Search';

const SearchCover = () => {
    const location = useLocation();
  return (
    <div key={location.key}>
        <Search />
    </div>
  )
}

export default SearchCover