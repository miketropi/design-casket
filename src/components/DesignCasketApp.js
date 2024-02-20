import { useDesignCasketContext } from "../libs/DesignCasketContext";
import NavViewer from "./NavViewer";

export default function DesignCasketApp() {
  const { version } = useDesignCasketContext();

  return <div className="design-casket design-casket-container">
    <NavViewer />
  </div>
}