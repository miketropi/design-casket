import { useEffect } from 'react';
import 'sharer.js';

const FacebookIcon = () => {
  let svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"> <g fill="none" fill-rule="evenodd"> <path d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z" fill="#3B5998" fill-rule="nonzero"></path> <path d="M25.7305108 45h5.4583577V30.0073333h4.0947673l.8098295-4.6846666h-4.9045968V21.928c0-1.0943333.7076019-2.2433333 1.7188899-2.2433333h2.7874519V15h-3.4161354v.021c-5.3451414.194-6.4433395 3.2896667-6.5385744 6.5413333h-.0099897v3.7603334H23v4.6846666h2.7305108V45z" fill="#FFF"></path> </g> </svg>`;
  return <span className="svg-icon" dangerouslySetInnerHTML={{ __html: svgHTML }}></span>
}

const XIcon = () => {
  let svgHTML = `<svg viewBox="0 0 192 192" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;">
  <rect width="192" height="192" rx="96" fill="black"></rect>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M42 47H76L100 78.5L127 47H144L107.5 88.5L150 145H117L91 111L61 145H44L83 100.5L42 47ZM62 57H71.5L130.5 135H121.5L62 57Z" fill="white"></path>
  </svg>`;
  return <span className="svg-icon" dangerouslySetInnerHTML={{ __html: svgHTML }}></span>
}

const EmailIcon = () => {
  let svgHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" focusable="false" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"> <g fill-rule="nonzero" fill="none"> <path d="M28.4863253 59.9692983c-6.6364044-.569063-11.5630204-2.3269561-16.3219736-5.8239327C4.44376366 48.4721168 3e-7 39.6467924 3e-7 29.9869344c0-14.8753747 10.506778-27.18854591 25.2744118-29.61975392 6.0281072-.9924119 12.7038532.04926445 18.2879399 2.85362966C57.1386273 10.0389054 63.3436516 25.7618627 58.2050229 40.3239688 54.677067 50.3216743 45.4153135 57.9417536 34.81395 59.5689067c-2.0856252.3201125-5.0651487.5086456-6.3276247.4003916z" fill="#888"></path> <path d="M40.531502 19.160814h-22c-1.74 0-2.986 1.2375-3 3v16c0 1.7625 1.26 3 3 3h22c1.74 0 3-1.2375 3-3v-16c0-1.7625-1.26-3-3-3zm0 6l-11 7-11-7v-3l11 7 11-7v3z" fill="#FFF"></path> </g> </svg>`;
  return <span className="svg-icon" dangerouslySetInnerHTML={{ __html: svgHTML }}></span>
}

export default function Share({ ShareUrl }) {
  const SOCIALS = [
    {
      __key: 'b86b9bdc-c714-4be4-8a7f-0bc17dc18ffb',
      s_name: 'facebook',
      name: 'Facebook',
      classes: 's-facebook',
      icon: <FacebookIcon />,
      handle: (ev) => {
        console.log(ShareUrl);
      }
    },
    {
      __key: '7591223e-0932-4f33-8622-97b713ded6c2',
      s_name: 'twitter',
      name: 'X',
      classes: 's-x',
      icon: <XIcon />,
      handle: (ev) => {
        console.log(ShareUrl);
      }
    },
    {
      __key: 'aa6edb5b-440f-49f5-8a5c-7303211402ec',
      s_name: 'email',
      name: 'Email',
      icon: <EmailIcon />,
      classes: 's-email',
      handle: (ev) => {
        console.log(ShareUrl);
      }
    },
  ];

  useEffect(() => {
    window.Sharer.init();

    return () => {

    }
  }, [ShareUrl])

  return <div className="design-casket__share">
    <div className="__socials">
      {
        SOCIALS.map(({ __key, classes, s_name, name, icon, handle }) => {
          return <div 
            key={ __key } 
            className={ ['__s-itme', classes].join(' ') } 
            title={ `Share via ${ name }` } 
            onClick={ e => handle(e) }
            data-sharer={ s_name } data-title={ `Design Casket` } data-url={ ShareUrl }>
            { icon }
          </div>
        })
      }
    </div>
    <div className="__copy-url">
      <input value={ ShareUrl } type="text" readOnly />
    </div>
  </div>
}