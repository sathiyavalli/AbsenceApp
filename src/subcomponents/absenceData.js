import React , { useState } from 'react';
import { absenceData } from './data';
import { membersData } from './dataMembers';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";


class Absences extends React.Component {  
  state = { isLoading: true };  
  
  constructor(props) {
    super(props);    
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.state = {
    type:' ',
    date: '',
    value:'',
    warnings:'No data availabale'
    }    
  }
  componentDidMount() {  
    this.setState({
        type: 'sickness',
        value:10,
        date:null, 
        isLoading:false       
    });
}

  onChangeType(e) {
    this.setState({ type: e.target.value});    
  }
  onChangeValue(e) {
    this.setState({ value: e.target.value});  
  }
  changeDate = (event) => {  
    console.log(event.toDate());
    console.log(event.format("YYYY-MM-DD"));
    this.setState({date: event.format("YYYY-MM-DD")}) 
  }

  render() {
  return (      
    <>
      {this.state.isLoading && <Spinner/>}
      <div className="container-fluid row mx-5 pt-4 pb-2">
        <select className="form-control form-control-lg col-5 float-left" id="select_id" value={this.props.type} onChange={this.onChangeType}>                
								<option value="sickness">sickness</option>
								<option value="vacation" >vacation</option>								
					</select>
          <select className="form-control form-control-lg float-left col-1 mx-3" id="select_id" value={this.props.value} onChange={this.onChangeValue}>                
								<option value="10">10</option>
								<option value="15" >15</option>								
                <option value="30" >30</option>								
                <option value="45" >45</option>								
					 </select>                             
            <div className = "col-5">              
              <Datetime
                     id="datepicker"
                     viewMode="days"
                      timeFormat={false}
                      dateFormat="YYYY-MM-DD"
                      value={this.state.date}
                      onChange={this.changeDate}                                            
                /> 
              </div>                
						  </div>	 
              
              <AbsenceTypeList type = {this.state.type} date={this.state.date} data = {absenceData} value={this.state.value}/>                                                     
    </>    
    					   					        
      );  
   }
}
class AbsenceTypeList extends React.Component{
  
  render(){        
    let i = 0;             
    return(
    <>                     
       <div className="col-6 container-fluid ml-5 row">
           <h5>Absence Type: {this.props.type}</h5>
            <br/>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>EmployeeName</th>      
              <th>Period</th>
              <th>Members Note</th> 
              <th>Status</th> 
              <th>Admitted Note</th> 
            </tr>
          </thead>
         <tbody>      
              {absenceData.filter((leave,index) => leave.type === this.props.type && (index<=this.props.value)).map(filteredPerson => (membersData.filter(mem=> mem.userId === filteredPerson.userId && mem.rejectedAt != "null").filter(fres=>(this.props.date === filteredPerson.startDate || this.props.date === filteredPerson.endDate || !this.props.date )).map(res=>(                           
              <tr>                    
                <td>{i=i+1}</td>                   
                <td>{filteredPerson.type}</td>
                <td>{res.name}</td>                    
                <td>{filteredPerson.startDate != filteredPerson.endDate ? filteredPerson.startDate + '-'+ filteredPerson.endDate : filteredPerson.startDate}</td>
                <td>{filteredPerson.memberNote != "" ? filteredPerson.memberNote :'No notes available' }</td>
                <td>{(!filteredPerson.rejectedAt &&  !filteredPerson.confirmedAt ? 'requested' : null) || (!filteredPerson.rejectedAt ? 'Accepted' : null) || (!filteredPerson.confirmedAt ? 'Rejected' : null)}</td>
                <td>{filteredPerson.admitterNote != "" ? filteredPerson.admitterNote :'No admitter notes available' }</td>
              </tr>
            ))      
        ))
      }
          </tbody>
        </table>              
    </div>    
    <div className="col-3">
      Absence Count: {i}<br/>      
    </div>    
    <div>    
  </div>    
   <div className="text-center row col-8 offset-3">
      {i==0 ? 'No datas available' : ' '}
    </div>    
</>
    );
  }
}
class Spinner extends React.Component{
  render(){
		return(
			<div class="text-center ml-2">
  				<div class="spinner-border" role="status">
    				<span class="sr-only">Loading...</span>
  				</div>
			</div>
			);
	}

}
export default Absences;

