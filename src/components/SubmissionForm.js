import { useState, useEffect, useRef, Fragment } from "react";

const SubmitIconArrow = () => {
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
}

const LoadingIconAnim = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40"> <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/> </path> </svg>
}

export default function SubmissionForm({ title, desc, onSubmitFn, buttons = [], loading }) {
  const [dataForm, setDataForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
  });

  const onUpdateFields = (value, name) => {
    setDataForm({ ...dataForm, [name]: value })
  }

  const fieldsValidate = () => {
    return true;
  }
  
  const _onSubmit = (e) => {
    e.preventDefault();
    const pass = fieldsValidate();
    if(!pass) return;

    onSubmitFn(e, dataForm);
  }

  return <div className={ ['dc-submission-form-container', (loading ? '__is-disable' : '')].join(' ') }>
    <form onSubmit={ e => _onSubmit(e) } className="dc-form dc-form__submission-form">  
      { 
        title && title != '' && 
        <h2 className="dc-form__title">{ title }</h2> 
      }
      { 
        desc && desc != '' && 
        <div className="dc-form__desc">
          <p dangerouslySetInnerHTML={{__html: desc}}></p>
        </div> 
      }
      
      <label className="dc-form__group-field">
        <span className="__label">First name *</span>
        <input 
          type="text" 
          name="firstname" 
          placeholder="" 
          value={ dataForm.firstname } 
          required
          onChange={ e => onUpdateFields(e.target.value, 'firstname') } />
      </label>

      <label className="dc-form__group-field">
        <span className="__label">Last name *</span>
        <input 
          type="text" 
          name="lastname" 
          placeholder="" 
          value={ dataForm.lastname } 
          required 
          onChange={ e => onUpdateFields(e.target.value, 'lastname') } />
      </label>

      <label className="dc-form__group-field">
        <span className="__label">Email *</span>
        <input 
          type="email" 
          name="email" 
          placeholder="" 
          value={ dataForm.email } 
          required 
          onChange={ e => onUpdateFields(e.target.value, 'email') } />
      </label>

      <label className="dc-form__group-field">
        <span className="__label">Phone *</span>
        <input 
          type="tel" 
          name="phone" 
          placeholder="" 
          value={ dataForm.phone } 
          required 
          onChange={ e => onUpdateFields(e.target.value, 'phone') } />
      </label>

      <div className="dc-form__address-group-fields">
        <label className="dc-form__group-field">
          <span className="__label">Address</span>
          <input 
            type="text" 
            name="address" 
            placeholder=""
            value={ dataForm.address } 
            required 
            onChange={ e => onUpdateFields(e.target.value, 'address') } />
        </label>

        <label className="dc-form__group-field">
          <span className="__label">City</span>
          <input 
            type="text" 
            name="city" 
            placeholder="" 
            value={ dataForm.city } 
            required 
            onChange={ e => onUpdateFields(e.target.value, 'city') } />
        </label>

        <label className="dc-form__group-field">
          <span className="__label">Postcode</span>
          <input 
            type="text" 
            name="postcode" 
            placeholder="" 
            value={ dataForm.postcode } 
            required 
            onChange={ e => onUpdateFields(e.target.value, 'postcode') } />
        </label>
      </div>

      <div className="dc-form__bottom">
        <button className={ ['design-casket__button button-secondary design-casket__button-submit', (loading ? '__btn-loading' : '')].join(' ') }>
          {
            ((_l) => {
              if(_l == false) {
                return <>Submit <SubmitIconArrow /></>
              } else {
                return <><LoadingIconAnim /> Saving...</>
              }
            })(loading)
          }
        </button>
        {
          buttons.length > 0 && buttons.map((B, __btn_index) => {
            return <Fragment key={ __btn_index }>{ B }</Fragment>
          })
        }
      </div>
    </form> 
  </div>
}