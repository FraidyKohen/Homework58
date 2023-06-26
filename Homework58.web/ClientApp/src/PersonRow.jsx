import React from 'react';

function PersonRow({ person, onEditClick, onDeleteClick, editMode, onCheckClick, checked }) {
    const { firstName, lastName, age, id } = person;
    var personSelected;
    function onEditButtonClick() {
        onEditClick(person);
    }

    function onDeleteButtonClick() {
        onDeleteClick(person);
    }

    function onCheckBoxClick() {
        onCheckClick(person);
        
    }

    return (
        <tr>
            <td>
                <input type="checkbox" checked={checked} name="selected" value="true" onChange={onCheckBoxClick} />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className='btn btn-warning' onClick={onEditButtonClick}>Edit</button>

                <button className='btn btn-danger' onClick={onDeleteButtonClick}>Delete</button>

            </td>
        </tr>
    )

}

export default PersonRow;