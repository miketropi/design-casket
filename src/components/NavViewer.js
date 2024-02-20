import lidIcon from '../../images/lid_icon.png';
import leftIcon from '../../images/left_icon.png';
import rightIcon from '../../images/right_icon.png';
import topIcon from '../../images/top_icon.png';
import bottomIcon from '../../images/bottom_icon.png';

export default function NavViewer() {
  const views = [
    {
      __key: '968ccc56-e5b8-4af3-a68f-e65c3cb02fb9',
      name: 'Lid',
      image: lidIcon,
    },
    {
      __key: '65b13379-a8bc-49e1-a7a5-de149038571d',
      name: 'Left Side',
      image: leftIcon,
    },
    {
      __key: '529e804a-e512-49ff-80c7-463f9a6c247c',
      name: 'Right Side',
      image: rightIcon,
    },
    {
      __key: 'bd0346c6-4e04-43bb-b2ca-d5c8222a065d',
      name: 'Top',
      image: topIcon,
    },
    {
      __key: '5518e0b7-7cc3-4157-af66-2b4d8b83f017',
      name: 'Bottom',
      image: bottomIcon,
    }
  ];

  return <div className="design-casket__nav-viewer">
    <ul>
      {
        views.map(n => {
          return <li key={ n.__key }>
            <img src={ n.image } alt={ n.name } />
          </li>
        })
      }
    </ul>
  </div>
}