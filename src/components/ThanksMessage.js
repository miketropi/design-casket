const CheckIcon = () => {
  return <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg"> <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g fill="#4CAF50" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51296 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.153707,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51296 331.153707,3.55271368e-14 213.333333,3.55271368e-14 Z M293.669333,137.114453 L323.835947,167.281067 L192,299.66912 L112.916693,220.585813 L143.083307,190.4192 L192,239.335893 L293.669333,137.114453 Z"> </path> </g> </g> </svg>
}

export default function ThanksMessage() {
  return <div className="design-casket__thanks-message">
    <h4>Thank you!!!</h4>
    <CheckIcon />
    <p>We have received your information, we will contact you as soon as possible, please wait.</p>
  </div>
}