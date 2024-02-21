import { useDesignCasketContext } from '../libs/DesignCasketContext'

export default function NavViewer() {
  const { NavViews, navActive, onChangeNavActive } = useDesignCasketContext()  

  return <div className="design-casket__nav-viewer">
    <ul>
      {
        NavViews.map(n => {
          return <li 
            className={ ['nav-viewer-item', n.classes, (navActive == n.__key ? '__active' : '')].join(' ') } 
            key={ n.__key }
            onClick={ e => {
              e.preventDefault();
              onChangeNavActive(n.__key);
            } }>
            <label>{ n.name }</label>
            <img src={ n.image } alt={ n.name } />
          </li>
        }) 
      }
    </ul>
  </div>
}