import { createContext, useContext, useEffect, useState } from "react";
import { saveDesign, getDesignJsonUrl, saveSubmission } from "./api";
import lidIcon from '../../images/lid_icon.png';
import leftIcon from '../../images/left_icon.png';
import rightIcon from '../../images/right_icon.png';
import topIcon from '../../images/top_icon.png';
import bottomIcon from '../../images/bottom_icon.png';

const DesignCasketContext = createContext("");
const CasketLayerConfig = [
  {
    __key: '968ccc56-e5b8-4af3-a68f-e65c3cb02fb9',
    name: 'Lid',
    image: `/wp-content/plugins/design-casket/dist${lidIcon}`,
    maskImage: '/wp-content/plugins/design-casket/images/lid.png',
    classes: 'view-lid',
    classTransformView: 'casket-design-preview-show-lid', 
    fabricConfig: {
      scaleToWidth: 600,
      textDesign: true,
      textDefault: 'Design Casket'
    } 
  },
  {
    __key: '65b13379-a8bc-49e1-a7a5-de149038571d',
    name: 'Left Side',
    image: `/wp-content/plugins/design-casket/dist${leftIcon}`,
    maskImage: '/wp-content/plugins/design-casket/images/520210a3-79e2-4c76-94eb-764bda41f63a.png',
    classes: 'view-left-side',
    classTransformView: 'casket-design-preview-show-left',
    fabricConfig: {
      scaleToWidth: 600,
    }
  },
  { 
    __key: '529e804a-e512-49ff-80c7-463f9a6c247c',
    name: 'Right Side',
    image: `/wp-content/plugins/design-casket/dist${rightIcon}`,
    maskImage: '/wp-content/plugins/design-casket/images/520210a3-79e2-4c76-94eb-764bda41f63a.png',
    classes: 'view-right-side',
    classTransformView: 'casket-design-preview-show-right',
    fabricConfig: {
      scaleToWidth: 600,
    }
  },
  {
    __key: 'bd0346c6-4e04-43bb-b2ca-d5c8222a065d',
    name: 'Head End',
    image: `/wp-content/plugins/design-casket/dist${topIcon}`,
    maskImage: '/wp-content/plugins/design-casket/images/top.png',
    classes: 'view-head-end',
    classTransformView: 'casket-design-preview-show-top',
    fabricConfig: { }
  },
  {
    __key: '5518e0b7-7cc3-4157-af66-2b4d8b83f017', 
    name: 'Foot End',
    image: `/wp-content/plugins/design-casket/dist${bottomIcon}`,
    maskImage: '/wp-content/plugins/design-casket/images/bottom.png',
    classes: 'view-foot-end',
    classTransformView: 'casket-design-preview-show-bottom',
    fabricConfig: { }
  }
];

