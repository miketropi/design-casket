import { useDesignCasketContext } from "../libs/DesignCasketContext";

export default function Casket3D() {
  const { currentView, data } = useDesignCasketContext();

  const getDesignImageByKey = (key, imageDefault) => {
    const item = data.find(d => {
      return d.__key == key;
    });

    return (item.designImage != '' ? item.designImage : imageDefault);
  }

  return <div className='design-casket__design-casket-3d'>
    {/* { JSON.stringify(data) } */}
    <div className="casket-design-preview">
      <div className="casket-design-preview-scene">
        <div className={ ['casket-design-preview-box', currentView].join(' ') }>
          <div className="casket-design-preview-face casket-design-preview-lid">
            <img src={ getDesignImageByKey('968ccc56-e5b8-4af3-a68f-e65c3cb02fb9', "/wp-content/plugins/design-casket/images/lid.png") } className="casket-design-face" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-underneath">
            <img src="/wp-content/plugins/design-casket/images/underneath-shadow2.png" className="casket-design-face" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-left-1">
            <img src="/wp-content/plugins/design-casket/images/left-1.png" className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-2" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-left-2">
            <img src="/wp-content/plugins/design-casket/images/left-2.png" className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-right-1">
            <img src="/wp-content/plugins/design-casket/images/right-1.png" className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-2" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-right-2">
            <img src="/wp-content/plugins/design-casket/images/right-2.png" className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-top">
            <img src="/wp-content/plugins/design-casket/images/top.png" className="casket-design-face" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-bottom">
            <img src="/wp-content/plugins/design-casket/images/bottom.png" className="casket-design-face" />
          </div>
        </div>
      </div>
    </div>
  </div>
}