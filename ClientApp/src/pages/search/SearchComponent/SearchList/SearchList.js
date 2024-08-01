//----------------import---------------------
import SearchListItem from "./SearchListItem";

//-------------------create component SearchList-----------------
function SearchList(props) {
  if (props.data.length === 0)
    return (
      <div>
        <h2>Input options to search</h2>
      </div>
    );
  return (
    <div>
      {props.data.map((cur, i) => {
        return <SearchListItem key={i} info={cur}></SearchListItem>;
      })}
    </div>
  );
}

//---------------export--------------------------------------
export default SearchList;
