class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()//clear calculator on startup
    }

    clear() {
        this.currentOperand = ''//clear operands
        this.previousOperand = ''
        this.operation = undefined //set operation to undefined

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    appendNumber(number){
     if (number === '.' && this.currentOperand.includes('.')) return//check if decimal was already used
     this.currentOperand = this.currentOperand.toString() + number.toString()//add input number to operand
  }

    chooseOperation(operation){
        if(this.currentOperand === '') return //check to see if current operand contains something
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation//pass in operation
        this.previousOperand = this.currentOperand//set previous operand
        this.currentOperand = ''//set current to empty

    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current;
            break
             case '-':
                computation = prev - current;
            break
             case 'X':
                computation = prev * current;
            break
             case '÷':
                 computation = prev / current;
             break
             default:
                 return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = (stringNumber.split('.')[1])

        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
             }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }


    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        	 this.getDisplayNumber(this.currentOperand)
            if(this.operation !== null){
             this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            } else {
                this.previousOperandTextElement.innerText = ''
            }
        }

    }
//declare constants and pass in data from query selector that match data type
    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    const currentOperandTextElement = document.querySelector('[data-current-operand]')


    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        })
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        })
    })

    allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
      })

      equalsButton.addEventListener('click', button => {
       calculator.compute()//compute function is called when equals is clicked
       calculator.updateDisplay()
      })

      deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
       })