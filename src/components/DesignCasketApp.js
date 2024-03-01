import { useDesignCasketContext } from "../libs/DesignCasketContext";
import NavViewer from "./NavViewer";
import Casket3D from "./Casket3D";
import DesignToolBar from "./DesignToolBar";
import Modal from "./Modal";
import EditImage from "./EditImage";

export default function DesignCasketApp() {
  const { 
    version, 
    faqsModalOpen, setFaqsModalOpen, 
    showHandles, 
    displayOptShowHandles,
    editButtonText,
    editImageModalOpen, setEditImageModalOpen,
    onApplyDesign } = useDesignCasketContext();
  
  const ButtonSaveEdit = () => {
    return <button onClick={ e => {
      e.preventDefault();
      onApplyDesign();
    } } className="design-casket__button button-secondary">
      Save Design
    </button>
  }

  // casket-design-show-handles
  return <div className="design-casket design-casket-container">
    <DesignToolBar />

    <div className={ [
      'design-casket__viewer-area', 
      ((showHandles == true && displayOptShowHandles == true) ? 'casket-design-show-handles' : '')].join(' ') }>
      <NavViewer />
      <Casket3D />
    </div>

    <Modal 
      className="design-casket__modal-faqs-entry" 
      title="Casket Design Instructions" 
      open={ faqsModalOpen }
      onClose={ e => setFaqsModalOpen(false) }>
      <div dangerouslySetInnerHTML={{__html: DC_PHP_DATA.settings.instructions_content}}></div>
    </Modal>

    <Modal 
      className="design-casket__modal-edit-image"
      size={ 'lg' }
      title={ editButtonText }
      open={ editImageModalOpen }
      onClose={ e => setEditImageModalOpen(false) }
      buttons={ [
        <ButtonSaveEdit />
      ] }>
      <EditImage />
    </Modal>
  </div>
}