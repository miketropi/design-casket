import { useDesignCasketContext } from "../libs/DesignCasketContext";
import NavViewer from "./NavViewer";
import Casket3D from "./Casket3D";
import DesignToolBar from "./DesignToolBar";
import Modal from "./Modal";
import EditImage from "./EditImage";
import SubmissionForm from "./SubmissionForm";

export default function DesignCasketApp() {
  const { 
    version, 
    faqsModalOpen, setFaqsModalOpen, 
    showHandles, 
    displayOptShowHandles,
    editButtonText,
    editImageModalOpen, setEditImageModalOpen,
    onApplyDesign,
    submissionModalOpen, setSubmissionModalOpen } = useDesignCasketContext();
  
  const ButtonSaveEdit = () => {
    return <button onClick={ e => {
      e.preventDefault();
      onApplyDesign();
    } } className="design-casket__button button-secondary">
      Save Design
    </button>
  }

  const ButtonSubmissionFormCloseModal = () => {
    return <button className="design-casket__button" type="button" onClick={ e => {
      e.preventDefault();
      setSubmissionModalOpen(false);
    } }>Close</button>
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

    <Modal
      className="design-casket__modal-submission-form"
      title={ `Submit Your Design` }
      desc={ `Please complete and submit the form below. A member of our team will be in touch to discuss your specific requirements.` }
      open={ submissionModalOpen }
      buttonOff = { true }
      >
      <SubmissionForm buttons={ [
        <ButtonSubmissionFormCloseModal />
      ] } />
    </Modal>
  </div>
}