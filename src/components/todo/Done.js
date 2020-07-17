import React from 'react';
import DoneItem from './DoneItem';
import AddDone from './AddDone';
import {connect} from 'react-redux';

class Done extends React.Component {
  state = {
    addModalShow: false,
    cur_user : [],
  };
  componentDidMount =()=>{
		var Cur;
		this.props.users.usersData.map(U =>{
			if(U.id === this.props.user.userData._id)
				Cur = U.done;
		});
    this.setState({cur_user : Cur});
    // console.log(Cur);
	}
  onHide = () => {
    this.setState({ addModalShow: false });
  };

  render() {
    return (
      <div className='card border-success mb-3 text-center rounded-0 doing-bg'>
        <h4 className='card-header bg-success font text-white rounded-0'>
          Done!
        </h4>
        <div className='card-body text-success' style = {{height : '400px' , overflowY : 'auto'}}>
          <button
            type='button'
            className='btn btn-success rounded-0'
            onClick={() => this.setState({ addModalShow: true })}
          >
            Add Task <i className='fas fa-plus'></i>
          </button>
          <AddDone
            show={this.state.addModalShow}
            onHide={this.onHide}
            addDone={this.props.addDone}
          />
          {this.state.cur_user.map((done) => {
            return (
              <DoneItem
                key={done._id}
                done={done}
                laterdone={this.props.laterdone}
                deldone={this.props.deldone}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
	return {
	  user: state.auth,
	  users:state.user,
	};
};
export default connect(mapStateToProps)(Done);
