import { useDesignCasketContext } from "../libs/DesignCasketContext";
import { Tooltip } from 'react-tooltip';

export default function EditImage() {
  const { data, setData, editItem, image_collection } = useDesignCasketContext();
  const helpIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM7.92 9.234v.102a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-1.29.998-1.979 2.34-1.979 1.308 0 2.168.689 2.168 1.67 0 .928-.482 1.359-1.686 1.91l-.344.154C11.379 11.54 11 12.21 11 13.381v.119a.5.5 0 0 0 .5.5h.997a.499.499 0 0 0 .499-.499c0-.516.138-.723.55-.912l.345-.155c1.445-.654 2.529-1.514 2.529-3.39v-.103c0-1.978-1.72-3.441-4.164-3.441-2.478 0-4.336 1.428-4.336 3.734zm2.58 7.757c0 .867.659 1.509 1.491 1.509.85 0 1.509-.642 1.509-1.509 0-.867-.659-1.491-1.509-1.491-.832 0-1.491.624-1.491 1.491z" fill="#000000"/></svg>`;

  return <div className="design-casket__edit-image">
    {/* { JSON.stringify(data) } */}
    <div className="__edit-area">
      { JSON.stringify(editItem) }
    </div>
    <div className="__edit-tool-area">
      <div className="__select-image">
        <h5>Select Image <sup className="__icon-tooltip" id="design-casket-select-image-tooltip" dangerouslySetInnerHTML={{__html: helpIcon}}></sup></h5>
        <Tooltip anchorSelect="#design-casket-select-image-tooltip">
          Pick an image from our collection
        </Tooltip>
        <ul>
          { image_collection.map((item, __i_index) => {
            return <li className="image-item" key={ __i_index }>
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