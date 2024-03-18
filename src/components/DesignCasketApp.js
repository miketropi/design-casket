import { useDesignCasketContext } from "../libs/DesignCasketContext";
import NavViewer from "./NavViewer";
import Casket3D from "./Casket3D";
import DesignToolBar from "./DesignToolBar";
import Modal from "./Modal";
import EditImage from "./EditImage";
import SubmissionForm from "./SubmissionForm";
import ThanksMessage from "./ThanksMessage";

export default function DesignCasketApp() {
  const { 
    version, 
    data,
    faqsModalOpen, setFaqsModalOpen, 
    showHandles, 
    displayOptShowHandles,
    editButtonText,
    editImageModalOpen, setEditImageModalOpen,
    onApplyDesign,
    submissionModalOpen, setSubmissionModalOpen,
    onSubmissionSubmit,
    submissionLoading, setSubmissionLoading,
    submissionComplete, setSubmissionComplete,
    editItem, setEditItem } = useDesignCasketContext();
  
  const ButtonSaveEdit = () => {
    return <button onClick={ e => {
      e.preventDefault();
      onApplyDesign();
    } } className="design-casket__button button-secondary">
      Save
    </button>
  }

  const ButtonSubmissionFormCloseModal = () => {
    return <button className="design-casket__button" type="button" onClick={ e => {
      e.preventDefault();
      setSubmissionModalOpen(false);
    } }>Close</button>
  }

  // casket-design-show-handles
  return <div className={ ['design-casket design-casket-container'] }>
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
      onClose={ e => {
        setEditImageModalOpen(false);
        // setEditItem(null);
      } }
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
        {
          ((_sc) => {
            if(_sc == false) {
              return <SubmissionForm onSubmitFn={ onSubmissionSubmit } loading={ submissionLoading } buttons={ [
                <ButtonSubmissionFormCloseModal />
              ] } />
            } else {
              return <ThanksMessage />
            }
          })(submissionComplete)
        }
    </Modal>
    {/* { JSON.stringify(data) }  */}
  </div>
}