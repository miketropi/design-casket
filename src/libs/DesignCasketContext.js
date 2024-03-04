import { createContext, useContext, useEffect, useState } from "react";
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

const DebuggingCasketContext_Provider = ({ children }) => {
  const [data, setData] = useState(CasketLayerConfig.map(({__key, name, image, maskImage, fabricConfig}) => {
    return {
      __key, 
      name, 
      maskImage,
      icon: image, 
      previewImage: '', 
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

  const inShowHandles = [
    '65b13379-a8bc-49e1-a7a5-de149038571d',   // left side key
    '529e804a-e512-49ff-80c7-463f9a6c247c'    // right side key
  ];

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

    setData(__data);
    setEditImageModalOpen(false); // close modal edit
  }

  const value = {
    version: '1.0.1',
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
  };
  return <DesignCasketContext.Provider value={ value }>
    { children }
  </DesignCasketContext.Provider>
}

const useDesignCasketContext = () => {
  return useContext(DesignCasketContext);
}

export { DebuggingCasketContext_Provider, useDesignCasketContext }