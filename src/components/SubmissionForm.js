import { useState, useEffect, useRef, Fragment } from "react";

const SubmitIconArrow = () => {
  return <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </svg>;
}

export default function SubmissionForm({ title, desc, onSubmit, buttons = [] }) {
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

  }
  
  const _onSubmit = (e) => {
    e.preventDefault();
    const pass = fieldsValidate();
    if(!pass) return;

    onSubmit(e, dataForm);
  }

  return <div className="dc-submission-form-container">
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
        <button className="design-casket__button button-secondary design-casket__button-submit">
          Submit 
          <SubmitIconArrow />
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