const DebuggingCasketContext_Provider = ({ children, design, editmode }) => {
  // console.log(design, editmode);
  const [PID, setPID] = useState(design ? design : '');
  const [_editMode, set_editMode] = useState(editmode);
  const [data, setData] = useState(CasketLayerConfig.map(({__key, name, image, maskImage, fabricConfig}) => {
    return {
      __key, 
      name, 
      maskImage,
      icon: image, 
      previewImage: '', 
      useImages: [],
      designImage: '',
      fabricConfig,
      save: null,
    }
  }));
  const [editItem, setEditItem] = useState(data[0]);
  const [navActive, setNavActive] = useState('968ccc56-e5b8-4af3-a68f-e65c3cb02fb9');
  const [currentView, setCurrentView] = useState('casket-design-preview-show-lid');
  const [editButtonText, setEditButtonText] = useState('Edit Lid Image');
  const [faqsModalOpen, setFaqsModalOpen] = useState(false);
  const [showHandles, setShowHandles] = useState(false);
  const [displayOptShowHandles, setDisplayOptShowHandles] = useState(false);
  const [editImageModalOpen, setEditImageModalOpen] = useState(false);
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [hadEdit, setHasEdit] = useState(false);
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false); 
  const [userUploadImages, setUserUploadImages] = useState([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUri, setShareUri] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const inShowHandles = [
    '65b13379-a8bc-49e1-a7a5-de149038571d',   // left side key
    '529e804a-e512-49ff-80c7-463f9a6c247c'    // right side key
  ];

  const __getDesignJsonUrl = async (PID) => {
    const { success, design_data_url } = await getDesignJsonUrl(PID);
    if(!design_data_url) return;

    jQuery.get(design_data_url, designData => {
      let mapBoolean = {
        "true": true,
        "false": false,
      };

      setData(designData);
      setEditItem(designData[0]);
      
      return;
      // Fix json data
      let _designData = designData.map(i => {

        if(i?.fabricConfig?.textDesign != undefined) {
          i.fabricConfig.textDesign = mapBoolean[i.fabricConfig.textDesign];
        }

        if(!i.save?.objects) return i;

        i.save.objects = [...i.save.objects].map(oItem => {
          oItem.crossOrigin = null;
          oItem.filters = [];
          oItem.shadow = null;

          let bl = [
            'linethrough', 
            'selectable', 
            'hasControls', 
            'lockMovementY', 
            'overline', 
            'strokeUniform', 
            'underline', 
            'visible',
            'flipX', 
            'flipY',
          ];

          bl.forEach(__ => {
            if(oItem[__]) {
              oItem[__] = mapBoolean[oItem[__]];
            }
          })

          if(oItem.__LABEL == "TEXT_OBJECT") {
            oItem.styles = {};
          }

          return oItem;
        });
        return i;
      })

      setData(_designData);
      setEditItem(_designData[0]);
    })
  }

  const __setPID = () => {
    if(!window.location.hash) return;
    let [tag, PID] = window.location.hash.split('_');
    if('#designcasket' != tag) return;


    setPID(PID);
    set_editMode(false);
  }

  const __loadUserUploadImages = () => {
    const __DS_USER_UPLOAD_IMAGES = localStorage.getItem("__DS_USER_UPLOAD_IMAGES");
    if(__DS_USER_UPLOAD_IMAGES == null) return;

    setUserUploadImages(JSON.parse(__DS_USER_UPLOAD_IMAGES));
  }

  const __addUserUploadImages = (url) => {
    let __DS_USER_UPLOAD_IMAGES = [...userUploadImages];
    __DS_USER_UPLOAD_IMAGES.push(url);
    setUserUploadImages(__DS_USER_UPLOAD_IMAGES);
    localStorage.setItem("__DS_USER_UPLOAD_IMAGES", JSON.stringify(__DS_USER_UPLOAD_IMAGES));
  }

  const __removeUserUploadImageItem = (index) => {
    let __DS_USER_UPLOAD_IMAGES = [...userUploadImages];
    __DS_USER_UPLOAD_IMAGES.splice(index, 1);
    setUserUploadImages(__DS_USER_UPLOAD_IMAGES);
    localStorage.setItem("__DS_USER_UPLOAD_IMAGES", JSON.stringify(__DS_USER_UPLOAD_IMAGES));
  }

  useEffect(() => {
    __setPID();

    window.addEventListener("hashchange", () => {
      __setPID();
    }, false );

    __loadUserUploadImages();
  }, []);

  useEffect(() => {
    __getDesignJsonUrl(PID);
  }, [PID])

  useEffect(() => {
    const found = CasketLayerConfig.find(n => n.__key === navActive);
    setCurrentView(found.classTransformView);
    setEditButtonText(`Edit ${ found.name } Image`)

    setEditItem([...data].find(n => n.__key === navActive));

    if(inShowHandles.includes(navActive)) {
      setDisplayOptShowHandles(true)
    } else {
      setDisplayOptShowHandles(false);
    }
  }, [navActive])

  const onChangeNavActive = (key) => {
    setNavActive(key);
  }

  const onApplyDesign = () => {
    const __data = [...data];
    const found = data.findIndex(n => n.__key == editItem.__key);
    __data[found] = editItem;
    
    // console.log(found, editItem);
    setData(__data);
    setEditImageModalOpen(false); // close modal edit
    setHasEdit(true);
  }

  const onSaveDesign = async () => {
    setIsSaving(true)
    const res = await saveDesign(data, '');
    setPID(res.PID);
    setHasEdit(false);

    setIsSaving(prevState => {
      setIsSaving(false);
    })

    return res;
  }

  const onUpdateHash = (_ID) => {
    window.location.hash = `designcasket_${ _ID }`
  }

  const onSubmissionSubmit = async (e, formData) => {
    setSubmissionLoading(true);
    let _designID = PID;
    if(_designID == '') {
      // save new design
      const res = await onSaveDesign();
      _designID = res.PID
    } else {
      // had modify design
      if(hadEdit == true) {
        const res = await onSaveDesign();
        _designID = res.PID
      }
    }

    let _formData = {...formData, design: _designID }
    // console.log(e, formData, PID);
    const resSaveSubmission = await saveSubmission(_formData);
    // console.log(resSaveSubmission);
    setSubmissionLoading(false);
    setSubmissionComplete(true);

    onUpdateHash(_designID);
  }

  const shareUri_Func = async () => {
    let _designID = PID;
    if(_designID == '') {
      // save new design
      const res = await onSaveDesign();
      _designID = res.PID
    } else {
      // had modify design
      if(hadEdit == true) {
        const res = await onSaveDesign();
        _designID = res.PID
      }
    }

    const { settings: { root_url_sharing } } = DC_PHP_DATA;
    setShareUri(`${ root_url_sharing }#designcasket_${ _designID }`);
    // setShareModalOpen(true);
        
    let text = `Hello,
    Please click the link below to view the proposed coffin design.
    Thank you!`;

    let designUrlField = document.querySelector('.__field-design-url input');
    let contentField = document.querySelector('.__field-edit-content-here textarea');
    
    designUrlField.value = `${ root_url_sharing }#designcasket_${ _designID }`;
    // contentField.value = text;
    // contentField.dispatchEvent(new Event("input", { bubbles: true }));  

    document.body.classList.add('__show_design_casket__share-modal');

    onUpdateHash(_designID);
  }

  const value = {
    version: '1.0.1',
    _editMode,
    image_collection: DC_PHP_DATA.settings.image_collection,
    NavViews: CasketLayerConfig,
    currentView,
    navActive,
    editButtonText,
    faqsModalOpen,
    setFaqsModalOpen,
    onChangeNavActive,
    showHandles, setShowHandles,
    displayOptShowHandles, setDisplayOptShowHandles,
    editImageModalOpen, setEditImageModalOpen,
    data, setData,
    editItem, setEditItem,
    onApplyDesign,
    onSaveDesign,
    submissionModalOpen, setSubmissionModalOpen,
    onSubmissionSubmit,
    hadEdit, setHasEdit,
    submissionLoading, setSubmissionLoading,
    submissionComplete, setSubmissionComplete,
    userUploadImages,
    __addUserUploadImages, __removeUserUploadImageItem,
    shareModalOpen, setShareModalOpen,
    shareUri, setShareUri,
    shareUri_Func,
    isSaving, setIsSaving,
  };
  return <DesignCasketContext.Provider value={ value }>
    { children }
  </DesignCasketContext.Provider>
}

const useDesignCasketContext = () => {
  return useContext(DesignCasketContext);
}

export { DebuggingCasketContext_Provider, useDesignCasketContext }