import { useState, useEffect } from "react";

const __FONTFAMILY = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Taprom', value: 'Taprom' },
  { name: 'Poppins', value: 'Poppins' },
  { name: 'Caveat', value: 'Caveat' },
]

export default function TextConfig({ onChange, cData }) {
  const [ _cData, set_CData ] = useState(cData);

  useEffect(() => {
    set_CData(cData);
  }, [cData])

  const onChangeField = (name, value) => {
    // let newCData = {..._cData, [name]: value}
    // set_CData(newCData);
    onChange(name, value)
  }
  
  return <div className="design-casket__text-config">
    <h4>Text Config</h4>
    {/* { JSON.stringify(_cData) } */}
    <form className="dc-form dc-text-config-form">
      <div className="__g—t-config">
        <label className="dc-form__group-field">
          <span className="__label">Form Family</span>
          <select 
            name="text__formfamily" 
            value={ _cData.fontFamily } 
            onChange={ e => onChangeField('fontFamily', e.target.value) }>
            {
              __FONTFAMILY.map(f => {
                return <option key={ f.value } value={ f.value }>{ f.name }</option>
              }) 
            }
          </select>
        </label>

        <label className="dc-form__group-field">
          <span className="__label">Size</span>
          <input 
            type="number" 
            value={ _cData.fontSize } 
            min={ 10 }
            max={ 30 }
            onChange={ e => onChangeField('fontSize', e.target.value) } />
        </label>

        <label className="dc-form__group-field">
          <span className="__label">Color</span> 
          <input 
            type="color" 
            value={ _cData.fill } 
            onChange={ e => onChangeField('fill', e.target.value) } />
        </label>
      </div>
    </form>   
  </div>
}