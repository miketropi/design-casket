import { useState, useEffect, useRef } from "react";
import { useDesignCasketContext } from "../libs/DesignCasketContext";
import { Tooltip } from 'react-tooltip';
import { fabric } from "fabric";

export default function EditImage() {
  const { data, setData, editItem, setEditItem, image_collection } = useDesignCasketContext();
  const { maskImage, fabricConfig } = editItem
  const helpIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7.92 9.234v.102a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-1.29.998-1.979 2.34-1.979 1.308 0 2.168.689 2.168 1.67 0 .928-.482 1.359-1.686 1.91l-.344.154C11.379 11.54 11 12.21 11 13.381v.119a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-.516.138-.723.55-.912l.345-.155c1.445-.654 2.529-1.514 2.529-3.39v-.103c0-1.978-1.72-3.441-4.164-3.441-2.478 0-4.336 1.428-4.336 3.734zm2.58 7.757c0 .867.659 1.509 1.491 1.509.85 0 1.509-.642 1.509-1.509 0-.867-.659-1.491-1.509-1.491-.832 0-1.491.624-1.491 1.491z" fill="#000000"/></svg>`;
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);

  useEffect(() => {
    fabricRef.current = initCanvas();

    // load mask image 
    loadMaskImage();

    fabricRef.current.on("object:modified", function (e) {
      // alert("object modified");
      let jsonString = JSON.stringify(fabricRef.current);
      // copyToClipboard(jsonString);
      setEditItem({...editItem, save: jsonString})
      console.log(jsonString)
    });

    return () => {
      fabricRef.current.dispose();
      fabricRef.current = null;
    }
  }, [])

  const initCanvas = () => (
    new fabric.Canvas(canvasRef.current, {
      height: 500,
      width: 786,
      // backgroundColor: '#FAFAFA',
      selection: false,
      renderOnAddRemove: true,
    })
  ) 

  const loadMaskImage = () => {
    fabric.Image.fromURL(editItem.maskImage, (img) => {
      // img.selectable = false;

      if(fabricConfig.scaleToWidth) {
        img.scaleToWidth(fabricConfig.scaleToWidth);
      }
      
      fabricRef.current.add(img); 

      // Object center
      fabricRef.current.centerObject(img); 
      fabricRef.current.renderAll();
    }); 
  }

  const onAddImagePreview = (imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      // img.selectable = false;
      img.globalCompositeOperation = 'source-atop';
      
      fabricRef.current.add(img); 

      // Object center
      fabricRef.current.centerObject(img); 
      fabricRef.current.renderAll();

      // trigger object:modified
      fabricRef.current.fire('object:modified');
    }); 
  }

  return <div className="design-casket__edit-image">
    {/* { JSON.stringify(data) } */}
    <div className="__edit-area">
      { JSON.stringify(editItem) }
      <canvas ref={ canvasRef }></canvas>
    </div>
    <div className="__edit-tool-area">
      <div className="__select-image">
        <h5>Select Image <sup className="__icon-tooltip" id="design-casket-select-image-tooltip" dangerouslySetInnerHTML={{__html: helpIcon}}></sup></h5>
        <Tooltip anchorSelect="#design-casket-select-image-tooltip">
          Pick an image from our collection
        </Tooltip>
        <ul>
          { image_collection.map((item, __i_index) => {
            return <li className="image-item" key={ __i_index } onClick={ e => {
              e.preventDefault();
              onAddImagePreview(item.image);
            } }>
              <span>
                <img src={ item.thumbnail } alt="#" />
              </span>
            </li>
          }) }
        </ul>
      </div>
    </div> 
  </div>
}