import React from 'react';

export default function NewPersonForm({ firstName, lastName, age, onTextChange, onSubmitClick, isAdding, editMode }) {
    return <>
       <div className='row jumbotron'>
            <div className='col-md-3'>
                <input value={firstName} onChange={onTextChange} name='firstName' className='form-control' placeholder='First Name' />
            </div>

            <div className='col-md-3'>
                <input value={lastName} onChange={onTextChange} name='lastName' className='form-control' placeholder='Last Name' />
            </div>


            <div className='col-md-3'>
                <input value={age} onChange={onTextChange} name='age' className='form-control' placeholder='Age' />
            </div>

            <div className='col-md-3'>
                <button onClick={onSubmitClick} className={editMode === true ? 'btn btn-warning' : 'btn btn-success'}>Submit</button>
            </div>


        </div>
    </>
}