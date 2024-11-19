import { useDesignCasketContext } from "../libs/DesignCasketContext";
import { copyToClipboard } from "../libs/helpers";
import copy from 'copy-to-clipboard';

export default function DesignToolBar() {
  const { 
    data, setData,
    navActive,
    editButtonText, 
    setFaqsModalOpen, 
    displayOptShowHandles,
    showHandles, setShowHandles,
    setEditImageModalOpen,
    onSaveDesign, 
    submissionModalOpen, setSubmissionModalOpen,
    editItem, setEditItem,
    shareModalOpen, setShareModalOpen,
    shareUri_Func,
    isSaving } = useDesignCasketContext();
  
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
    
    

    <div className="tool-box __edit-image">
      <button className="design-casket__button button-secondary" onClick={ e => {
        e.preventDefault();
        setEditImageModalOpen(true);
      } }>{ editButtonText }</button>
    </div>

    <div className="tool-box __submit-design">
      <button className="design-casket__button" onClick={ e => {
        e.preventDefault();
        // console.log(data);
        // copy(JSON.stringify(data));
        // return;
        setSubmissionModalOpen(true) 
      } }>Submit Design</button>
    </div>

    <div className="tool-box __share-design">
      <button className="design-casket__button" onClick={ e => {
        e.preventDefault();
        shareUri_Func()
      } }>
        {
          isSaving == true ? 'Please wait...' : 'Share this Design'
        }
      </button>
    </div>

    <div className="tool-box __faqs">
      <button className="design-casket__button" onClick={ e => {
        e.preventDefault();
        setFaqsModalOpen(true);
      } }>
        Help
      </button>
    </div>
  </div>
}