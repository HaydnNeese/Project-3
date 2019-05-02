import React, { Component } from "react";
import titleLogo from '../images/atlas-black-logo.png';
import { Grid, GridColumn, Image, Container } from 'semantic-ui-react'
import { PassCard, LockedCard, SecurityCard } from '../components/Card';
// we need to make a ternary expression or something like that that will help choose which of these will render
// you can just pass in the different card names and to see what they look like
import AddModal from '../components/AddModal';
import Banner from '../components/Banner';
import API from "../utils/api";
import swal from "sweetalert";

const homeBG = {
  // background: "linear-gradient(305deg, #B2EC5D, #DDFC74, #FFF697, #B2FFD6, #9FD8CB, #9FD8CB)"
}

const divStyle = {
  paddingTop: '30px',
  // background: 'linear-gradient(305deg, #B2EC5D, #DDFC74, #FFF697, #B2FFD6, #9FD8CB, #9FD8CB)'
};

const securityArray = [
  {
    question: "Enter your PIN to unlock content",
  }
]

class Home extends Component {

  state = {
    title: "",
    note: "",
    modal: [],
    attempts: 3,
    isCorrect: false,
    locked: true,
    answer: '',
    noteTotal: 0,
    modalOpen: false,
    clicked: false,
    selectedCardId: "",
    userPin: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidMount() {
    const id = localStorage.getItem("userId").replace(/"/g, "");
    const userPin = localStorage.getItem("pin").replace(/"/g, "");
    console.log('front end user pin: ', userPin);
    this.setState({
      userPin
    })
    console.log('this is id in home.js: ', id);
    this.loadModals(id);
  }

  loadModals = (id) => {
    API.getModal(id)
      .then(res  => { this.setState({ modal: res.data.modals });
     })
      .catch(err => console.log(err));
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => {
    this.setState({ modalOpen: false });
    console.log("modal closed");
  }

  handleSubmit = () => {
    const id = localStorage.getItem("userId").replace(/"/g, "");
   
          API.addModal( id,
            {
              title: this.state.title,
              note: this.state.note
            }).then(data => {
              
              this.handleClose()
            })
  window.location.reload();
}

  handleLockButtonClick = (id) => {
    this.setState({
      locked: false,
      selectedCardId: id
    })
  }

  handleAnswerInput = event => {
    this.setState({ answer: event.target.value });
  }

  handleAnswerSubmit = event => {
    event.preventDefault();
    if (this.state.answer === this.state.userPin) {
      swal("User Verified", "", "success");
      this.setState({
        isCorrect: true
      });
      document.getElementById('secure-input').value='';
    }else if(this.state.answer === "") {
      swal("Error", "Enter your PIN to gain access", "warning");
      document.getElementById('secure-input').value='';
    }else {
      swal("Unable to Verify User", "", "error");
      // this.setState({
      //   attempts: this.state.attempts - 1
      // });
      document.getElementById('secure-input').value='';
    }
  }

  render() {
    return (
    <div style={homeBG}>
      <Banner />
      <Container>
        <Grid stackable style={divStyle} textAlign='center'>
          <Grid.Row>
            <Grid.Column>
              <Image
                id="main-logo"
                centered
                size="medium"
                src={titleLogo}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <AddModal
                title={this.state.title}
                note={this.state.note}
                open={this.state.modalOpen}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleOpen={this.handleOpen}
                handleClose={this.handleClose}
              />
            </Grid.Column>
          </Grid.Row>
          {this.state.locked ? (
            <Grid.Row stackable columns={3}>
            {this.state.modal.map((card) => {
              return (
              <GridColumn>
                <LockedCard
                  handleLockButtonClick= {() => {this.handleLockButtonClick(card._id)}}
                  title = {card.title}
                  notes = {this.state.noteTotal}
                />
              </GridColumn>
              )
            })}
            </Grid.Row>
          ) : (
              this.state.isCorrect ? (
                <Grid.Row stackable columns={3}>
                  {this.state.modal.map((card) => {
                    return (
                      <GridColumn>
                        {
                          this.state.selectedCardId === card._id &&
                        <PassCard
                          title={card.title}
                          note={card.note}
                        />
                        }
                        {
                            this.state.selectedCardId === card._id || 
                            <LockedCard
                            handleLockButtonClick= {() => {this.handleLockButtonClick(card._id)}}
                            title = {card.title}
                            notes = {this.state.noteTotal}
                            />
                          }
                      </GridColumn>
                    )
                  })}
                </Grid.Row>
              ) : (
                  <Grid.Row stackable columns={3}>
                    {this.state.modal.map((card) => {
                      return (
                        <GridColumn>
                          { 
                            this.state.selectedCardId === card._id &&
                          <SecurityCard
                            handleAnswerInput={this.handleAnswerInput}
                            title = {card.title}
                            name="answer"
                            value={this.state.answer}
                            handleAnswerSubmit={this.handleAnswerSubmit}
                            question={securityArray[0].question}
                            attempts = {this.state.attempts}
                          />
                          }
                          {
                            this.state.selectedCardId === card._id || 
                            <LockedCard
                            handleLockButtonClick={this.handleLockButtonClick}
                            title = {card.title}
                            notes = {this.state.noteTotal}
                            />
                          }
                        </GridColumn>
                      )
                    })}
                  </Grid.Row>
                  )
              )}
        </Grid>
      </Container>
    </div>
        );
      }
    }
    //we need to have it read the total number of stored cards
    //on each card it should show the LockedCard component
    //click on the lock to reveal the SecurityCard component
    //then have the SecurityCard receive the stored security question and display it to the card
    //capture the answer and compare it with the stored answer
    //if it is correct then reveal the PassCard and maybe use the success tool that Semantic UI has
    //if it is incorrect use the incorrect tool that semantic UI has and have the total number of tries reduce by 1
    //after three failed tries have it lock the user out (optional)
    export default Home;