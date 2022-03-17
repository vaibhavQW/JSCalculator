var calcScreen = document.getElementsByClassName("calc-inp-screen")[0];
var nums = document.querySelectorAll(".num");
var operators = document.querySelectorAll(".operator");
var clearButton = document.getElementsByClassName("ClearButton")[0];

var Buffer = [0];
var numBuffer = "";
var isNumActive = false;


calcScreen.value = Buffer[Buffer.length-1];
nums.forEach(num=>{
    num.addEventListener("click", ()=>numBufferAppender(num.id));
});
operators.forEach(operator=>{
   if(operator.innerHTML!=="="){
    operator.addEventListener("click", ()=>operatorBufferAppender(operator.id));
   }else{
       //call function to calculate value
       operator.addEventListener("click", calculateValue)
   }
});
clearButton.addEventListener("click", clearCalci)


function numBufferAppender(id){
    
    isNumActive = true;
    let num = document.getElementById(id)
    let numValue;
    if(id==="DOT"){
        numValue = "."
    }else{
        numValue = num.innerHTML.match("[0-9]")[0];
    }
    numBuffer = numBuffer.concat(numValue);

    if(Buffer.length==2&&(Buffer[Buffer.length-1]==="+"||Buffer[Buffer.length-1]==="-")){
        numBuffer = Buffer[Buffer.length-1] + numBuffer;
        Buffer = removeEleFromArr(Buffer, Buffer.length-1);
    }else{
        if((Buffer[Buffer.length-1]==="+"||Buffer[Buffer.length-1]==="-"||Buffer[Buffer.length-1]==="*"||Buffer[Buffer.length-1]==="/")&&(Buffer[Buffer.length-2]==="+"||Buffer[Buffer.length-2]==="-"||Buffer[Buffer.length-2]==="*"||Buffer[Buffer.length-2]==="/")){
            numBuffer = Buffer[Buffer.length-1] + numBuffer;  
            Buffer = removeEleFromArr(Buffer, Buffer.length-1);
        }else{
            //
        }
    }
    calcScreen.value = numBuffer;
 
}

function operatorBufferAppender(id){
 
  
    if(isNumActive === true){
        isNumActive = false;
        Buffer.push(parseFloat(numBuffer));
        numBuffer = "";
        Buffer.push(document.getElementById(id).innerHTML);
        calcScreen.value= Buffer[Buffer.length-1];
    }else{
        if(Buffer.length===1){
            if(document.getElementById(id).innerHTML==="/"||document.getElementById(id).innerHTML==="*"){
                return;
            }else{
                Buffer.push(document.getElementById(id).innerHTML)
            }
        }else{
            if((Buffer.length===2)&&(Buffer[1]==="+"||Buffer[1]==="-"||Buffer[1]==="*"||Buffer[1]==="/")){
                return ; 
            }else{
                if((Buffer[Buffer.length-1]==="+"||Buffer[Buffer.length-1]==="-"||Buffer[Buffer.length-1]==="*"||Buffer[Buffer.length-1]==="/")&&(Buffer[Buffer.length-2]==="+"||Buffer[Buffer.length-2]==="-"||Buffer[Buffer.length-2]==="*"||Buffer[Buffer.length-2]==="/")){
                    return ; 
                }else{
                    if(document.getElementById(id).innerHTML==="*"||document.getElementById(id).innerHTML==="/"){
                        return;
                    }else{
                        Buffer.push(document.getElementById(id).innerHTML);
                        calcScreen.value = Buffer[Buffer.length-1];
                    }
                }
            }
        }
    }
 
}

function calculateValue(){
    Buffer.push(parseFloat(numBuffer))
  
    let answer = 0;
    let operationBuffer = [];
    let answerBuffer = 0;
    if(Buffer[Buffer.length-1]==="+"||Buffer[Buffer.length-1]==="-"||Buffer[Buffer.length-1]==="*"||Buffer[Buffer.length-1]==="/"){
        alert("Incomplete operation! operators are not allowed at end");
    }else{
        for(let i = 0 ;i<Buffer.length;i++){
            if(Buffer[i]==="/"){
                operationBuffer.push(i)
            }
        }
        for(let i = 0;i<operationBuffer.length;i++){
            answerBuffer = Buffer[operationBuffer[i]-1]/Buffer[operationBuffer[i]+1];
            
            removeEleFromArr(Buffer, (operationBuffer[i]-1), 3);
            addEleToArray(Buffer, operationBuffer[i]-1, answerBuffer);
            for(let j = i;j<operationBuffer.length;j++){
                operationBuffer[j]  = operationBuffer[j] -2;
            }
            answerBuffer = 0;
        }
        operationBuffer = [];
       

        for(let i = 0 ;i<Buffer.length;i++){
            if(Buffer[i]==="*"){
                operationBuffer.push(i)
            }
        }
        for(let i = 0;i<operationBuffer.length;i++){
            answerBuffer = Buffer[operationBuffer[i]-1]*Buffer[operationBuffer[i]+1];
            removeEleFromArr(Buffer, (operationBuffer[i]-1), 3);
            addEleToArray(Buffer, operationBuffer[i]-1, answerBuffer);
            for(let j = i;j<operationBuffer.length;j++){
                operationBuffer[j]  = operationBuffer[j] -2;
            }
            answerBuffer = 0;
        }
        operationBuffer = [];
        
        for(let i = 0 ;i<Buffer.length;i++){
            if(Buffer[i]==="+"){
                operationBuffer.push(i)
            }
        }
        for(let i = 0;i<operationBuffer.length;i++){
            answerBuffer = Buffer[operationBuffer[i]-1]+Buffer[operationBuffer[i]+1];
            removeEleFromArr(Buffer, (operationBuffer[i]-1), 3);
            addEleToArray(Buffer, operationBuffer[i]-1, answerBuffer);
            for(let j = i;j<operationBuffer.length;j++){
                operationBuffer[j]  = operationBuffer[j] -2;
            }
            answerBuffer = 0;
        }
        operationBuffer = [];
        

        for(let i = 0 ;i<Buffer.length;i++){
            if(Buffer[i]==="-"){
                operationBuffer.push(i)
            }
        }
        for(let i = 0;i<operationBuffer.length;i++){
            answerBuffer = Buffer[operationBuffer[i]-1]-Buffer[operationBuffer[i]+1];
            removeEleFromArr(Buffer, (operationBuffer[i]-1), 3);
            addEleToArray(Buffer, operationBuffer[i]-1, answerBuffer);
            for(let j = i;j<operationBuffer.length;j++){
                operationBuffer[j]  = operationBuffer[j] -2;
            }
            answerBuffer = 0;
        }
        operationBuffer = [];
     
    }
    calcScreen.value = Buffer[Buffer.length-1]
}

function clearCalci(){
    Buffer.splice(1,Buffer.length-1)
   
    calcScreen.value = Buffer[Buffer.length -1];
    numBuffer = ""
}


function removeEleFromArr(arr, i,  eleRemove){
    arr.splice(i, eleRemove)
    
}

function addEleToArray(arr, index, ele){
   
    arr.splice(index, 0, ele)
  
}