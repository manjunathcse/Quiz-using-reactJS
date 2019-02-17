import React,{Component} from 'react';
import Quizdata from '../data/questionBank.json';
class Quiz extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Quizdata: Quizdata || [],
      showResult: false,
      finalResult: 0,
      totalQuestions:Quizdata.length
    }
  }

  clickAnswerHandler = (i,index) => () => { 
    const { Quizdata } = this.state;
    Quizdata[i].selectedAnswer = index;
    this.setState({
      ...this.state,
      Quizdata: Quizdata
    });
    const loggerResult = Quizdata[i].correctAns === index ? "correct" :"false";
    console.log("Answer is "+ loggerResult);
  }
   showResult = () =>{ 
    let result = 0 ;
    this.state.Quizdata.forEach((item , index)=>{
      if(item.selectedAnswer === item.correctAns){
        result++;
      }
    });

    this.setState({
      ...this.setState,
      showResult: true,
      finalResult: result,
      totalQuestions:Quizdata.length
    });
  }

  render(){
    const { finalResult, showResult, Quizdata , totalQuestions } = this.state;
    return(
      <div className="App">
        <h1> Quiz question(s)</h1>  
        {Quizdata.map((item, questionNumber) =>             
              (<div key={questionNumber} id="Questions"> 
                  <div><span>{questionNumber+1} . </span>{item.name}</div>
                  <div>
                    {item.options.map((items,index )=> {
                      return (
                        <div key={index}>                   
                        <input id="radioBtn" type='radio'
                          onClick={this.clickAnswerHandler(questionNumber,index)}
                          name={`options${questionNumber}`} 
                          value={items} />
                          <span id="optionsList">{items}</span>
                        </div>
                      )
                    })}
                  </div>     
              </div>)
        )} 
        <div id="resultdisplaySection">
        <button id="resultBtn" title="Click here to check result, Please answer all questions(after click scroll down to view the result)" onClick={this.showResult}>Quiz Result</button>
        {showResult ? (<p id="resultDisplay" title="Quiz result">Correct answer(s) {finalResult} / {totalQuestions}</p>) : null}
        </div>  
      </div>
    );
  }
}
export default Quiz;