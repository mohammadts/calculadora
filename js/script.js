const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  //add digit to calculator screen
  addDigit(digit) {
    //check if current operation already has a dot
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return
    }
    this.currentOperation = digit
    this.updateScreen()
  }

  //process all calculator operations
  processOperation(operation) {
    //check if current value is empty
    if (
      this.currentOperationText.innerText === '' &&
      operation !== 'C' &&
      operation !== 'Delete'
    ) {
      //change operation
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation)
      }
      return
    }

    //Get current and previous value
    let operationValue
    let previous = +this.previousOperationText.innerText.split(' ')[0]
    let current = +this.currentOperationText.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case 'DEL':
        this.processDelOperator()
        break
      case 'CE':
        this.processClearCurrentOperations()
        break
      case 'C':
        this.processClearOperations()
        break
      case '=':
      case 'Enter':
        this.processEqualOperator()
        break
      default:
        return
    }
  }

  //change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation
    } else {
      //check if value is zero, if is just add current value
      if (previous === 0) {
        operationValue = current
      }

      //add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }
  }

  //change math operation
  changeOperation(operation) {
    const mathOperations = ['*', '/', '+', '-']
    if (!mathOperations.includes(operation)) {
      return
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation
  }
  //delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }

  //clear current operation
  processClearCurrentOperations() {
    this.currentOperationText.innerText = ''
  }

  //clear all operations
  processClearOperations() {
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  //process an operation
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(' ')[1]
    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const value = e.target.innerText

    if (+value >= 0 || value === '.') {
      calc.addDigit(value)
    } else {
      calc.processOperation(value)
    }
  })
})

window.addEventListener('keydown', function (e) {
  let value = e.key
  if (value == 'Backspace') {
    value = 'DEL'
  } else if (value == 'Delete') {
    value = 'C'
  } else if (value == 'Enter') {
    value = '='
  }
  buttons.forEach(btn => {
    if (btn.innerText == value) {
      setTimeout(function () {
        if (!btn.classList.contains('number')) {
          if (btn.innerText == '=') {
            btn.style.backgroundColor = '#75a5cb'
          } else {
            btn.style.backgroundColor = '#dbdbdb'
          }
        } else {
          btn.style.backgroundColor = '#f3f3f3'
        }

        btn.style.borderColor = 'transparent'
      }, 100)
      if (btn.innerText == '=') {
        btn.style.backgroundColor = '#3a91d8'
      } else {
        btn.style.backgroundColor = '#bababa'
      }

      btn.style.borderColor = '#999'
    }
  })

  if (+value >= 0 || value === '.') {
    calc.addDigit(value)
  } else {
    calc.processOperation(value)
  }
  value = ''
})
