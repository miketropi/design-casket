import { Portal } from 'react-portal';

export default function Modal({ children, title, className, open, onClose }) {

  return <Portal>
    {
      open == true &&
      <div className={ ['design-casket__modal', className].join(' ') }>
        <div className="design-casket__modal-inner">
          {
            (title != '') && 
            <div className="design-casket__modal-title">
              <h4>{ title }</h4>
            </div>
          }
          
          <div className="design-casket__modal-body">
            { children }
          </div>

          <div className="design-casket__modal-buttons">
            <button className="design-casket__button" onClick={ e => {
              e.preventDefault();
              onClose ? onClose(e) : '';
            } }>Close</button>
          </div>
        </div>
      </div>
    }
  </Portal>
}