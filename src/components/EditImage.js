import { useState, useEffect, useRef } from "react";
import { useDesignCasketContext } from "../libs/DesignCasketContext";
import { Tooltip } from 'react-tooltip';
import { fabric } from "fabric";
import UploadImage from "./UploadImage";
import { uploadImageRequest } from '../libs/api'; 

const __HELP_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7.92 9.234v.102a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-1.29.998-1.979 2.34-1.979 1.308 0 2.168.689 2.168 1.67 0 .928-.482 1.359-1.686 1.91l-.344.154C11.379 11.54 11 12.21 11 13.381v.119a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-.516.138-.723.55-.912l.345-.155c1.445-.654 2.529-1.514 2.529-3.39v-.103c0-1.978-1.72-3.441-4.164-3.441-2.478 0-4.336 1.428-4.336 3.734zm2.58 7.757c0 .867.659 1.509 1.491 1.509.85 0 1.509-.642 1.509-1.509 0-.867-.659-1.491-1.509-1.491-.832 0-1.491.624-1.491 1.491z" fill="#000000"/></svg>`;

const RemoveIcon = () => {
  return <svg version="1.1" viewBox="0 0 1200 1200" > <path d="M600,0C268.629,0,0,268.629,0,600s268.629,600,600,600 s600-268.629,600-600S931.371,0,600,0z M411.475,262.5L600,451.025L788.525,262.5L937.5,411.475L748.975,600L937.5,788.525 L788.525,937.5L600,748.975L411.475,937.5L262.5,788.525L451.025,600L262.5,411.475L411.475,262.5z"/> </svg>
}

