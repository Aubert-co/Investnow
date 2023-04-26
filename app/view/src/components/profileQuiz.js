import React,{useRef,useState} from "react";
import { ProfileStyle } from "../styles/ProfileStyle";

const datasQuiz = [
  { answer: "What is your level of education in investments?", key: "edu" },
  {
    answer: "What is your level of expertise in risk management?",
    key: "risk",
  },
  {
    answer: "If you lost a trade, how much of a percentage are you willing to lose?",
    key: "loss",
  },
  { answer: "How many sources of income do you have?", key: "inc" },
];

const valu = [
   {values:["Beginner", "Intermediate", "Advanced", "Expert"],key:"edu"}, 
   {values:["Beginner", "Intermediate", "Advanced", "Expert"],key:"risk"},
   {values:["0%", "25%", "50%", "75%"],key:"inc"},
   {values:[0, 1, 2,"3 or more"],key:"loss"}
];

function Question({ options, onSelect }) {
    const handleChange = (event,key) => {
      onSelect(event.target.value,key);
    };
  
    return (
      <div>
        <ul>
          {options.values.map((option, index) => (
            
              <label key={index}>
                <input
                  type="radio"
                  name={options.key}
                  value={option}
                  onChange={()=>handleChange(event,options.key)}
                  
                />
                {option}
              </label>
          ))}
        </ul>
      </div>
    );
  }
 
 
const Map = ({ questions, options,handleSelect }) =>{
    return (
      <>
        <p>{questions.answer}</p>
        <Question options={options} onSelect={handleSelect}/>
      </>
    );
  }
function ProfileQuiz(){
  const [answers, setAnswers] = useState([]);


  const handleSelect = ( value, key) => {
    
    if (answers.length === 0) {
      setAnswers([{ value, key }]);
      return;
    }
    const filter = answers.filter((val)=>val.key === key)
    if(filter.length ===0){
      setAnswers([...answers,{value,key}])
      return 
    }
    const newArray = answers.map((val) => {
     
      if (val.key === key) return { value, key };
      return val;
    });
  
    setAnswers(newArray);
  };

  const handleSubmit = () => {
    console.log(answers)
  };
  return (
    <ProfileStyle>  
      {datasQuiz.map((val,ind)=><Map questions={val} options={valu[ind]} handleSelect={handleSelect}/>)}
      <button onClick={handleSubmit}>button</button>
    </ProfileStyle>
      
  )
}
 
export default ProfileQuiz