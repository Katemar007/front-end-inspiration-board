import './CardSortDropdown.css';

const SortDropdown = ({ selectedOption, onChange }) => {
  return (
    <div className="sort-dropdown">
      <span>Sort by: </span>
      <select
        value={selectedOption}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="card_id">Card ID</option>
        <option value="likes">+1 Count</option>
        <option value="alpha">Alphabetically</option>
      </select>
    </div>
  );
};

export default SortDropdown;
