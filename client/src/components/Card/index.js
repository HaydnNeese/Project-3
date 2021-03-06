import React from 'react'
import { Card, Image, Icon, Form, Button } from 'semantic-ui-react'
import Style from "./style.css"
//the card that will be shown after the security question is answered correctly

export const PassCard = props => (
  <Card centered>
    <Card.Content>
      <Card.Header id="note-header" className="card-header">{props.title}</Card.Header>
      <Card.Meta className="card-center">
        <span id="note-content" className='Gmail card' >{props.note}</span>
      </Card.Meta>
    </Card.Content >
    <Card.Content className="dark" extra>
      <Button icon className="ui primary button delete-button" onClick={props.handleDelete}>
        <Icon name='trash alternate' />
      </Button>
    </Card.Content>
  </Card>
)

//the card that will be shown on load based on the number of notes are saved to the user
export const LockedCard = props => (
  <Card centered>
    <Card.Content id="locked-header" header={props.title} />
    <Card.Content id="locked-content" className="card-center" description="Click the lock to gain access" />
    <button id="lock-btn" className="ui primary button lock-button" onClick={props.handleLockButtonClick}><i className="fas fa-lock"></i></button>
    <Card.Content className="dark" extra>
      <Icon name='hide' />
    </Card.Content>
  </Card>
)

//need this to become a pin input
export const SecurityCard = props => (
  <Card centered>
    <Card.Content id="security-header" className="card-header" header={props.title} />
    <Card.Content id="security-content" className="card-center">
      <p>Click the buttons to enter a 6-digit PIN.</p>
      <p id="placeholder-line">{props.placeholder}</p>
      <Form>
        <div id="pinpad" className="btn-group btn-matrix mb-3" >
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="1">1</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="2">2</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="3">3</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="4">4</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="5">5</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="6">6</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="7">7</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="8">8</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="9">9</button>
          <button onKeyUp={props.numPad} onClick={props.handleAnswerInput} className="btn btn-dark styled-btn" value="0">0</button>
        </div>
        <div id="button-div">
          <Button id="submit-btn" onClick={props.handleAnswerSubmit}>Submit</Button>
          <Button id="reset-btn" onClick={props.handlePinReset}>Reset</Button>
        </div>
      </Form>
    </Card.Content>
  </Card>
)

export const ExampleCard = props => (
  <Card centered>
    <Card.Content>
      <Card.Header className="card-header">{props.title}</Card.Header>
      <Card.Meta className="card-center">
        <span className='Gmail card' >{props.note}</span>
      </Card.Meta>
    </Card.Content >
  </Card>
)

// display the card with the title showing but not the note, in place of the note show a lock
// make the lock clickable and when you click on it reveal a 
