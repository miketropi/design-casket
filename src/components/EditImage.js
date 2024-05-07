import { useState, useEffect, useRef } from "react";
import { useDesignCasketContext } from "../libs/DesignCasketContext";
import { Tooltip } from 'react-tooltip';
import { fabric } from "fabric";
import UploadImage from "./UploadImage";
import TextConfig from "./TextConfig";
import { uploadImageRequest } from '../libs/api';  
const FontFaceObserver = require('fontfaceobserver');

const __HELP_ICON = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7.92 9.234v.102a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-1.29.998-1.979 2.34-1.979 1.308 0 2.168.689 2.168 1.67 0 .928-.482 1.359-1.686 1.91l-.344.154C11.379 11.54 11 12.21 11 13.381v.119a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-.516.138-.723.55-.912l.345-.155c1.445-.654 2.529-1.514 2.529-3.39v-.103c0-1.978-1.72-3.441-4.164-3.441-2.478 0-4.336 1.428-4.336 3.734zm2.58 7.757c0 .867.659 1.509 1.491 1.509.85 0 1.509-.642 1.509-1.509 0-.867-.659-1.491-1.509-1.491-.832 0-1.491.624-1.491 1.491z" fill="#000000"/></svg>`;

const RemoveIcon = () => {
  return <svg version="1.1" viewBox="0 0 1200 1200" > <path d="M600,0C268.629,0,0,268.629,0,600s268.629,600,600,600 s600-268.629,600-600S931.371,0,600,0z M411.475,262.5L600,451.025L788.525,262.5L937.5,411.475L748.975,600L937.5,788.525 L788.525,937.5L600,748.975L411.475,937.5L262.5,788.525L451.025,600L262.5,411.475L411.475,262.5z"/> </svg>
}

