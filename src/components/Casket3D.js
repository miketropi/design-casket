import { useEffect, useRef } from "react";
import { useDesignCasketContext } from "../libs/DesignCasketContext";
import { fabric } from "fabric";

export default function Casket3D() {
  const { currentView, data, setData } = useDesignCasketContext();
  const canvasCropRef = useRef(null);
  const fabricCropRef = useRef(null);
  
  useEffect(() => {
    canvasCropRef.current = document.createElement("canvas");
    fabricCropRef.current = new fabric.Canvas(canvasCropRef.current, {
      selection: false,
      renderOnAddRemove: true,
    })
  }, []);

  useEffect(() => {
    if(data[1].previewImage == '') return;

    const __data = [...data];
    const [maskWidth, maskHeight] = [848, 129];
    fabricCropRef.current.setDimensions({ width: maskWidth, height: maskHeight });
      
    fabric.Image.fromURL(data[1].designImage, img => {
      img.scaleToWidth(maskWidth);
      fabricCropRef.current.add(img); 
      fabricCropRef.current.renderAll();

      __data[1].left1Img = fabricCropRef.current.toDataURL({
        width: 630, 
        height: 129, 
        top: 0, 
        left: 218, 
      });

      __data[1].left2Img = fabricCropRef.current.toDataURL({
        width: 218, 
        height: 129,  
        top: 0, 
        left: 0,  
      });

      setData(__data);
    })
  }, [data[1].designImage]); 

  useEffect(() => {
    if(data[2].previewImage == '') return;

    const __data = [...data];
    const [maskWidth, maskHeight] = [848, 129];
    fabricCropRef.current.setDimensions({ width: maskWidth, height: maskHeight });
      
    fabric.Image.fromURL(data[2].designImage, img => {
      img.scaleToWidth(maskWidth);
      fabricCropRef.current.add(img); 
      fabricCropRef.current.renderAll();

      __data[2].right1Img = fabricCropRef.current.toDataURL({
        width: 630, 
        height: 129, 
        top: 0, 
        left: 0, 
      });

      __data[2].right2Img = fabricCropRef.current.toDataURL({
        width: 218,  
        height: 129, 
        top: 0, 
        left: 630, 
      });

      setData(__data);
    })
  }, [data[2].designImage]);

  const getDesignImageByKey = (key, imageDefault, fieldName = 'designImage') => {
    const item = data.find(d => {
      return d.__key == key;
    });

    if(!item[fieldName]) return imageDefault;
    return (item[fieldName] != '' ? item[fieldName] : imageDefault);
  }
  
  const __getDesignImageByKey = (key, imageDefault) => imageDefault;

  return <div className='design-casket__design-casket-3d'>
    {/* { JSON.stringify(data) } */}
    {/* <canvas ref={ canvasCropRef }></canvas> */}
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
            <img src={ getDesignImageByKey('65b13379-a8bc-49e1-a7a5-de149038571d', '/wp-content/plugins/design-casket/images/left-1.png', 'left1Img') } className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-2" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-left-2">
            <img src={ getDesignImageByKey('65b13379-a8bc-49e1-a7a5-de149038571d', '/wp-content/plugins/design-casket/images/left-2.png', 'left2Img') } className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-right-1">
            <img src={ getDesignImageByKey('529e804a-e512-49ff-80c7-463f9a6c247c', '/wp-content/plugins/design-casket/images/right-1.png', 'right1Img') } className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-2" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-right-2">
            <img src={ getDesignImageByKey('529e804a-e512-49ff-80c7-463f9a6c247c', '/wp-content/plugins/design-casket/images/right-2.png', 'right2Img') } className="casket-design-face" />
            <img src="/wp-content/plugins/design-casket/images/caskethandle.png" className="casket-design-handle-1" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-top">
            <img src={ getDesignImageByKey('bd0346c6-4e04-43bb-b2ca-d5c8222a065d', '/wp-content/plugins/design-casket/images/top.png') } className="casket-design-face" />
          </div>
          <div className="casket-design-preview-face casket-design-preview-bottom">
            <img src={ getDesignImageByKey('5518e0b7-7cc3-4157-af66-2b4d8b83f017', '/wp-content/plugins/design-casket/images/bottom.png') } className="casket-design-face" />
          </div>
        </div>
      </div>
    </div>
  </div>
}