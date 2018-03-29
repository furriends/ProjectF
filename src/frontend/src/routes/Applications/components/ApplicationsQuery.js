import React, { Component } from 'react'
import {browserHistory} from 'react-router';
import '../styles/ApplicationsQuery.scss'
import RadioQueryItem from './RadioQueryItem';
import TextQueryItem from './TextQueryItem';
import SelectQueryItem from './SelectQueryItem';

class ApplicationsQuery extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: ['animal_id', 'application_id'],
      type: '',
      input: '',
    };
  }

  componentWillMount () {
  }

  addToColumns = (item) => {
    let columns = this.state.columns;
    columns.push(item);
    this.setState({
      columns: columns
    });
  };

  removeFromColumns = (item) => {
    let columns = this.state.columns;
    columns.splice(columns.indexOf(item), 1);
    this.setState({
      columns: columns
    })
  };

  renderQuery = () => {

    let input = document.getElementById('input-Input').value;
    let columns = this.state.columns;
    let type = this.state.type;

    this.props.queryApplications({
      columns,
      input,
      type
    })

  }

  render () {
    return (
      <div className={'QueryWrapper'}>

        <div className={'queryInner'}>

          <div className={'title'}>Search Applications</div>

          {(this.props.auth && this.props.auth.userType == "staff") ?
            <div>

              <div className={'subtitle'}>Columns to Include</div>

              <SelectQueryItem title={'Application Status'} onCheck={() => {this.addToColumns('status')}} onUnCheck={() => {this.removeFromColumns('application_status')}} />

              <SelectQueryItem title={'Other Pets'} onCheck={() => {this.addToColumns('pets')}} onUnCheck={() => {this.removeFromColumns('other_pets')}} />

              <SelectQueryItem title={'Yearly Budget'} onCheck={() => {this.addToColumns('budget')}} onUnCheck={() => {this.removeFromColumns('yearly_budget')}} />

              <SelectQueryItem title={'Type of Home'} onCheck={() => {this.addToColumns('home_type')}} onUnCheck={() => {this.removeFromColumns('type_of_home')}} />

              {/*<SelectQueryItem title={'Application Id'} onCheck={() => {this.addToColumns('application_id')}} onUnCheck={() => {this.removeFromColumns('application_id')}} />*/}

              <div className={'subtitle'}>Request Type</div>

              <RadioQueryItem title={'Animal ID'} action={() => {this.setState({type: 'animal_id'})}}/>

              <RadioQueryItem title={'Application ID'} action={() => {this.setState({type: 'application_id'})}}/>

              <div className={'subtitle'}>Request Input</div>

              <TextQueryItem title={'Input'} />

              <div className={'queryButton'} onClick={() => {this.renderQuery()}}>
                Search
              </div>

            </div>
            :
            null
          }

        </div>


      </div>
    )
  }
}

export default ApplicationsQuery
