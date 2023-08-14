import React, { useState } from "react";

function RadioForm() {
  const options = [
    { id: "1", label: "one" },
    { id: "2", label: "two" },
    { id: "3", label: "two" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].id);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      {options.map((option) => (
        <label key={option.id}>
          <input
            type="radio"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={handleOptionChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioForm;

// import React, { useState } from "react";

// function RadioForm() {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     console.log(event.target.value);
//   };

//   return (
//     <div>
//       <label>
//         <input
//           type="radio"
//           value="one"
//           checked={selectedOption === "one"}
//           onChange={handleOptionChange}
//         />
//         one
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           value="two"
//           checked={selectedOption === "two"}
//           onChange={handleOptionChange}
//         />
//         two
//       </label>
//       <br />
//       <label>
//         <input
//           type="radio"
//           value="three"
//           checked={selectedOption === "three"}
//           onChange={handleOptionChange}
//         />
//         three
//       </label>
//     </div>
//   );
// }

// export default RadioForm;