const GearIcon = () => {
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fillRule="evenodd" clipRule="evenodd" d="M12.7848 0.449982C13.8239 0.449982 14.7167 1.16546 14.9122 2.15495L14.9991 2.59495C15.3408 4.32442 17.1859 5.35722 18.9016 4.7794L19.3383 4.63233C20.3199 4.30175 21.4054 4.69358 21.9249 5.56605L22.7097 6.88386C23.2293 7.75636 23.0365 8.86366 22.2504 9.52253L21.9008 9.81555C20.5267 10.9672 20.5267 13.0328 21.9008 14.1844L22.2504 14.4774C23.0365 15.1363 23.2293 16.2436 22.7097 17.1161L21.925 18.4339C21.4054 19.3064 20.3199 19.6982 19.3382 19.3676L18.9017 19.2205C17.1859 18.6426 15.3408 19.6754 14.9991 21.405L14.9122 21.845C14.7167 22.8345 13.8239 23.55 12.7848 23.55H11.2152C10.1761 23.55 9.28331 22.8345 9.08781 21.8451L9.00082 21.4048C8.65909 19.6754 6.81395 18.6426 5.09822 19.2205L4.66179 19.3675C3.68016 19.6982 2.59465 19.3063 2.07505 18.4338L1.2903 17.1161C0.770719 16.2436 0.963446 15.1363 1.74956 14.4774L2.09922 14.1844C3.47324 13.0327 3.47324 10.9672 2.09922 9.8156L1.74956 9.52254C0.963446 8.86366 0.77072 7.75638 1.2903 6.8839L2.07508 5.56608C2.59466 4.69359 3.68014 4.30176 4.66176 4.63236L5.09831 4.77939C6.81401 5.35722 8.65909 4.32449 9.00082 2.59506L9.0878 2.15487C9.28331 1.16542 10.176 0.449982 11.2152 0.449982H12.7848ZM12 15.3C13.8225 15.3 15.3 13.8225 15.3 12C15.3 10.1774 13.8225 8.69998 12 8.69998C10.1774 8.69998 8.69997 10.1774 8.69997 12C8.69997 13.8225 10.1774 15.3 12 15.3Z" fill="#000000"/> </svg>
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
  const [ textEditShow, setTextEditShow ] = useState(false);
  const [ textConfigData, setTextConfigData ] = useState({
    fontFamily: '',
    fontSize: '',
    fill: '',
  });
  
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const fabricMaskObject = useRef(null);
  const imageObject = useRef(null);
  const TextObject = useRef(null);

  const addCustomControl = () => {
    var deleteIcon = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgZmlsbD0iIzAwMDAwMCIgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiANCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0wLDB2NTEyaDUxMlYwSDB6IE0zMjcuMTE1LDM2NS45MDRMMjU2LDI5NC43ODlsLTcxLjExNSw3MS4xMTVsLTM4Ljc4OS0zOC43ODlMMjE3LjIxMSwyNTZsLTcxLjExNS03MS4xMTVsMzguNzg5LTM4Ljc4OQ0KCQkJTDI1NiwyMTcuMjExbDcxLjExNS03MS4xMTVsMzguNzg5LDM4Ljc4OUwyOTQuNzg5LDI1Nmw3MS4xMTUsNzEuMTE1TDMyNy4xMTUsMzY1LjkwNHoiLz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4=";

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -24,
      offsetX: 0,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteIcon),
      cornerSize: 24
    });

    function deleteObject(eventData, transform) {
      let r = confirm("Are you sure you want to delete?");
      if(!r) return;

      let target = transform.target;
      let __editItem = { ...editItem }
      let foundIndex = __editItem.useImages.findIndex(url => url == target.__IMAGE_URL);

      fabricRef.current.remove(target);
      fabricRef.current.renderAll();
      fabricRef.current.fire('object:modified');

      if(foundIndex != -1) {
        __editItem.useImages.splice(foundIndex, 1);
        setEditItem(__editItem);
      }
    }

    function renderIcon(icon) {
      var iconImg = document.createElement('img');
      iconImg.src = icon;

      return function (ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(iconImg, -size/2, -size/2, size, size);
        ctx.restore();
      }
    }
  }

  useEffect(() => {
    fabricRef.current = initCanvas();
    addCustomControl();
    
    if(editItem.save && editItem.save != null && editItem.save != '') { 
      fabricRef.current.clear();
      fabricRef.current.loadFromJSON(editItem.save, () => {
        fabricRef.current.renderAll();  
      }, (_, _object) => {
        switch(_object.__LABEL) {
          case "PREVIEW_IMAGE":
            imageObject.current = _object;
            _object.scaleToWidth(_object.__MASKWIDTH);
            _object.on('modified', onUpdate__MASKWIDTH);
            break;
          
          case "MASK_IMAGE":
            fabricMaskObject.current = _object;
            setReady(true);
            break;

          case "TEXT_OBJECT":
            setText(_object.text);
            TextObject.current = _object;
            _object.on('modified', onUpdate__TEXTOBJECT);
            setTextConfigData({
              ...textConfigData, 
              fontFamily: TextObject.current.fontFamily,
              fontSize: TextObject.current.fontSize,
              fill: TextObject.current.fill,
            });
            applyFont(TextObject.current.fontFamily, () => {
              TextObject.current.set('fontFamily', TextObject.current.fontFamily);
              fabricRef.current.renderAll();
            })
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
      let exportMethods = ['__LABEL', '__MASKWIDTH', '__IMAGE_URL', 'lockMovementY', 'hasControls', 'selectable', 'scaleX', 'scaleY'];
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
      
      if(typeof editItem?.fabricConfig?.scaleToWidth !== "undefined") {
        img.scaleToWidth(editItem.fabricConfig.scaleToWidth);
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
      fill: '#ff4d00',
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

    setTextConfigData({
      ...textConfigData, 
      fontfamily: TextObject.current.fontFamily,
      fontSize: TextObject.current.fontSize,
      fill: TextObject.current.fill,
    });

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

  const applyFont = (font, cb) => {
    let fontDefault = ['Arial'];

    if(fontDefault.includes(font)) {
      if(cb) { cb.call() }
      return;
    }

    let customFont = new FontFaceObserver(font)
    customFont
      .load()
      .then(() => {
        if(cb) { cb.call() }
      }).catch((e) => {
        console.log(e)
      });
  }

  const onAddImage = (image_url) => {
    let __image_url = `${ image_url }?__key=${ Math.random().toString(36) }`;
    let __editItem = { ...editItem };
    __editItem.useImages.push(__image_url);
    setEditItem(__editItem);
    
    fabric.Image.fromURL(image_url, (img) => { 
      const maskWidth = fabricMaskObject.current.getScaledWidth();
      img.set('__LABEL', 'IMAGES'); // set tag
      img.set('__MASKWIDTH', maskWidth);
      img.set('__IMAGE_URL', __image_url);

      img.scaleToWidth(maskWidth);
      img.globalCompositeOperation = 'source-atop'; 
      img.on('modified', onUpdate__MASKWIDTH);

      fabricRef.current.add(img); 
      fabricRef.current.centerObject(img);    // Object center
      fabricRef.current.setActiveObject(img)  // Active object

      let _zindex = fabricRef.current.getObjects().indexOf(img);
      if(TextObject.current)
        fabricRef.current.moveTo(TextObject.current, _zindex + 1);

      fabricRef.current.renderAll();   
      // console.log(img);
      // trigger object:modified
      fabricRef.current.fire('object:modified');
    });
  }

  return <div className="design-casket__edit-image">
    
    <div className="__edit-area">
      <canvas ref={ canvasRef }></canvas>
      {/* <img src={ editItem?.designImage } alt="" /> */}
      {/* { JSON.stringify(editItem.useImages) } */}
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
          <div className="__text-config-control">
            <span className="__icon-toggle" onClick={ e => setTextEditShow(true) }>
              <GearIcon />
            </span>
            <div className={ ['__t-config-container', textEditShow ? '__open' : ''].join(' ') }>
              {/* { JSON.stringify(textConfigData) } */}
              <span className="__close" onClick={ e => { setTextEditShow(false) } } title="Close">✕</span>
              <TextConfig 
                cData={ textConfigData }
                onChange={ (name, value) => {
                  setTextConfigData({ ...textConfigData, [name]: value });
                  if(name == 'fontFamily') {
                    applyFont(value, () => {
                      TextObject.current.set(name, value);
                      fabricRef.current.renderAll();
                      fabricRef.current.fire('object:modified');
                    })
                  } else {
                    TextObject.current.set(name, value);
                    fabricRef.current.renderAll();
                    fabricRef.current.fire('object:modified');
                  }
                  
                } } />
            </div>
          </div>
        </div>
      }
      {
        DC_PHP_DATA.settings.enable_image_collection == true && 
        <div className="__select-image">
          <h5>Select Image <sup className="__icon-tooltip" id="design-casket-select-image-tooltip" dangerouslySetInnerHTML={{__html: __HELP_ICON}}></sup></h5>
          <Tooltip anchorSelect="#design-casket-select-image-tooltip">
            Pick an image from our collection
          </Tooltip>
          <ul>
            { image_collection.map((item, __i_index) => {
              return <li className="image-item" key={ __i_index } onClick={ e => {
                e.preventDefault();
                // onSetImagePreview(item.image);
                onAddImage(item.image) 
              } }>
                <span>
                  <img src={ item.thumbnail } alt="#" />
                </span>
              </li>
            }) }
          </ul>
        </div>
      }

      <div className="__upload-image">
        <h5>Add image <sup className="__icon-tooltip" id="design-casket-upload-image-tooltip" dangerouslySetInnerHTML={{__html: __HELP_ICON}}></sup></h5>
        <Tooltip anchorSelect="#design-casket-upload-image-tooltip">
          Upload an image from your device
        </Tooltip>
        <UploadImage onhandleChange={ onUploadImage } />
        {/* { JSON.stringify(userUploadImages) } */}
        {/* {
          userUploadImages.length > 0 && 
          <ul className="__user-upload-images">
            {
              userUploadImages.map((url, __index_url) => {
                return <li className="__user-image-item" key={ __index_url } >
                  <span onClick={ e => {
                    e.preventDefault();
                    // onSetImagePreview(url);
                    onAddImage(url) 
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
        } */}
      </div>
    </div> 
  </div>
}