export default function EditImage() {
  const { 
    editItem, 
    setEditItem, 
    image_collection, 
    __addUserUploadImages, 
    __removeUserUploadImageItem, 
    userUploadImages } = useDesignCasketContext();
  const [ ready, setReady ] = useState(false);
  const [ text, setText ] = useState(editItem.fabricConfig?.textDefault);
  const [ modified, setModified ] = useState(false);
  const { maskImage, fabricConfig } = editItem;
  
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const fabricMaskObject = useRef(null);
  const imageObject = useRef(null);
  const TextObject = useRef(null);

  useEffect(() => {
    fabricRef.current = initCanvas();

    // console.log(editItem.save);
    if(editItem.save != null) {
      // load save data
      // console.log('load save data');
      // console.log(editItem.save)
      fabricRef.current.clear();
      fabricRef.current.loadFromJSON(editItem.save, () => {
        fabricRef.current.renderAll();  
      }, (_, _object) => {
        switch(_object.__LABEL) {
          case "PREVIEW_IMAGE":
            // console.log(_object);
            imageObject.current = _object;
            _object.scaleToWidth(_object.__MASKWIDTH);
            _object.on('modified', onUpdate__MASKWIDTH);
            // fabricRef.current.setActiveObject(_object);
            break;
          
          case "MASK_IMAGE":
            fabricMaskObject.current = _object;
            setReady(true);
            break;

          case "TEXT_OBJECT":
            console.log('TEXT_OBJECT', _object) 
            setText(_object.text);
            TextObject.current = _object;
            _object.on('modified', onUpdate__TEXTOBJECT);
            break;
        }
      }); 
    } else {
      // load mask image 
      // console.log('load init mask image');
      loadMaskImage(() => {
        if(editItem.fabricConfig?.textDesign == true)
          setupTextObject();
      }); 
      
    }

    fabricRef.current.on("object:modified", function (e) {
      // console.log(fabricMaskObject.current, TextObject.current, imageObject.current);
      if(! fabricMaskObject.current) return;
      let exportMethods = ['__LABEL', '__MASKWIDTH', 'lockMovementY', 'hasControls', 'selectable'];
      let jsonString = fabricRef.current.toJSON(exportMethods); // JSON.stringify(fabricRef.current);
      // let jsonString = JSON.stringify(fabricRef.current);
      // console.log(jsonString);
      const __designImage = fabricRef.current.toDataURL({
        left: fabricMaskObject.current.left,
        top: fabricMaskObject.current.top,
        width: fabricMaskObject.current.getScaledWidth(),
        height: fabricMaskObject.current.getScaledHeight(),
        multiplier: 1.5,
      });

      setEditItem(prevState => {
        return {...prevState, save: jsonString, designImage: __designImage}
      })
    });

    return () => {
      fabricRef.current.dispose();
      fabricRef.current = null;
      fabricMaskObject.current = null;
      imageObject.current = null;
      TextObject.current = null
      setReady(false)
    }
  }, [])

  useEffect(() => {
    // console.log(TextObject.current);
    if(!TextObject.current) return;
    TextObject.current.set('text', text);
    fabricRef.current.renderAll();

    fabricRef.current.fire('object:modified');
  }, [text]);

  useEffect(() => {
    if(ready) {
      // console.log(editItem.previewImage);
      (editItem.previewImage ? onRenderImagePreview(editItem.previewImage) : '');
    } 
  }, [editItem.previewImage]) 

  const initCanvas = () => (
    new fabric.Canvas(canvasRef.current, {
      height: 550,
      width: 786,
      // backgroundColor: '#FAFAFA',
      selection: false,
      renderOnAddRemove: true,
      preserveObjectStacking: true,
    })
  ) 

  const loadMaskImage = (cb) => {
    fabric.Image.fromURL(maskImage, (img) => {
      img.set('__LABEL', 'MASK_IMAGE');
      fabricMaskObject.current = img;

      img.selectable = false;
      if(fabricConfig.scaleToWidth) {
        img.scaleToWidth(fabricConfig.scaleToWidth);
      }
      
      fabricRef.current.add(img); 

      // Object center
      fabricRef.current.centerObject(img); 
      fabricRef.current.renderAll();

      // console.log(img, img.getScaledWidth());
      setReady(true);

      if(cb) {
        cb()  
      }
    }); 
  }

  const onUpdate__TEXTOBJECT = (evt) => {
    // let modifiedObject = evt.target;
    // console.log(modifiedObject);
    // modifiedObject.set('__MASKWIDTH', modifiedObject.getScaledWidth()); 
    
    fabricRef.current.fire('object:modified');
  }

  const setupTextObject = () => {
    TextObject.current = new fabric.Text('Design Casket', { 
      fill: 'red',
      fontSize: 18,
      originX: "center",
      originY: "center",
      angle: -90,
      fontFamily: "Arial",
      textAlign: 'center',
      width: 150,
      lockMovementY: true,
      hasControls: false,
    });

    TextObject.current.set('__LABEL', 'TEXT_OBJECT');
    TextObject.current.selectable = false;
    TextObject.current.globalCompositeOperation = 'source-atop';
    // TextObject.current.setControlVisible('mtr', false);

    // Render the Text on Canvas
    fabricRef.current.add(TextObject.current); 
    
    // Object center
    fabricRef.current.centerObject(TextObject.current); 
    TextObject.current.set({ left: 232, })

    fabricRef.current.renderAll();
    TextObject.current.on('modified', onUpdate__TEXTOBJECT);

    // trigger object:modified
    fabricRef.current.fire('object:modified');
  }

  const onUpdate__MASKWIDTH = (evt) => {
    let modifiedObject = evt.target;
      modifiedObject.set('__MASKWIDTH', modifiedObject.getScaledWidth()); 
      fabricRef.current.fire('object:modified');
  }

  const onRenderImagePreview = (imageUrl) => {
    // if(fabricMaskObject.current == null) return;
    if(imageObject.current) {
      fabricRef.current.remove(imageObject.current); 
    } 

    fabric.Image.fromURL(imageUrl, (img) => {
      // img.selectable = false;
      const maskWidth = fabricMaskObject.current.getScaledWidth();
      img.set('__LABEL', 'PREVIEW_IMAGE'); // set tag
      img.set('__MASKWIDTH', maskWidth);

      imageObject.current = img;
      img.scaleToWidth(maskWidth);
      img.globalCompositeOperation = 'source-atop';

      img.on('modified', onUpdate__MASKWIDTH);
      
      fabricRef.current.add(img); 
      fabricRef.current.centerObject(img); // Object center
      fabricRef.current.setActiveObject(img) // Active object
      // fabricRef.current.moveTo(img, 3);
      
      let _zindex = fabricRef.current.getObjects().indexOf(img);
      // console.log(_zindex)
      if(TextObject.current)
        fabricRef.current.moveTo(TextObject.current, _zindex + 1); 

      fabricRef.current.renderAll();

      // trigger object:modified
      fabricRef.current.fire('object:modified');
    }); 
  }

  const onSetImagePreview = (imageUrl) => {
    setEditItem({...editItem, previewImage: imageUrl});
  }

  const onUploadImage = async (file) => {
    let formData = new FormData();
    formData.append('enctype', 'multipart/form-data');
    formData.append('image_upload', file);

    const { success, upload } = await uploadImageRequest(formData);
    const { url } = upload;
    // console.log(res); 
    __addUserUploadImages(url)
    onSetImagePreview(url);
  }

  return <div className="design-casket__edit-image">
    
    <div className="__edit-area">
      <canvas ref={ canvasRef }></canvas>
    </div>
    <div className="__edit-tool-area">
      {
        editItem.fabricConfig?.textDesign == true &&
        <div className="__text-edit">
          <h5>Add Text <sup className="__icon-tooltip" id="design-casket-text-edit-tooltip" dangerouslySetInnerHTML={{__html: __HELP_ICON}}></sup></h5>
          <Tooltip anchorSelect="#design-casket-text-edit-tooltip">
            Add your custom text 
          </Tooltip>
          <div>
            <textarea 
              className="__textarea-field" 
              placeholder="Add your custom text here!" 
              value={ text }
              onChange={ e => setText(e.target.value) }></textarea>
          </div>
        </div>
      }
      <div className="__select-image">
        <h5>Select Image <sup className="__icon-tooltip" id="design-casket-select-image-tooltip" dangerouslySetInnerHTML={{__html: __HELP_ICON}}></sup></h5>
        <Tooltip anchorSelect="#design-casket-select-image-tooltip">
          Pick an image from our collection
        </Tooltip>
        <ul>
          { image_collection.map((item, __i_index) => {
            return <li className="image-item" key={ __i_index } onClick={ e => {
              e.preventDefault();
              onSetImagePreview(item.image);
            } }>
              <span>
                <img src={ item.thumbnail } alt="#" />
              </span>
            </li>
          }) }
        </ul>
      </div>

      <div className="__upload-image">
        <h5>Upload image <sup className="__icon-tooltip" id="design-casket-upload-image-tooltip" dangerouslySetInnerHTML={{__html: __HELP_ICON}}></sup></h5>
        <Tooltip anchorSelect="#design-casket-upload-image-tooltip">
          Upload an image from your device
        </Tooltip>
        <UploadImage onhandleChange={ onUploadImage } />
        {/* { JSON.stringify(userUploadImages) } */}
        {
          userUploadImages.length > 0 && 
          <ul className="__user-upload-images">
            {
              userUploadImages.map((url, __index_url) => {
                return <li className="__user-image-item" key={ __index_url } >
                  <span onClick={ e => {
                    e.preventDefault();
                    onSetImagePreview(url);
                  } } className="__image" style={{ background: `url(${ url }) no-repeat center center / cover, #eee` }}></span>
                  <span className="__remove" onClick={ e => {
                    e.preventDefault(); 
                    let r = confirm('Are you sure you want to remove?');

                    if(r) {
                      __removeUserUploadImageItem(__index_url)
                    }
                  } }><RemoveIcon /></span>
                </li>
              })
            }
          </ul>
        }
      </div>
    </div> 
  </div>
}