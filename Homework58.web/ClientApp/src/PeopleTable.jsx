import React from 'react';
import PersonRow from './PersonRow';
import NewPersonForm from './NewPersonForm';
import axios from 'axios';


class PeopleTable extends React.Component {
    state = {
        people: [],
        currentPerson: {
            firstName: '',
            lastName: '',
            age: '',
        },
        editMode: false,
        selectedPeople: [],
        allChecked: false
    }

    componentDidMount = () => {
        this.GetPeople();
    }

    GetPeople = () => {
        axios.get('/api/people/getpeople').then(res => {
            this.setState({ people: res.data });
        });
    }

    onTextChange = e => {
        const copy = { ...this.state.currentPerson };
        copy[e.target.name] = e.target.value;
        this.setState({ currentPerson: copy });
    }

    onSubmitClick = () => {
        var axiosString = '';
        if (this.state.editMode == true) {
            axiosString = '/api/people/editperson';
        }
        else {
            axiosString = '/api/people/addperson';
        }
        axios.post(axiosString, this.state.currentPerson).then(res => {
            this.GetPeople();
            this.render();
            this.setState({
                currentPerson: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    id: 0
                },
                editMode: false
            })
            console.log('done');
        });
    }

    onDeleteClick = (person) => {
        console.log(person);
        axios.post('/api/people/deletePerson', person).then(res => {
            this.GetPeople()
        });
    }

    onDeleteMultiple = () => {
        console.log(this.state.selectedPeople);
        axios.post('/api/people/deletePeople', this.state.selectedPeople).then(res => {
            this.GetPeople()
        });
    }
    onDeleteAll = () => {
        console.log('deleting all');
        axios.post('/api/people/deleteAllPeople').then(res => {
            this.GetPeople()
        });
}

    onEditClick = (p) => {
        console.log('edit!');
        this.setState({
            editMode: true,
            currentPerson: {
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age,
                id: p.id
            }
        });
    }

    onCheckClick = (p) => {
        var selected = this.state.selectedPeople
        if (!selected.includes(p.id)) {
            var copy = [...selected, p.id];
            this.setState({
                selectedPeople: copy
            });
        }
        else {
            var copy = selected;
            copy = copy.filter(i => i !== p.id);
            this.setState
        }
        this.setState({
            selectedPeople: copy
        });
        console.log(this.state.selectedPeople);
    }

    onCheckHeaderClick = () => {
        var selected = [];
        if (!this.state.allChecked) {
            var people = this.state.people;
            people.forEach((p) => {
                selected.push(p.id);
            });
            this.setState({
                })
        }
        this.setState({
            selectedPeople: selected,
            allChecked: !this.state.allChecked
        });
    }

    render() {
        const { id, firstName, lastName, age } = this.state.currentPerson;
        return <>
            <NewPersonForm
                firstName={firstName}
                lastName={lastName}
                age={age}
                id={id}
                onTextChange={this.onTextChange}
                onSubmitClick={this.onSubmitClick}
                editMode={this.state.editMode}
            ></NewPersonForm>
            <div className='container mt-5 col-md-3'>
                <button className='btn btn-danger col-md-8' onClick={this.onDeleteMultiple }>Delete Selected</button>
                <button className='btn btn-danger col md-8' onClick={this.onDeleteAll}>Delete All</button>
            </div>
            <div className='container mt-5'>
                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="checkHeader" value="true" onClick={this.onCheckHeaderClick} />
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.people.map(p => <PersonRow key={p.Id}
                            person={p}
                            onEditClick={this.onEditClick}
                            onDeleteClick={this.onDeleteClick}
                            onCheckClick={this.onCheckClick}
                            checked={this.state.allChecked || this.state.selectedPeople.includes(p.id)}></PersonRow>)}
                    </tbody>


                </table>

            </div>


        </>
    }
}

export default PeopleTable