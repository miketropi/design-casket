import { useDesignCasketContext } from "../libs/DesignCasketContext";
import NavViewer from "./NavViewer";
import Casket3D from "./Casket3D";
import DesignToolBar from "./DesignToolBar";
import Modal from "./Modal";

export default function DesignCasketApp() {
  const { version, faqsModalOpen } = useDesignCasketContext();

  return <div className="design-casket design-casket-container">
    <DesignToolBar />

    <div className="design-casket__viewer-area">
      <NavViewer />
      <Casket3D />
    </div>

    <Modal 
      className="design-casket__faqs-entry" 
      title="Casket Design Instructions" 
      isOpen={ faqsModalOpen }>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </Modal>
  </div>
}