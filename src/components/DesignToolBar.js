import { useDesignCasketContext } from "../libs/DesignCasketContext";

export default function DesignToolBar() {
  const { 
    editButtonText, 
    setFaqsModalOpen, 
    displayOptShowHandles,
    showHandles, setShowHandles,
    setEditImageModalOpen } = useDesignCasketContext();
  
  return <div className="design-casket__tool-bar">
    {
      displayOptShowHandles == true && 
      <div className="tool-box __show-handle">
        <label>
          <input 
            type="checkbox" 
            checked={ showHandles } 
            onChange={ e => { setShowHandles(!showHandles) } } />
          <span>Show handle positions</span>
        </label>
      </div>
    }
    
    <div className="tool-box __faqs">
      <button className="design-casket__button" onClick={ e => {
        e.preventDefault();
        setFaqsModalOpen(true);
      } }>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </svg>
      </button>
    </div>

    <div className="tool-box __edit-image">
      <button className="design-casket__button" onClick={ e => {
        e.preventDefault();
        setEditImageModalOpen(true);
      } }>{ editButtonText }</button>
    </div>

    <div className="tool-box __submit-design">
      <button className="design-casket__button button-secondary">Submit Design</button>
    </div>

    <div className="tool-box __share-design">
      <button className="design-casket__button button-gray">
        <svg fill="#FFF" viewBox="0 -32 576 576" xmlns="http://www.w3.org/2000/svg"><path d="M568.482 177.448L424.479 313.433C409.3 327.768 384 317.14 384 295.985v-71.963c-144.575.97-205.566 35.113-164.775 171.353 4.483 14.973-12.846 26.567-25.006 17.33C155.252 383.105 120 326.488 120 269.339c0-143.937 117.599-172.5 264-173.312V24.012c0-21.174 25.317-31.768 40.479-17.448l144.003 135.988c10.02 9.463 10.028 25.425 0 34.896zM384 379.128V448H64V128h50.916a11.99 11.99 0 0 0 8.648-3.693c14.953-15.568 32.237-27.89 51.014-37.676C185.708 80.83 181.584 64 169.033 64H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-88.806c0-8.288-8.197-14.066-16.011-11.302a71.83 71.83 0 0 1-34.189 3.377c-7.27-1.046-13.8 4.514-13.8 11.859z"/></svg>
        Share this Design
      </button>
    </div>
  </div>
}